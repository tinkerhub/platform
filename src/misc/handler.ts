import { FastifyReply, FastifyRequest } from 'fastify';

export const rootHandler = async (_: FastifyRequest, reply: FastifyReply) => {
  reply.send('first rquest');
};
