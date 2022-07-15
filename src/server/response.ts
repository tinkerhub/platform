// response handling function
export function renderResponse(
  success: boolean,
  message: string,
  data: unknown,
  code: number = 404
) {
  if (success) {
    return {
      success: true,
      message,
      data,
    };
  }
  const error = new Error() as ErrorResponse;
  error.message = message;
  error.error = data;
  error.statusCode = code;
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw error;
}

export interface ErrorResponse {
  message?: string;
  error?: unknown;
  statusCode?: number;
}
