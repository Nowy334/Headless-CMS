import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { productStub } from './stubs/products.stub';

jest.mock('./products.service');

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    productsController = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    describe('when findOne is called with product id', () => {
      let product;

      beforeEach(async () => {
        product = await productsController.findOne(productStub().success._id);
      });

      it('then it should call productsService ', () => {
        expect(productsService.findOne).toBeCalledWith(
          productStub().success._id,
        );
      });

      it('then it should return a product ', () => {
        expect(product).toEqual(productStub().success);
      });
    });

    describe('when findOne is called without product id', () => {
      let error;

      beforeEach(async () => {
        error = productStub().error;
      });

      it('then it should return error', () => {
        expect(error).toEqual(productStub().error);
      });
    });
  });

  describe('findByCategory', () => {
    describe('when findByCategory is called with category products symbol', () => {
      let products;

      beforeEach(async () => {
        products = await productsController.findByCategory(
          productStub().success.category,
        );
      });

      it('then it should call productsService ', () => {
        expect(productsService.findByCategory).toBeCalledWith(
          productStub().success.category,
        );
      });

      it('then it should return a array of products with the same category ', () => {
        expect(products).toEqual([productStub().success]);
      });
    });

    describe('when findByCategory is called without category products symbol', () => {
      let error;

      beforeEach(async () => {
        error = productStub().error;
      });

      it('then it should return error', () => {
        expect(error).toEqual(productStub().error);
      });
    });
  });
});
