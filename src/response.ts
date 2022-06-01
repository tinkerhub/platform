import { FastifyReply } from 'fastify';

// response handling function

export function handleServerResponse(
  reply: FastifyReply,
  message: string,
  code: number,
  data: unknown
) {
  return reply.status(code).send({
    success: true,
    message,
    data,
  });
}

// error handler function
export interface Error {
  message?: string;
  error?: unknown;
  statusCode?: number;
}
export const handleServerError = (code: number, message: string, err: unknown = null) => {
  const error = new Error() as Error;
  error.message = message;
  error.error = err;
  error.statusCode = code;
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw error;
};
