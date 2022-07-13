import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { PrismaClient } from '@prisma/client';

// Use TypeScript module augmentation to declare the type of server.prisma to be PrismaClient
const prisma = new PrismaClient();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const prismaPlugin: FastifyPluginAsync = fp(async (server, _) => {
  await prisma.$connect();
  // Make Prisma Client available through the fastify server instance: server.prisma
  server.decorate('prisma', prisma);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  server.addHook('onClose', async (server) => {
    await server.prisma.$disconnect();
  });
});
