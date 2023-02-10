import { orderStub } from '../stubs/orders.stub';

export const OrdersService = jest.fn().mockReturnValue({
  create: jest.fn().mockReturnValue(orderStub()),
});
