import { AuthIinterface } from 'auth/service';
import { FastifyInstance as FI } from 'fastify';

interface Service {
  auth: AuthIinterface;
}

declare module 'fastify' {
  interface FastifyInstance extends FI {
    prisma: PrismaClient;
    config: {
      PORT: number;
      HOST: string;
      DATABASE_URL: string;
    };
    service: Service;
  }
}
