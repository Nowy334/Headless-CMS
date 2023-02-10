import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { CategoryBanner } from './category-banners.schema';

export type BannerDocument = Banner & Document;

@Schema()
export class Banner {
  @Prop({ required: true, unique: true })
  symbol: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  targetUrl: string;

  @Prop()
  targetUrlTitle: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ default: false })
  active: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categorybanners',
    required: true,
  })
  category: CategoryBanner;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
