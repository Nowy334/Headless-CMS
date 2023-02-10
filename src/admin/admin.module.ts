import { Module } from '@nestjs/common';
import { SnippetsModule } from './snippets/snippets.module';
import { ProductsModule } from './products/products.module';
import { BannersModule } from './banners/banners.module';
import { CategoryBannersModule } from './category-banners/category-banners.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    SnippetsModule,
    ProductsModule,
    BannersModule,
    CategoryBannersModule,
    CategoriesModule,
    OrdersModule,
    DashboardModule,
  ],
})
export class AdminModule {}
