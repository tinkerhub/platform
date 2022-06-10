import { FastifyInstance as FI } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance extends FI {
    prisma: PrismaClient
    config: {
      PORT: number;
      HOST: string;
    };
  }
}
