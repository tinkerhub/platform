import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'
import { PrismaClient } from '@prisma/client'

// Use TypeScript module augmentation to declare the type of server.prisma to be PrismaClient
declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}
const prisma = new PrismaClient()

const prismaPlugin: FastifyPluginAsync = fp(async (server, {}) => {
  await prisma.$connect()
  // Make Prisma Client available through the fastify server instance: server.prisma
  server.decorate('prisma', prisma)

  server.addHook('onClose', async (server) => {
    await server.prisma.$disconnect()
  })
})
async function main() {

  const users= await prisma.user.findMany()
  console.log(users);
  
  }
  main()
export default prismaPlugin
