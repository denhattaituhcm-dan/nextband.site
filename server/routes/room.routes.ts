import { FastifyInstance } from "fastify";
import { authenticate, requireRoles } from "../middlewares/auth.middleware.js";
import { RoomService } from "../services/room.service.js";

export default async function roomRoutes(fastify: FastifyInstance) {
  const roomService = new RoomService(fastify.prisma);

  // GET /rooms?branchId=... - Danh sách phòng học
  fastify.get<{ Querystring: { branchId?: string } }>(
    "/",
    { preHandler: authenticate },
    async (request, reply) => {
      const rooms = await roomService.listRooms(request.query.branchId);
      return reply.send({ success: true, data: rooms });
    }
  );

  // POST /rooms - Tạo phòng học mới (Admin & Teacher)
  fastify.post<{
    Body: { branchId: string; name: string; capacity?: number };
  }>(
    "/",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const room = await roomService.createRoom(request.body);
      return reply.code(201).send({ success: true, data: room });
    }
  );

  // PUT /rooms/:id - Cập nhật thông tin phòng học
  fastify.put<{
    Params: { id: string };
    Body: { name?: string; capacity?: number; isActive?: boolean };
  }>(
    "/:id",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const room = await roomService.updateRoom(request.params.id, request.body);
      return reply.send({ success: true, data: room });
    }
  );
}
