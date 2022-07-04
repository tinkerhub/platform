import fastifyEnv from '@fastify/env';
import fastify, { FastifyInstance, FastifyReply } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { nanoid } from 'nanoid';
import { dependencyPlugin } from 'server/plugins/dependency';
import pino, { Logger } from 'pino';
import Swagger from '@fastify/swagger';
import { fastifyLogger } from '../../logger';
import { envConfig } from '../../env';
import { authRoutes } from './auth/routes';
import { prismaPlugin } from '../plugins/prisma';
import { ErrorResponse } from '../../response';

export const server: FastifyInstance = fastify<Server, IncomingMessage, ServerResponse, Logger>({
  logger: pino({
    level: 'info',
    redact: ['req.headers.authorization'],
  }),
  genReqId: () => nanoid(),
  disableRequestLogging: true,
});
server.register(fastifyEnv, envConfig);
server.register(fastifyLogger);
server.register(dependencyPlugin);

// routes
server.register(authRoutes, { prefix: '/auth' });

server.register(prismaPlugin);
// Swagger
server.register(Swagger, {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'Tinkerhub Platform',
      description:
        'Tinkerhub Platform is a community built platform for Tinkers to conduct thier activities.',
      version: '1.0',
    },
    host: 'localhost',
    schemes: ['http'],
  },
});

// global error handler
server.setErrorHandler((error: ErrorResponse, _request, reply: FastifyReply) => {
  const code = error.statusCode || 500;
  const message = error.message || 'the requested route was not found';
  reply.status(code).send({ success: false, message, error: error.error });
});
