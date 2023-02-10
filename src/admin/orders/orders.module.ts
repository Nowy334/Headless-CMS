import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderSchema } from 'src/schemas/orders.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
  imports: [
    MongooseModule.forFeature([{ name: 'order', schema: OrderSchema }]),
  ],
})
export class OrdersModule {}
