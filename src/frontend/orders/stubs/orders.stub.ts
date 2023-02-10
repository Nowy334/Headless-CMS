export const orderStub = () => {
  return {
    orderNumber: 123456,
    customerData: {
      name: 'test',
      lastName: 'test',
      street: 'testowa',
      postCode: '11-111',
      city: 'Test',
      phone: '123456789',
      email: 'test@test.pl',
      comments: 'empty',
    },
    items: ['123', '456'],
    date: '20.01.2022',
    status: 'New',
    totalPrice: 200,
  };
};
