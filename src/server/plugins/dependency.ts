import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { AuthHandler } from '../../auth/handler';

const authFuncs = new AuthHandler();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const dependencyPlugin: FastifyPluginAsync = fp(async (server, _) => {
  server.decorate('service', authFuncs);
});
