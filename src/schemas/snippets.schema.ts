import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SnippetDocument = Snippet & Document;

@Schema()
export class Snippet {
  @Prop({ required: true, unique: true })
  symbol: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ default: false })
  active: boolean;
}

export const SnippetSchema = SchemaFactory.createForClass(Snippet);
