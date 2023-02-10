import { productStub } from '../stubs/products.stub';

export const ProductsService = jest.fn().mockReturnValue({
  findByCategory: jest.fn().mockReturnValue([productStub().success]),
  findOne: jest.fn().mockReturnValue(productStub().success),
});
