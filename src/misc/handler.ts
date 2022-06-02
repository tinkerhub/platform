import { FastifyReply, FastifyRequest } from 'fastify';

export const rootHandler = async (_req: FastifyRequest, reply: FastifyReply) => {
  reply.status(201).send('hello world');
};
