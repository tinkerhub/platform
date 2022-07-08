import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { AuthService } from '../../auth/service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const dependencyPlugin: FastifyPluginAsync = fp(async (server, _) => {
  const auth = new AuthService();
  server.decorate('service', {
    auth,
  });
});
