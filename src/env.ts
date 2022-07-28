import { fastifyEnvOpt } from '@fastify/env';
import { FastifyRegisterOptions } from 'fastify';

export const schema = {
  type: 'object',
  required: ['PORT'],
  properties: {
    PORT: {
      type: 'number',
      default: 5000,
    },
    HOST: {
      type: 'string',
      default: '0.0.0.0',
    },
    DATABASE_URL: {
      type: 'string',
    },
    SUPERTOKENS_URI: {
      type: 'string',
    },
    SUPERTOKENS_API_KEY: {
      type: 'string',
    },
    APP_NAME: {
      type: 'string',
    },
    SUPERTOKENS_API_DOMAIN: {
      type: 'string',
    },
    SUPERTOKENS_WEBSITE_DOMAIN: {
      type: 'string',
    },
    SUPERTOKENS_CORS: {
      type: 'string',
    },
  },
};

export const envConfig: FastifyRegisterOptions<fastifyEnvOpt> = {
  schema,
  dotenv: true,
};
