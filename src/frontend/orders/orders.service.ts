import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDocument } from 'src/schemas/orders.schema';
import { ProductDocument } from 'src/schemas/products.schema';
import { CreateOrderDto, Item } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('order') private orderModel: Model<OrderDocument>,
    @InjectModel('product') private productModel: Model<ProductDocument>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const { items, customerData } = createOrderDto;

    if (items && items.length > 0) {
      for await (const item of items) {
        try {
          const product = await this.productModel.find({ _id: item.item });
          if (product.length === 0) {
            throw new HttpException(
              {
                statusCode: HttpStatus.BAD_REQUEST,
                errorType: 'Error',
                errorMessage: 'Product does not exist',
              },
              HttpStatus.BAD_REQUEST,
            );
          }
        } catch (err) {
          throw new HttpException(
            {
              statusCode: HttpStatus.BAD_REQUEST,
              errorType: 'Error',
              errorMessage: 'Product does not exist',
            },
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    } else {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          errorType: 'Error',
          errorMessage: 'Product does not exist',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const orderNumber = this.generateOrderNumber();

    const order = new this.orderModel({
      orderNumber,
      customerData,
      items,
      totalPrice: await this.calculateTotalPrice(items),
    });

    return order.save();
  }

  generateOrderNumber = () => {
    const minm = 100000;
    const maxm = 999999;
    return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
  };

  async calculateTotalPrice(items: Item[]) {
    let totalPrice = 0;

    for (const item of items) {
      const findItem = await this.productModel
        .findOne({ _id: item.item })
        .lean();
      totalPrice = totalPrice + item.quantity * findItem.price;
    }

    return totalPrice;
  }
}
