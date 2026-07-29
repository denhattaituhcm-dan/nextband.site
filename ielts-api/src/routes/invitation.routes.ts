import { FastifyPluginAsync } from 'fastify';
import { InvitationService } from '../services/invitation.service.js';
import { joinByCodeSchema, createInvitationSchema } from '../validations/schemas.js';

const invitationRoutes: FastifyPluginAsync = async (fastify) => {
  const invitationService = new InvitationService(fastify.prisma);

  // Student joins class via invite code (Zero-friction)
  fastify.post('/join', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const user = request.user as { id: string };
    const body = joinByCodeSchema.parse(request.body);

    const result = await invitationService.joinClassByCode(user.id, body.inviteCode);
    return reply.send(result);
  });

  // Admin/Teacher generates invite code
  fastify.post('/generate', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const user = request.user as { id: string };
    const body = createInvitationSchema.parse(request.body);

    const invitation = await invitationService.generateInvitation(
      body.classId,
      user.id,
      body.inviteCode,
      body.expiresInDays
    );
    return reply.send({ success: true, invitation });
  });
};

export default invitationRoutes;
