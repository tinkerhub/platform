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
  },
};

export const envConfig: FastifyRegisterOptions<fastifyEnvOpt> = {
  schema,
  dotenv: true,
};
