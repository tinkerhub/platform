import { FastifyReply } from 'fastify';

export function handleServerResponse(
  reply: FastifyReply,
  message: string,
  code: number = 500,
  data = null
) {
  const statusCode = code || reply.statusCode;
  const response = message || 'The requested route was not found';
  if (code >= 400) {
    return reply.status(statusCode).send({
      success: false,
      message: response,
    });
  }
  return reply.status(statusCode).send({
    success: true,
    message: response,
    data,
  });
}
