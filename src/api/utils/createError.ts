class HTTPError extends Error {
  statusCode: number = 200;
}

const getDefaultMessage = (
  code: number
): string => {
  const map = {
    400: 'Bad Request'
  };
  return (
    map[code as keyof typeof map] ||
    'Internal Error'
  );
};

const createError = (
  code: number,
  message?: string
) => {
  let error: HTTPError = new HTTPError(
    message || getDefaultMessage(code)
  );
  error.statusCode = code;
  return error;
};

export { createError };
