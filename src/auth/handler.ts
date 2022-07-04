import { FastifyReply, FastifyRequest } from 'fastify';

export interface AuthIinterface {
  authMeHandler: any;
}
export class AuthHandler implements AuthIinterface {
  authMeHandler(_req: FastifyRequest, reply: FastifyReply) {
    reply.send('hello fron auth me handler route');
  }
}
