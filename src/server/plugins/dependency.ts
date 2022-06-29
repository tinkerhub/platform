import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { authMeReqValidator } from 'server/https/auth/validator';

export class DependencyInjector {
  func: any;

  constructor(func: any) {
    this.func = func;
  }
}
const injector = new DependencyInjector(authMeReqValidator);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const dependencyPlugin: FastifyPluginAsync = fp(async (server, _) => {
  server.decorate('service', injector);
});
