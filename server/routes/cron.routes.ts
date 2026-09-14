import { FastifyPluginAsync } from 'fastify';
import { SnapshotService } from '../services/snapshot.service.js';

const cronRoutes: FastifyPluginAsync = async (fastify) => {
  const snapshotService = new SnapshotService(fastify.prisma);

  const verifyCronSecret = (request: any, reply: any): boolean => {
    const cronSecret = process.env.CRON_SECRET;
    const authHeader = request.headers['authorization'];
    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      reply.status(401).send({
        success: false,
        error: 'Unauthorized: Missing or invalid CRON_SECRET token',
      });
      return false;
    }
    return true;
  };

  const handleWeeklySnapshot = async (request: any, reply: any) => {
    if (!verifyCronSecret(request, reply)) return;

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

  const handleClassMaintenance = async (request: any, reply: any) => {
    if (!verifyCronSecret(request, reply)) return;

    try {
      fastify.log.info('Triggering Class Lifecycle Maintenance cron job...');
      const { ClassSchedulerService } = await import('../services/class-scheduler.service.js');
      const scheduler = new ClassSchedulerService(fastify.prisma, fastify.log);
      const result = await scheduler.runMaintenance();
      fastify.log.info({ result }, 'Class Lifecycle Maintenance cron completed.');

      return reply.send({
        success: true,
        data: result,
      });
    } catch (err: any) {
      fastify.log.error(err, 'Class Lifecycle Maintenance cron failed');
      return reply.status(500).send({
        success: false,
        error: 'Class lifecycle maintenance failed: ' + err.message,
      });
    }
  };

  // Weekly Snapshot routes
  fastify.get('/weekly-snapshot', handleWeeklySnapshot);
  fastify.post('/weekly-snapshot', handleWeeklySnapshot);

  // Daily Class Lifecycle Maintenance routes
  fastify.get('/class-maintenance', handleClassMaintenance);
  fastify.post('/class-maintenance', handleClassMaintenance);
};

export default cronRoutes;
