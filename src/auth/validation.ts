import { RouteShorthandOptions } from 'fastify';

export const authMeReqValidator: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              username: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  },
};
