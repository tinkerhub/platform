import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';

export const fastifyLogger = fp(async (server: FastifyInstance) => {
  server.addHook('onRequest', (req, _, done) => {
    req.log.info({ url: req.raw.url, id: req.id }, 'received request');
    done();
  });

  server.addHook('onResponse', (req, reply, done) => {
    req.log.info(
      {
        url: req.raw.url, // add url to response as well for simple correlating
        statusCode: reply.raw.statusCode,
        durationMs: reply.getResponseTime(),
      },
      'request completed'
    );
    done();
  });
});
