import fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { nanoid } from 'nanoid';
import pino, { Logger } from 'pino';

const server: FastifyInstance = fastify<
  Server,
  IncomingMessage,
  ServerResponse,
  Logger
>({
  logger: pino({
    level: 'info',
    redact: ['req.headers.authorization'],
  }),
  genReqId: () => nanoid(),
  disableRequestLogging: true,
});

const now = () => Date.now();

server.addHook('onRequest', (req, _, done) => {
  req.log.info({ url: req.raw.url, id: req.id }, 'received request');
  done();
});

server.addHook('onResponse', (req, reply, done) => {
  req.log.info(
    {
      url: req.raw.url, // add url to response as well for simple correlating
      statusCode: reply.raw.statusCode,
      durationMs: now() - reply.getResponseTime(),
    },
    'request completed'
  );
  done();
});

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {
            type: 'string',
          },
        },
      },
    },
  },
};

server.get('/ping', opts, async () => {
  return { pong: 'it worked!' };
});

const start = async () => {
  try {
    await server.listen(3000, '0.0.0.0');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
