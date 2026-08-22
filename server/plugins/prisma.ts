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
  let url = process.env.DATABASE_URL || env.DATABASE_URL;
  if (!url) return undefined;

  // Supabase direct database connection (port 5432) requires IPv6 which is unsupported in Vercel Serverless.
  // Automatically route through the official Supabase IPv4 Transaction Pooler (port 6543) using the provided credentials.
  if (url.includes("db.gzpdlqxjggyxlkeatvvf.supabase.co")) {
    try {
      const parsed = new URL(url);
      parsed.hostname = "aws-0-ap-southeast-2.pooler.supabase.com";
      parsed.port = "6543";
      if (!parsed.username.includes(".")) {
        parsed.username = `${parsed.username}.gzpdlqxjggyxlkeatvvf`;
      }
      if (!parsed.searchParams.has("pgbouncer")) {
        parsed.searchParams.set("pgbouncer", "true");
      }
      url = parsed.toString();
    } catch {
      // Keep original URL if parsing fails
    }
  }

  return url;
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
