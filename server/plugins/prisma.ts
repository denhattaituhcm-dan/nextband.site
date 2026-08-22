import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import { PrismaClient } from "@prisma/client";
import { env } from "../config/env.js";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

function resolveCanonicalDatabaseUrl(): string | undefined {
  return process.env.DATABASE_URL || env.DATABASE_URL;
}

const prismaPlugin: FastifyPluginAsync = async (fastify) => {
  const dbUrl = resolveCanonicalDatabaseUrl();
  if (dbUrl) {
    process.env.DATABASE_URL = dbUrl;
  }
  const prisma = new PrismaClient({
    datasources: dbUrl ? { db: { url: dbUrl } } : undefined,
    log: fastify.log.level === "debug" ? ["query", "error", "warn"] : ["error"],
  });

  try {
    await prisma.$connect();
  } catch (dbErr: any) {
    fastify.log.warn({ err: dbErr }, "Prisma initial connection deferred in serverless runtime");
  }

  fastify.decorate("prisma", prisma);

  fastify.addHook("onClose", async (instance) => {
    await instance.prisma.$disconnect();
  });
};

export default fp(prismaPlugin, {
  name: "prisma",
});
