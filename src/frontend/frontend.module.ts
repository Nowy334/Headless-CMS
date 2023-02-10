import { Module } from '@nestjs/common';
import { SnippetsModule } from './snippets/snippets.module';
import { OrdersModule } from './orders/orders.module';
import { BannersModule } from './banners/banners.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [SnippetsModule, OrdersModule, BannersModule, ProductsModule],
})
export class FrontendModule {}
