export const snippetStub = () => {
  return {
    success: {
      symbol: 'test',
      title: 'test',
      description: 'test',
    },
    error: {
      statusCode: 500,
      errorType: 'error',
      errorMessage: 'error message',
    },
  };
};
