import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { orderStub } from './stubs/orders.stub';

jest.mock('./orders.service');

describe('OrdersController', () => {
  let ordersController: OrdersController;
  let ordersService: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService],
    }).compile();

    ordersController = module.get<OrdersController>(OrdersController);
    ordersService = module.get<OrdersService>(OrdersService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    describe('when create is called', () => {
      let order;
      let createOrderDto;

      beforeEach(async () => {
        createOrderDto = {
          customerData: orderStub().customerData,
          items: orderStub().items,
        };
        order = await ordersController.create(createOrderDto);
      });

      it('then it should call ordersService ', () => {
        expect(ordersService.create).toHaveBeenCalledWith(createOrderDto);
      });

      it('then it should return a order ', () => {
        expect(order).toEqual(orderStub());
      });
    });
  });
});
