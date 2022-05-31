import fastifyEnv from '@fastify/env';
import fastify, { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { nanoid } from 'nanoid';
import pino, { Logger } from 'pino';
import { PrismaClient } from '@prisma/client'

import { fastifyLogger } from './logger';
import { envConfig } from './env';

import { miscRoutes } from './misc';
import { authRoutes } from './auth';
import prismaPlugin from '../plugins/prisma'

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

server.register(prismaPlugin);
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
const prisma = new PrismaClient({})

// A `main` function so that you can use async/await
async function main() {
  // Create user, posts, and categories
  // const user = await prisma.user.create({
  //   data: {
  //     email: 'ariadne@prisma.io',
  //     name: 'Ariadne',
  //     posts: {
  //       create: [
  //         {
  //           title: 'My first day at Prisma',
           
  //         },
          
          
  //       ],
  //     },
  //   },
  // })
// console.log(user);

const users= await prisma.user.findMany()
console.log(users);

}
main()