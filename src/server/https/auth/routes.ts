import { FastifyPluginCallback, FastifyPluginOptions, FastifyReply, FastifyRequest } from 'fastify';
import { Server } from 'http';
import { authMeReqValidator } from './validator';

export const authRoutes: FastifyPluginCallback<FastifyPluginOptions, Server> = (
  server,
  _,
  done
) => {
  // GET /me
  server.get('/me', authMeReqValidator, (_req: FastifyRequest, res: FastifyReply) => {
    const result = res.server.service.auth.getCurrentUser('Tinkerhub platform');
    res.send(result);
  });
  done();
};
