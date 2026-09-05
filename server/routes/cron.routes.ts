import { FastifyPluginAsync } from 'fastify';
import { SnapshotService } from '../services/snapshot.service.js';

const cronRoutes: FastifyPluginAsync = async (fastify) => {
  const snapshotService = new SnapshotService(fastify.prisma);

  const handleWeeklySnapshot = async (request: any, reply: any) => {
    // Validate secret if configured
    const cronSecret = process.env.CRON_SECRET;
    const authHeader = request.headers['authorization'];
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return reply.status(401).send({
        success: false,
        error: 'Unauthorized: Invalid CRON_SECRET token',
      });
    }

    try {
      fastify.log.info('Triggering Weekly Snapshot calculation job...');
      const result = await snapshotService.executeWeeklySnapshot();
      fastify.log.info(result, 'Weekly Snapshot calculation completed successfully.');

      return reply.send({
        success: true,
        data: result,
      });
    } catch (err: any) {
      fastify.log.error(err, 'Weekly Snapshot job failed');
      return reply.status(500).send({
        success: false,
        error: 'Weekly snapshot calculation failed: ' + err.message,
      });
    }
  };

  // Support both GET (for Vercel Cron) and POST (for manual trigger)
  fastify.get('/weekly-snapshot', handleWeeklySnapshot);
  fastify.post('/weekly-snapshot', handleWeeklySnapshot);
};

export default cronRoutes;
