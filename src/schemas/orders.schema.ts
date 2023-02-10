import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Product } from './products.schema';

export type OrderDocument = Order & Document;

@Schema({ _id: false })
class Item {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
  })
  item: Product;

  @Prop()
  quantity: number;
}

@Schema({ _id: false })
class CustomerData {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  postCode: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  comments: string;
}

@Schema()
export class Order {
  @Prop()
  orderNumber: number;

  @Prop()
  customerData: CustomerData;

  @Prop()
  items: [Item];

  @Prop({ type: Date, default: Date.now })
  date: Date;

  @Prop({
    type: String,
    enum: ['Paid', 'Shipped', 'Canceled', 'New'],
    default: 'New',
  })
  status: string;

  @Prop()
  totalPrice: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
