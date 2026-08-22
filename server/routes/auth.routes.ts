import { FastifyPluginAsync } from "fastify";
import {
  loginSchema,
  registerSchema,
  googleLoginSchema,
  LoginInput,
  RegisterInput,
  GoogleLoginInput,
} from "../schemas/auth.schema.js";
import { OAuth2Client } from "google-auth-library";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { handleValidation } from "../utils/validation.js";
import { toFileUrl } from "../utils/file.js";

const authRoutes: FastifyPluginAsync = async (fastify) => {
  // POST /auth/register
  fastify.post<{ Body: RegisterInput }>(
    "/register",
    {
      config: {
        rateLimit: {
          max: 5,
          timeWindow: "1 minute",
        },
      },
    },
    async (request, reply) => {
      const data = handleValidation(
        registerSchema.safeParse(request.body),
        request,
        reply,
      );
      if (!data) return;

      const { email, password, fullName } = data;

      // Check if email exists
      const existing = await fastify.prisma.user.findUnique({
        where: { email },
      });

      if (existing) {
        return reply.status(409).send({ error: "Email đã được đăng ký" });
      }

      // Create user
      const user = await fastify.prisma.user.create({
        data: {
          userId: crypto.randomUUID(),
          email,
          fullName,
          roles: {
            create: { role: "student" },
          },
        },
        include: { roles: true },
      });

      // Generate token
      const token = fastify.jwt.sign({
        id: user.userId,
        email: user.email || "",
        roles: (user.roles || []).map((r: any) => r.role),
      });

      return {
        token,
        user: {
          id: user.userId,
          email: user.email,
          fullName: user.fullName,
          avatarUrl: toFileUrl(user.avatarUrl),
          phone: user.phone,
          gender: user.gender,
          roles: (user.roles || []).map((r: any) => r.role),
        },
      };
    },
  );

  // POST /auth/login - DECOMMISSIONED (Supabase Auth is canonical)
  fastify.post(
    "/login",
    async (_request, reply) => {
      return reply.status(410).send({
        error: "GONE",
        message: "Endpoint /auth/login đã ngừng hoạt động. Vui lòng đăng nhập qua Supabase Auth.",
      });
    },
  );

  // POST /auth/login/google
  fastify.post<{ Body: GoogleLoginInput }>(
    "/login/google",
    async (request, reply) => {
      const data = handleValidation(
        googleLoginSchema.safeParse(request.body),
        request,
        reply,
      );
      if (!data) return;

      const { credential } = data;
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

      let payload;
      try {
        const ticket = await client.verifyIdToken({
          idToken: credential,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        payload = ticket.getPayload();
      } catch (error) {
        return reply.status(401).send({ error: "Token Google không hợp lệ" });
      }

      if (!payload || !payload.email) {
        return reply
          .status(400)
          .send({ error: "Payload Token Google không hợp lệ" });
      }

      const { email, name, picture } = payload;

      // Find user by email
      let user = await fastify.prisma.user.findFirst({
        where: { email },
        include: { roles: true },
      });

      if (!user) {
        // Create new user profile in PostgreSQL
        user = await fastify.prisma.user.create({
          data: {
            userId: crypto.randomUUID(),
            email,
            fullName: name || "User",
            avatarUrl: picture,
            roles: {
              create: { role: "student" },
            },
          },
          include: { roles: true },
        });
      }

      if (!user.isActive) {
        return reply
          .status(403)
          .send({ error: "Tài khoản đã bị hủy kích hoạt" });
      }

      // Generate token
      const token = fastify.jwt.sign({
        id: user.userId,
        email: user.email || "",
        roles: (user.roles || []).map((r: any) => r.role),
      });

      return {
        token,
        user: {
          id: user.userId,
          email: user.email,
          fullName: user.fullName,
          avatarUrl: toFileUrl(user.avatarUrl),
          phone: user.phone,
          gender: user.gender,
          roles: (user.roles || []).map((r: any) => r.role),
        },
      };
    },
  );

  // GET /auth/me
  fastify.get("/me", { preHandler: authenticate }, async (request, reply) => {
    const { id } = request.user;

    const user = await fastify.prisma.user.findFirst({
      where: {
        OR: [
          { userId: id },
          { id },
        ],
      },
      include: { roles: true },
    });

    if (!user) {
      return reply.status(404).send({ error: "Không tìm thấy người dùng" });
    }

    return {
      id: user.userId,
      email: user.email,
      fullName: user.fullName,
      avatarUrl: toFileUrl(user.avatarUrl),
      bio: user.bio,
      phone: user.phone,
      gender: user.gender,
      roles: user.roles.map((r) => r.role),
    };
  });

  // PUT /auth/profile
  fastify.put(
    "/profile",
    { preHandler: authenticate },
    async (request, reply) => {
      const { id } = request.user;
      const { fullName, bio, avatarUrl, phone, gender } = request.body as any;

      const existingUser = await fastify.prisma.user.findFirst({
        where: {
          OR: [
            { userId: id },
            { id },
          ],
        },
        select: { id: true, userId: true },
      });

      if (!existingUser) {
        return reply.status(404).send({ error: "Không tìm thấy người dùng" });
      }

      const user = await fastify.prisma.user.update({
        where: { id: existingUser.id },
        data: {
          ...(fullName && { fullName }),
          ...(bio !== undefined && { bio }),
          ...(avatarUrl && { avatarUrl }),
          ...(phone !== undefined && { phone }),
          ...(gender !== undefined && { gender }),
        },
        include: { roles: true },
      });

      return {
        id: user.userId,
        email: user.email,
        fullName: user.fullName,
        avatarUrl: toFileUrl(user.avatarUrl),
        bio: user.bio,
        phone: user.phone,
        gender: user.gender,
        roles: user.roles.map((r) => r.role),
      };
    },
  );

  // POST /auth/change-password - DECOMMISSIONED (Supabase Auth is canonical)
  fastify.post(
    "/change-password",
    async (_request, reply) => {
      return reply.status(410).send({
        error: "GONE",
        message: "Endpoint /auth/change-password đã ngừng hoạt động. Vui lòng đổi mật khẩu trực tiếp qua Supabase Auth (supabase.auth.updateUser).",
      });
    },
  );

  // POST /auth/verify-password - DECOMMISSIONED (Supabase Auth is canonical)
  fastify.post(
    "/verify-password",
    async (_request, reply) => {
      return reply.status(410).send({
        error: "GONE",
        message: "Endpoint /auth/verify-password đã ngừng hoạt động. Vui lòng xác thực qua Supabase Auth.",
      });
    },
  );
};

export default authRoutes;
