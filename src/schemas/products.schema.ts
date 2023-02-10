import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from './categories.schema';

export type ProductDocument = Product & Document;

@Schema({ _id: false })
class productPhoto {
  @Prop()
  title: string;

  @Prop()
  src: string;

  @Prop()
  fileName: string;
}

@Schema()
export class Product {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  mainPhoto: productPhoto;

  @Prop()
  photos: [productPhoto];

  @Prop()
  properties: [
    {
      name: string;
      value: mongoose.Schema.Types.Mixed;
    },
  ];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true,
  })
  category: Category;

  @Prop({ required: true })
  slug: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
