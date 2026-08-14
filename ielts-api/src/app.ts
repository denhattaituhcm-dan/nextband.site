import Fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import staticPlugin from "@fastify/static";
import { join } from "path";
import { existsSync, mkdirSync } from "fs";
import { env } from "./config/env.js";
import prismaPlugin from "./plugins/prisma.js";
import authPlugin from "./plugins/auth.js";
import routes from "./routes/index.js";

export async function buildApp() {
  const logDir = join(process.cwd(), "logs");
  if (!existsSync(logDir)) {
    mkdirSync(logDir, { recursive: true });
  }
  const logFile = join(logDir, "app.log");
  const app = Fastify({
    logger: {
      level: env.NODE_ENV === "production" ? "info" : "debug",
      transport: {
        targets: [
          ...(env.NODE_ENV !== "production"
            ? [
                {
                  target: "pino-pretty",
                  options: { colorize: true },
                  level: "debug",
                },
              ]
            : []),
          {
            target: "pino/file",
            options: { destination: logFile },
            level: "debug",
          },
        ],
      },
    },
  });

  // Force-disable caching for all API responses to avoid stale data across clients/devices.
  app.addHook("onSend", async (request, reply, payload) => {
    if (request.url.startsWith("/api/")) {
      reply.header(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate",
      );
      reply.header("Pragma", "no-cache");
      reply.header("Expires", "0");
      reply.header("Surrogate-Control", "no-store");
    }
    return payload;
  });

  // CORS - Robust Multi-Origin & Vercel Preview Support
  await app.register(cors, {
    origin: (origin, cb) => {
      if (!origin || env.NODE_ENV !== "production") {
        return cb(null, true);
      }

      const allowedOrigins = [
        env.FRONTEND_URL,
        "https://nextband.site",
        "https://www.nextband.site",
      ].flatMap((url) => (url ? url.split(",").map((s) => s.trim()) : []));

      let isAllowed = allowedOrigins.some((allowed) => origin === allowed || allowed === "*");

      try {
        const hostname = new URL(origin).hostname;
        if (hostname.endsWith(".vercel.app") || hostname === "localhost") {
          isAllowed = true;
        }
      } catch (e) {
        // Ignored
      }

      cb(null, isAllowed);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  });

  // File upload (multipart)
  await app.register(multipart, {
    limits: {
      fileSize: parseInt(env.MAX_FILE_SIZE), // 50MB default
    },
  });

  // Ensure upload directory exists
  const uploadDir = join(process.cwd(), env.UPLOAD_DIR);
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
  }

  // Serve static files (uploaded files)
  await app.register(staticPlugin, {
    root: uploadDir,
    prefix: "/uploads/",
    decorateReply: false,
  });

  // Plugins
  await app.register(prismaPlugin);
  await app.register(authPlugin);

  // API Routes
  await app.register(routes, { prefix: "/api/v1" });

  // Global error handler
  app.setErrorHandler((error, _request, reply) => {
    app.log.error(error);

    const statusCode = error.statusCode || 500;
    const message =
      statusCode === 500 ? "Internal Server Error" : error.message;

    reply.status(statusCode).send({
      error: message,
      statusCode,
      ...(env.NODE_ENV !== "production" && { stack: error.stack }),
    });
  });

  // Not found handler
  app.setNotFoundHandler((_request, reply) => {
    reply.status(404).send({
      error: "Route not found",
      statusCode: 404,
    });
  });

  return app;
}
