import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryBannerDocument = CategoryBanner & Document;

@Schema()
export class CategoryBanner {
  @Prop({ required: true, unique: true })
  symbol: string;

  @Prop({ required: true })
  name: string;
}

export const CategoryBannerSchema =
  SchemaFactory.createForClass(CategoryBanner);
