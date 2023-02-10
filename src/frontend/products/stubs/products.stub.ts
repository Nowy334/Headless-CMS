export const productStub = () => {
  return {
    success: {
      _id: '123',
      title: 'test',
      description: 'test',
      price: 100,
      mainPhoto: {
        title: 'test photo',
        src: 'test photo src',
        fileName: 'test fileName',
      },
      photos: [
        {
          title: 'test photo',
          src: 'test photo src',
          fileName: 'test fileName',
        },
      ],
      properties: [
        {
          name: 'test',
          value: 'test',
        },
      ],
      category: '123',
      slug: 'test',
    },
    error: {
      statusCode: 500,
      errorType: 'error',
      errorMessage: 'error message',
    },
  };
};
