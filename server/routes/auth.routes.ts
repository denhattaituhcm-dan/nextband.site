import { FastifyPluginAsync } from "fastify";
import { authenticate } from "../middlewares/auth.middleware.js";
import { toFileUrl } from "../utils/file.js";

const authRoutes: FastifyPluginAsync = async (fastify) => {
  // POST /auth/register - DECOMMISSIONED (Supabase Auth is canonical)
  fastify.post(
    "/register",
    async (_request, reply) => {
      return reply.status(410).send({
        error: "GONE",
        message: "Endpoint /auth/register đã ngừng hoạt động. Vui lòng đăng ký tài khoản qua Supabase Auth SDK.",
      });
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

  // POST /auth/login/google - DECOMMISSIONED (Supabase Auth is canonical)
  fastify.post(
    "/login/google",
    async (_request, reply) => {
      return reply.status(410).send({
        error: "GONE",
        message: "Endpoint /auth/login/google đã ngừng hoạt động. Vui lòng đăng nhập Google qua Supabase Auth OAuth provider.",
      });
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

    if (user.isActive === false) {
      return reply.status(403).send({ error: "Tài khoản đã bị vô hiệu hóa" });
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
        select: { id: true, userId: true, isActive: true },
      });

      if (!existingUser) {
        return reply.status(404).send({ error: "Không tìm thấy người dùng" });
      }

      if (existingUser.isActive === false) {
        return reply.status(403).send({ error: "Tài khoản đã bị vô hiệu hóa" });
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
