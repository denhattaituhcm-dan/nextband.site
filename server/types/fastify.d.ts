import { PrismaClient } from "@prisma/client";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
    authenticate: any;
    authenticateAdmin: any;
    authenticateTeacher: any;
    supabase: any;
  }
}
