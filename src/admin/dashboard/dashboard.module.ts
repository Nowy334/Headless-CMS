import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { OrdersModule } from '../orders/orders.module';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
  imports: [OrdersModule],
})
export class DashboardModule {}
