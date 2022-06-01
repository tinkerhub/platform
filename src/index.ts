import fastifyEnv from '@fastify/env';
import fastify, { FastifyInstance, FastifyReply } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { nanoid } from 'nanoid';
import pino, { Logger } from 'pino';
import { Error } from './response';
import { fastifyLogger } from './logger';
import { envConfig } from './env';
import { miscRoutes } from './misc';
import { authRoutes } from './auth';

const server: FastifyInstance = fastify<Server, IncomingMessage, ServerResponse, Logger>({
  logger: pino({
    level: 'info',
    redact: ['req.headers.authorization'],
  }),
  genReqId: () => nanoid(),
  disableRequestLogging: true,
});

server.register(fastifyEnv, envConfig);
server.register(fastifyLogger);

// routes
server.register(authRoutes, { prefix: '/auth' });
server.register(miscRoutes);

// global error handler
server.setErrorHandler((error: Error, _request, reply: FastifyReply) => {
  const code = error.statusCode || 500;
  const message = error.message || 'the requested route was not found';
  reply.status(code).send({ success: false, message, error: error.error });
});

const start = async () => {
  try {
    await server.after();
    await server.listen(server.config.PORT, server.config.HOST);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
