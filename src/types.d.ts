import { FastifyInstance as FI } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance extends FI {
    config: {
      PORT: number;
      HOST: string;
    };
  }
}
