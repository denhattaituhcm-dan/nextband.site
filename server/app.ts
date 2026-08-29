import Fastify from "fastify";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import helmet from "@fastify/helmet";
import multipart from "@fastify/multipart";
import staticPlugin from "@fastify/static";
import { join } from "path";
import { existsSync, mkdirSync } from "fs";
import { env } from "./config/env.js";
import prismaPlugin from "./plugins/prisma.js";
import authPlugin from "./plugins/auth.js";
import routes from "./routes/index.js";
import { ClassSchedulerService } from "./services/class-scheduler.service.js";

export async function buildApp() {
  const isServerless =
    process.env.VERCEL === "1" ||
    Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME) ||
    Boolean(process.env.VERCEL_ENV);
  const isProduction =
    env.NODE_ENV === "production" || process.env.NODE_ENV === "production";

  let loggerConfig: any;
  if (isServerless || isProduction) {
    loggerConfig = {
      level: isProduction ? "info" : "debug",
    };
  } else {
    const logDir = join(process.cwd(), "logs");
    if (!existsSync(logDir)) {
      try {
        mkdirSync(logDir, { recursive: true });
      } catch {
        // Safe failover for readonly environments
      }
    }
    const logFile = join(logDir, "app.log");
    loggerConfig = {
      level: "debug",
      transport: {
        targets: [
          {
            target: "pino-pretty",
            options: { colorize: true },
            level: "debug",
          },
          ...(existsSync(logDir)
            ? [
                {
                  target: "pino/file",
                  options: { destination: logFile },
                  level: "debug",
                },
              ]
            : []),
        ],
      },
    };
  }

  const app = Fastify({
    logger: loggerConfig,
  });

  // Observability: Gán X-Request-ID vào mọi Response Header & enforce strict allowlist-based cache security
  app.addHook("onSend", async (request, reply, payload) => {
    reply.header("X-Request-ID", request.id);

    if (request.url.startsWith("/api/")) {
      const isGet = request.method === "GET";
      const hasAuthHeader = Boolean(request.headers.authorization);
      const isSuccess = reply.statusCode >= 200 && reply.statusCode < 300;
      const urlPath = request.url.split("?")[0].replace(/\/+$/, "");

      const isPublicCourses =
        isGet &&
        !hasAuthHeader &&
        (/^\/api\/v1\/courses(\/.*)?$/.test(urlPath));

      const isPublicSiteSettings =
        isGet &&
        !hasAuthHeader &&
        urlPath === "/api/v1/site-settings";

      // Chỉ cho phép đúng 2 public read-only boundaries được hưởng route-level cache header khi status 2xx và không có Auth header
      if (isSuccess && (isPublicCourses || isPublicSiteSettings) && reply.hasHeader("Cache-Control")) {
        // Allow explicit route cache header
      } else {
        // Enforce absolute no-store on EVERYTHING else (Auth, user mutations, 4xx/5xx, non-whitelisted)
        reply.header(
          "Cache-Control",
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        );
        reply.header("Pragma", "no-cache");
        reply.header("Expires", "0");
        reply.header("Surrogate-Control", "no-store");
      }
    }

    return payload;
  });

  // Exact CORS Allowlist matching
  const exactAllowedOrigins = new Set<string>([
    "https://nextband.site",
    "https://www.nextband.site",
  ]);

  if (env.FRONTEND_URL) {
    env.FRONTEND_URL.split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((u) => exactAllowedOrigins.add(u));
  }

  if (env.PREVIEW_ALLOWED_ORIGINS) {
    env.PREVIEW_ALLOWED_ORIGINS.split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((u) => exactAllowedOrigins.add(u));
  }

  await app.register(cors, {
    origin: (origin, cb) => {
      // Direct / non-browser requests without origin header
      if (!origin) {
        return cb(null, true);
      }

      const isProduction =
        process.env.NODE_ENV === "production" || env.NODE_ENV === "production";

      if (!isProduction) {
        return cb(null, true);
      }

      // Exact match against allowlist Set (no wildcard, case/port/domain sensitive)
      const isAllowed = exactAllowedOrigins.has(origin);
      cb(null, isAllowed);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  });

  // Security Headers via Helmet (API Hardening)
  await app.register(helmet, {
    contentSecurityPolicy: false, // CSP is configured on frontend nextband
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: false,
    },
    noSniff: true,
    frameguard: {
      action: "deny",
    },
    referrerPolicy: {
      policy: "strict-origin-when-cross-origin",
    },
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  });

  // Global & Per-Route Rate Limiter
  await app.register(rateLimit, {
    global: true,
    max: 200,
    timeWindow: "1 minute",
    keyGenerator: (request) => {
      // If trusted proxy IPs are configured, verify socket remoteAddress before trusting x-forwarded-for
      if (env.TRUST_PROXY_IPS) {
        const trustedList = env.TRUST_PROXY_IPS.split(",").map((s) => s.trim());
        const remoteSocketIp = request.raw.socket.remoteAddress || "";
        if (trustedList.includes(remoteSocketIp)) {
          const xForwardedFor = request.headers["x-forwarded-for"];
          if (xForwardedFor) {
            const firstIp = (Array.isArray(xForwardedFor) ? xForwardedFor[0] : xForwardedFor).split(",")[0].trim();
            if (firstIp) return firstIp;
          }
        }
      }
      return request.ip;
    },
    errorResponseBuilder: (_request, context) => {
      return {
        statusCode: 429,
        error: "Too Many Requests",
        message: `Quá nhiều yêu cầu. Vui lòng thử lại sau ${Math.ceil(context.ttl / 1000)} giây.`,
        retryAfter: Math.ceil(context.ttl / 1000),
      };
    },
  });

  // File upload (multipart)
  await app.register(multipart, {
    limits: {
      fileSize: parseInt(env.MAX_FILE_SIZE), // 50MB default
    },
  });

  // Ensure upload directory exists (safely fallback in serverless)
  const uploadDir = isServerless
    ? join("/tmp", env.UPLOAD_DIR || "uploads")
    : join(process.cwd(), env.UPLOAD_DIR || "uploads");

  if (!existsSync(uploadDir)) {
    try {
      mkdirSync(uploadDir, { recursive: true });
    } catch {
      // Ignore in readonly filesystem
    }
  }

  // Serve static files (uploaded files) if directory is accessible
  if (existsSync(uploadDir)) {
    await app.register(staticPlugin, {
      root: uploadDir,
      prefix: "/uploads/",
      decorateReply: false,
    });
  }

  // Plugins
  await app.register(prismaPlugin);
  await app.register(authPlugin);

  // Root Health check for load balancers & Render
  app.get("/health", async () => {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
    };
  });

  // Global error handler - Structured logging on server & Clean sanitized response for client
  app.setErrorHandler((error: any, request, reply) => {
    let statusCode = error.statusCode || 500;
    let clientMessage = error.message || "Đã xảy ra lỗi hệ thống.";
    let errorType = error.name || "Error";

    // 1. Map Prisma specific errors
    if (error.name === "PrismaClientKnownRequestError") {
      switch (error.code) {
        case "P2002":
          statusCode = 409;
          const targetFields = Array.isArray(error.meta?.target)
            ? error.meta.target.join(", ")
            : error.meta?.target || "trường dữ liệu";
          clientMessage = `Dữ liệu bị trùng lặp: ${targetFields} đã tồn tại trong hệ thống.`;
          errorType = "DuplicateError";
          break;
        case "P2003":
          statusCode = 400;
          clientMessage = "Dữ liệu liên kết không hợp lệ hoặc đã bị xóa.";
          errorType = "ForeignKeyError";
          break;
        case "P2025":
          statusCode = 404;
          clientMessage = "Không tìm thấy bản ghi yêu cầu trong hệ thống.";
          errorType = "NotFoundError";
          break;
        case "P2023":
          statusCode = 400;
          clientMessage = "Mã định danh (ID) không đúng định dạng.";
          errorType = "ValidationError";
          break;
        default:
          statusCode = 400;
          clientMessage = "Lỗi truy vấn dữ liệu không hợp lệ.";
          errorType = "DatabaseQueryError";
      }
    } else if (error.name === "PrismaClientValidationError") {
      statusCode = 400;
      clientMessage = "Dữ liệu hoặc mã định danh (ID) không đúng định dạng.";
      errorType = "ValidationError";
    } else if (error.message && typeof error.message === "string") {
      if (error.message.includes("violates check constraint")) {
        statusCode = 400;
        clientMessage = "Dữ liệu không thỏa mãn ràng buộc trạng thái hoặc giá trị hợp lệ của hệ thống.";
        errorType = "ConstraintViolation";
      } else if (error.message.includes("violates foreign key constraint")) {
        statusCode = 400;
        clientMessage = "Dữ liệu liên kết không tồn tại.";
        errorType = "ForeignKeyError";
      } else if (error.message.includes("Inconsistent column data") || error.message.includes("Error creating UUID")) {
        statusCode = 400;
        clientMessage = "Mã định danh (ID) không đúng định dạng.";
        errorType = "ValidationError";
      }
    }

    // 2. Map Zod validation errors
    if (error.name === "ZodError") {
      statusCode = 400;
      clientMessage = "Dữ liệu gửi lên không đúng định dạng.";
      errorType = "ValidationError";
    }

    // 3. In production / serverless, sanitize any 5xx error to prevent leaking internals
    const isProdOrServerless =
      process.env.NODE_ENV === "production" ||
      process.env.VERCEL === "1" ||
      isServerless;

    if (statusCode >= 500 && isProdOrServerless) {
      clientMessage = "Đã xảy ra lỗi hệ thống. Vui lòng liên hệ quản trị viên.";
      errorType = "InternalServerError";
    }

    // Full diagnostic in server log (preserves forensic details)
    app.log.error({
      requestId: request.id,
      url: request.url,
      method: request.method,
      statusCode,
      errName: error.name,
      errCode: error.code,
      errMessage: error.message,
      err: error,
    });

    return reply.status(statusCode).send({
      statusCode,
      error: statusCode >= 500 && isProdOrServerless ? "Internal Server Error" : clientMessage,
      message: clientMessage,
      errorType,
      requestId: request.id,
      ...(error.issues ? { details: error.issues } : {}),
    });
  });

  // API Routes
  await app.register(routes, { prefix: "/api/v1" });

  // Not found handler
  app.setNotFoundHandler((_request, reply) => {
    reply.status(404).send({
      error: "Route not found",
      statusCode: 404,
    });
  });

  // Background Class Lifecycle Scheduler (runs on persistent server instances)
  if (!isServerless) {
    let scheduler: ClassSchedulerService | null = null;
    app.addHook("onReady", async () => {
      scheduler = new ClassSchedulerService(app.prisma, app.log);
      scheduler.start();
    });
    app.addHook("onClose", async () => {
      if (scheduler) {
        scheduler.stop();
        scheduler = null;
      }
    });
  }

  return app;
}
