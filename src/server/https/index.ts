import fastifyEnv from '@fastify/env';
import fastify, { FastifyInstance, FastifyReply } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { nanoid } from 'nanoid';
import { dependencyPlugin } from 'server/plugins/dependency';
import Swagger from '@fastify/swagger';
import pino, { Logger } from 'pino';
import { verifySession } from 'supertokens-node/recipe/session/framework/fastify';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import Passwordless from 'supertokens-node/recipe/passwordless';
import { plugin, SessionRequest } from 'supertokens-node/framework/fastify';
import formDataPlugin from '@fastify/formbody';
import cors from '@fastify/cors';
import { ErrorResponse } from '../response';
import { prismaPlugin } from '../plugins/prisma';
// import { authRoutes } from './auth/routes';
import { envConfig } from '../../env';
import { fastifyLogger } from '../logger';

supertokens.init({
  framework: 'fastify',
  supertokens: {
    // try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
    connectionURI: process.env.SUPERTOKENS_URI as string,
    apiKey: process.env.SUPERTOKENS_API_KEY as string,
  },
  appInfo: {
    // learn more about this on https://supertokens.com/docs/session/appinfo
    appName: process.env.APP_NAME as string,
    apiDomain: process.env.SUPERTOKENS_API_DOMAIN as string,
    websiteDomain: process.env.SUPERTOKENS_WEBSITE_DOMAIN as string,
    apiBasePath: '/auth',
    websiteBasePath: '/auth',
  },
  recipeList: [
    Passwordless.init({
      flowType: 'USER_INPUT_CODE',
      contactMethod: 'PHONE',
      override: {
        apis: (originalImplementation) => ({
          ...originalImplementation,
          consumeCodePOST: async (input) => {
            if (originalImplementation.consumeCodePOST === undefined) {
              throw Error('Should never come here');
            }

            // First we call the original implementation of consumeCodePOST.
            const response = await originalImplementation.consumeCodePOST(input);

            // Post sign up response, we check if it was successful
            if (response.status === 'OK') {
              const { phoneNumber } = response.user;

              console.log({ phoneNumber });

              if (response.createdNewUser) {
                // TODO: post sign up logic
              } else {
                // TODO: post sign in logic
              }
            }
            return response;
          },
        }),
      },
    }),
    Session.init(), // initializes session features
  ],
});

export const server: FastifyInstance = fastify<Server, IncomingMessage, ServerResponse, Logger>({
  logger: pino({
    level: 'info',
    redact: ['req.headers.authorization'],
  }),
  genReqId: () => nanoid(),
  disableRequestLogging: true,
});
server.register(fastifyEnv, envConfig);
server.register(fastifyLogger);
server.register(dependencyPlugin);
server.register(Swagger, {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'Tinkerhub Platform',
      description:
        'Tinkerhub Platform is a community built platform for Tinkers to condut there activities.',
      version: '1.0',
    },
    host: 'localhost',
    schemes: ['http'],
  },
});
server.register(cors, {
  origin: process.env.SUPERTOKENS_FRONTEND_PORT,
  allowedHeaders: ['Content-Type', ...supertokens.getAllCORSHeaders()],
  credentials: true,
});
server.register(formDataPlugin);
server.register(plugin);
// routes
// server.register(authRoutes, { prefix: '/auth' });

server.register(prismaPlugin);

// global error handler
server.setErrorHandler((error: ErrorResponse, _request, reply: FastifyReply) => {
  const code = error.statusCode || 500;
  const message = error.message || 'the requested route was not found';
  reply.status(code).send({ success: false, message, error: error.error });
});

server.post(
  '/',
  {
    preHandler: verifySession({ sessionRequired: false }),
  },
  (req: SessionRequest, res) => {
    console.log(res);

    if (req.session !== undefined) {
      const userId = req.session.getUserId();

      console.log(userId);
    } else {
      // user is not logged in...
    }
  }
);
