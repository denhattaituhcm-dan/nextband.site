import { FastifyRequest, FastifyReply } from "fastify";
import { jwtVerify } from "jose";
import { supabaseJWKS } from "../plugins/auth.js";
import { env } from "../config/env.js";

interface DecodedTokenData {
  id: string;
  email: string;
  roles?: string[];
}

// In-memory cache for resolved user data to avoid repeating 600-800ms database roundtrips on every request
const userAuthCache = new Map<
  string,
  {
    canonicalUserId: string;
    email: string;
    roles: string[];
    isActive: boolean;
    cachedAt: number;
  }
>();
const USER_CACHE_TTL_MS = 10 * 1000; // 10s transient TTL for tight revocation consistency

export function invalidateUserAuthCache(userId?: string) {
  if (userId) {
    userAuthCache.delete(userId);
  } else {
    userAuthCache.clear();
  }
}

/**
 * Verifies the incoming Bearer token using either:
 * 1. Supabase JWKS (ES256/RS256 asymmetric) - Primary production path
 * 2. Fastify local JWT (HS256 symmetric) - Fallback for internal scripts/tests
 */
async function verifyAndResolveUser(request: FastifyRequest): Promise<DecodedTokenData | null> {
  const authHeader = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.slice(7).trim();
  if (!token) return null;

  let userId = "";
  let email = "";
  let fallbackRoles: string[] = [];

  // Path 1: Verify with Supabase JWKS (ES256)
  try {
    const expectedIssuer = `${env.SUPABASE_URL.replace(/\/$/, "")}/auth/v1`;
    const { payload } = await jwtVerify(token, supabaseJWKS, {
      issuer: expectedIssuer,
      algorithms: ["ES256", "RS256"],
    });

    if (payload && payload.sub) {
      userId = payload.sub;
      email = typeof payload.email === "string" ? payload.email : "";
      if (Array.isArray((payload as any).roles)) {
        fallbackRoles.push(...(payload as any).roles);
      }
      const appMeta = (payload as any).app_metadata;
      if (appMeta?.role && typeof appMeta.role === "string") {
        fallbackRoles.push(appMeta.role);
      }
      if (Array.isArray(appMeta?.roles)) {
        fallbackRoles.push(...appMeta.roles);
      }
      const userMeta = (payload as any).user_metadata;
      if (userMeta?.role && typeof userMeta.role === "string") {
        fallbackRoles.push(userMeta.role);
      }
      if (Array.isArray(userMeta?.roles)) {
        fallbackRoles.push(...userMeta.roles);
      }
    }
  } catch (jwksErr) {
    // In test environment only: allow Fastify local JWT verification fallback
    if (process.env.NODE_ENV === "test" || process.env.VITEST) {
      try {
        const decoded = (request.server as any)?.jwt?.verify(token) as any;
        if (decoded && (decoded.id || decoded.sub)) {
          userId = decoded.id || decoded.sub;
          email = decoded.email || "";
          if (Array.isArray(decoded.roles)) {
            fallbackRoles.push(...decoded.roles);
          }
        }
      } catch {
        return null;
      }
    } else {
      return null;
    }
  }

  if (!userId) return null;

  // 1. Check in-memory cache first (0ms latency for active sessions)
  const cachedUser = userAuthCache.get(userId);
  if (cachedUser && Date.now() - cachedUser.cachedAt < USER_CACHE_TTL_MS) {
    if (!cachedUser.isActive) {
      return null;
    }
    const userContext = {
      id: cachedUser.canonicalUserId,
      email: cachedUser.email || email,
      roles: cachedUser.roles,
    };
    request.user = userContext;
    return userContext;
  }

  // Load authoritative user & roles from Supabase PostgreSQL via Prisma (user_roles is Single Source of Truth)
  let canonicalUserId = userId;
  let authoritativeRoles: string[] = [];
  let userIsActive = true;
  try {
    const prisma = (request.server as any).prisma;
    if (prisma) {
      let dbUser: any = null;
      if (prisma.user) {
        dbUser = await prisma.user.findFirst({
          where: {
            OR: [
              { userId: userId },
              { id: userId },
              ...(email ? [{ email: email.toLowerCase() }] : []),
            ],
          },
          include: { roles: true },
        });

        if (dbUser) {
          if (dbUser.isActive === false) {
            userIsActive = false;
            userAuthCache.set(userId, {
              canonicalUserId: dbUser.userId || dbUser.id,
              email: dbUser.email || email,
              roles: [],
              isActive: false,
              cachedAt: Date.now(),
            });
            return null;
          }
          canonicalUserId = dbUser.userId || dbUser.id;
        }
      }

      const candidateUserIds = [userId, dbUser?.userId, dbUser?.id].filter(Boolean) as string[];
      let directRoles: string[] = [];
      if (prisma.userRole && candidateUserIds.length > 0) {
        const userRoles = await prisma.userRole.findMany({
          where: {
            userId: { in: candidateUserIds },
          },
        });
        directRoles = userRoles.map((r: any) => r.role);
      }

      const combinedRoles = Array.from(new Set([
        ...(dbUser?.roles ? dbUser.roles.map((r: any) => r.role) : []),
        ...directRoles,
        ...fallbackRoles,
      ]));

      if (combinedRoles.length > 0) {
        authoritativeRoles = combinedRoles;
      }
    }
  } catch (dbErr) {
    request.log.warn({ err: dbErr, userId, email }, "Failed to fetch user from PostgreSQL, using fallback");
  }

  if (!userIsActive) {
    return null;
  }

  const finalRoles = authoritativeRoles.length > 0
    ? [...authoritativeRoles]
    : [...fallbackRoles];

  const isRootAdmin =
    email?.toLowerCase() === "admin@ielts.com" ||
    email?.toLowerCase() === "admin@nextband.site";

  if (isRootAdmin && !finalRoles.includes("admin")) {
    finalRoles.push("admin");
  }

  const userContext = {
    id: canonicalUserId,
    email,
    roles: finalRoles,
  };

  // Cache resolved user data
  userAuthCache.set(userId, {
    canonicalUserId,
    email,
    roles: finalRoles,
    isActive: true,
    cachedAt: Date.now(),
  });
  if (canonicalUserId !== userId) {
    userAuthCache.set(canonicalUserId, {
      canonicalUserId,
      email,
      roles: finalRoles,
      isActive: true,
      cachedAt: Date.now(),
    });
  }

  request.user = userContext;
  return userContext;
}

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = await verifyAndResolveUser(request);
  if (!user) {
    return reply
      .status(401)
      .send({ error: "Unauthorized", message: "Invalid or expired token" });
  }
}

export async function optionalAuthenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authHeader = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    request.user = null as any;
    return;
  }

  const token = authHeader.slice(7).trim();
  if (!token) {
    return reply
      .status(401)
      .send({ error: "Unauthorized", message: "Invalid or expired token" });
  }

  const user = await verifyAndResolveUser(request);
  if (!user) {
    return reply
      .status(401)
      .send({ error: "Unauthorized", message: "Invalid or expired token" });
  }
  request.user = {
    id: user.id,
    email: user.email,
    roles: user.roles || [],
  };
}

export function requireRoles(...roles: string[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.user || (await verifyAndResolveUser(request));
    if (!user) {
      return reply
        .status(401)
        .send({ error: "Unauthorized", message: "Invalid or expired token" });
    }

    const userRoles = Array.isArray(user.roles) ? user.roles : [];
    const hasRole = userRoles.some((r: string) => roles.includes(r));

    if (!hasRole) {
      return reply.status(403).send({
        error: "Forbidden",
        message: `Required roles: ${roles.join(", ")}`,
      });
    }
  };
}

