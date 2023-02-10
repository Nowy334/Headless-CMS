import { BannersModule } from './banners/banners.module';
import { FrontendModule } from './frontend.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { SnippetsModule } from './snippets/snippets.module';

export const FRONTEND_ROUTES = [
  {
    path: 'frontend',
    module: FrontendModule,
    children: [
      {
        path: 'snippets',
        module: SnippetsModule,
      },
      {
        path: 'orders',
        module: OrdersModule,
      },
      {
        path: 'banners',
        module: BannersModule,
      },
      {
        path: 'products',
        module: ProductsModule,
      },
    ],
  },
];
