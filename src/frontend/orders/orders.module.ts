import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from 'src/schemas/orders.schema';
import { ProductSchema } from 'src/schemas/products.schema';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    MongooseModule.forFeature([{ name: 'order', schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: 'product', schema: ProductSchema }]),
  ],
})
export class OrdersModule {}
