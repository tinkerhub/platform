import { FastifyReply } from 'fastify';

export function handleServerError(reply: FastifyReply, message: string, code: number = 500) {
  const statusCode = code || reply.statusCode;
  const response = message || 'The requested route was  not found';
  return reply.status(statusCode).send({
    sucess: false,
    message: response,
  });
}
