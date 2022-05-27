import { FastifyPluginCallback, FastifyPluginOptions } from 'fastify';
import { Server } from 'http';

import { rootHandler } from './handler';
import { rootReqValidator } from './validation';

export const miscRoutes: FastifyPluginCallback<FastifyPluginOptions, Server> = (
  server,
  _,
  done
) => {
  // GET /
  server.get('/', rootReqValidator, rootHandler);

  done();
};
