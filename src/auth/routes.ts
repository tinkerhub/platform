import { FastifyPluginCallback, FastifyPluginOptions } from 'fastify';
import { Server } from 'http';
import { authMeHandler } from './handler';

import { authMeReqValidator } from './validation';

export const authRoutes: FastifyPluginCallback<FastifyPluginOptions, Server> = (
  server,
  _,
  done
) => {
  // GET /me
  server.get('/me', authMeReqValidator, authMeHandler);

  done();
};
