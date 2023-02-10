import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from 'src/schemas/orders.schema';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel('order') private orderModel: Model<OrderDocument>) {}

  async findAll(): Promise<Order[]> {
    return this.orderModel
      .find({}, { __v: 0 })
      .sort({ date: -1 })
      .populate({
        path: 'items.item',
        model: 'product',
        select: '-__v',
        populate: {
          path: 'category',
          select: '-__v',
        },
      });
  }

  async findOne(id: string): Promise<Order> {
    return this.orderModel.findOne({ _id: id }).populate({
      path: 'items.item',
      model: 'product',
      select: '-__v',
      populate: {
        path: 'category',
        select: '-__v',
      },
    });
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    const { status } = updateOrderDto;
    return this.orderModel.updateOne(
      { _id: id },
      {
        $set: {
          status,
        },
      },
    );
  }

  remove(id: string) {
    return this.orderModel.deleteOne({ _id: id });
  }
}
