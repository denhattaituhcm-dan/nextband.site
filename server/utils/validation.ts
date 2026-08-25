import { FastifyReply, FastifyRequest } from "fastify";
import { SafeParseReturnType } from "zod";

/**
 * Handles Zod validation results with standardized logging and error response.
 * @param validation The result of zod.safeParse()
 * @param request Fastify request for logging
 * @param reply Fastify reply for sending error response
 * @returns validation.data if successful, otherwise undefined (already sent response)
 */
export function handleValidation<T>(
  validation: SafeParseReturnType<any, T>,
  request: FastifyRequest,
  reply: FastifyReply,
): T | undefined {
  if (!validation.success) {
    request.log.warn({
      msg: "Validation failed",
      errors: validation.error.format(),
      body: request.body,
      query: request.query,
      params: request.params,
    });

    const fieldErrors = validation.error.flatten().fieldErrors;
    const detailMessages = Object.values(fieldErrors).flat().filter(Boolean);
    const primaryMessage = detailMessages.length > 0 ? detailMessages.join(", ") : "Dữ liệu không hợp lệ";

    reply.status(400).send({
      error: primaryMessage,
      message: primaryMessage,
      details: fieldErrors,
    });
    return undefined;
  }

  return validation.data;
}
