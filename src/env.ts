import { fastifyEnvOpt } from '@fastify/env';
import { FastifyRegisterOptions } from 'fastify';

export const schema = {
  type: 'object',
  required: ['PORT'],
  properties: {
    PORT: {
      type: 'number',
      default: 3000,
    },
    HOST: {
      type: 'string',
      default: '0.0.0.0',
    },
  },
};

export const envConfig: FastifyRegisterOptions<fastifyEnvOpt> = {
  schema,
  dotenv: true,
};
