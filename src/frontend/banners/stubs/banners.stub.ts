export const bannerStub = () => {
  return {
    success: {
      _id: '123',
      symbol: 'symbol',
      title: 'test',
      description: 'description test',
      targetUrl: 'targetUrl test',
      targetUrlTitle: 'targetUrlTitle test',
      imageUrl: 'imageUrl test',
      active: true,
      category: '123',
    },
    error: {
      statusCode: 500,
      errorType: 'error',
      errorMessage: 'error message',
    },
  };
};
