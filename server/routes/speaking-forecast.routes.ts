import { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { authenticate, requireRoles, optionalAuthenticate } from "../middlewares/auth.middleware.js";
import { handleValidation } from "../utils/validation.js";

const updateForecastSchema = z.object({
  seasons: z.array(z.any()),
  topics: z.array(z.any()),
  selectedSeasonId: z.string().optional(),
});

const FORECAST_SETTINGS_KEY = "speaking_forecast";

const speakingForecastRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /speaking-forecast - Public endpoint to retrieve published forecast
  fastify.get("/", { preHandler: optionalAuthenticate }, async (request, reply) => {
    try {
      const record = await fastify.prisma.siteSettings.findFirst({
        where: { key: FORECAST_SETTINGS_KEY },
      });

      if (!record || !record.value) {
        return reply.send({
          seasons: [],
          topics: [],
          selectedSeasonId: "",
          isDefault: true,
        });
      }

      const data = record.value as any;
      const currentUser = (request as any).user;
      const isAdminOrTeacher = currentUser?.roles?.some((r: string) => ["admin", "teacher"].includes(r));

      if (isAdminOrTeacher) {
        return reply.send(data);
      }

      // Public filter: only return published seasons and topics
      const publishedTopics = (data.topics || []).filter((t: any) => t.status === "Published" || t.isPublished === true);
      const publishedSeasons = (data.seasons || []).filter((s: any) => s.isPublished !== false);

      return reply.send({
        seasons: publishedSeasons,
        topics: publishedTopics,
        selectedSeasonId: data.selectedSeasonId || (publishedSeasons[0]?.id || ""),
      });
    } catch (err: any) {
      request.log.error(err, "Failed to retrieve public speaking forecast");
      return reply.status(500).send({ error: "Không thể tải dữ liệu Speaking Forecast" });
    }
  });

  // GET /speaking-forecast/admin - Full dataset for Admin & Teachers
  fastify.get(
    "/admin",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      try {
        const record = await fastify.prisma.siteSettings.findFirst({
          where: { key: FORECAST_SETTINGS_KEY },
        });

        if (!record || !record.value) {
          return reply.send({
            seasons: [],
            topics: [],
            selectedSeasonId: "",
            isDefault: true,
          });
        }

        return reply.send(record.value);
      } catch (err: any) {
        request.log.error(err, "Failed to retrieve admin speaking forecast");
        return reply.status(500).send({ error: "Không thể tải dữ liệu Speaking Forecast" });
      }
    }
  );

  // PUT /speaking-forecast/admin - Persist updated seasons and topics
  fastify.put(
    "/admin",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const validated = handleValidation(
        updateForecastSchema.safeParse(request.body),
        request,
        reply
      );
      if (!validated) return;

      try {
        const existing = await fastify.prisma.siteSettings.findFirst({
          where: { key: FORECAST_SETTINGS_KEY },
        });

        const payloadValue = {
          seasons: validated.seasons,
          topics: validated.topics,
          selectedSeasonId: validated.selectedSeasonId,
          updatedAt: new Date().toISOString(),
          updatedBy: (request as any).user?.id,
        };

        if (existing) {
          const updated = await fastify.prisma.siteSettings.update({
            where: { id: existing.id },
            data: { value: payloadValue },
          });
          return reply.send({ success: true, data: updated.value });
        } else {
          const created = await fastify.prisma.siteSettings.create({
            data: {
              key: FORECAST_SETTINGS_KEY,
              value: payloadValue,
            },
          });
          return reply.status(201).send({ success: true, data: created.value });
        }
      } catch (err: any) {
        request.log.error(err, "Failed to save speaking forecast");
        return reply.status(500).send({ error: "Không thể lưu dữ liệu Speaking Forecast" });
      }
    }
  );
};

export default speakingForecastRoutes;
