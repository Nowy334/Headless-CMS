import { AdminModule } from './admin.module';
import { BannersModule } from './banners/banners.module';
import { CategoriesModule } from './categories/categories.module';
import { CategoryBannersModule } from './category-banners/category-banners.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { SnippetsModule } from './snippets/snippets.module';

export const ADMIN_ROUTES = [
  {
    path: 'admin',
    module: AdminModule,
    children: [
      {
        path: 'snippets',
        module: SnippetsModule,
      },
      {
        path: 'products',
        module: ProductsModule,
      },
      {
        path: 'banners',
        module: BannersModule,
      },
      {
        path: 'category_banners',
        module: CategoryBannersModule,
      },
      {
        path: 'categories',
        module: CategoriesModule,
      },
      {
        path: 'orders',
        module: OrdersModule,
      },
      {
        path: 'dashboard',
        module: DashboardModule,
      },
    ],
  },
];
