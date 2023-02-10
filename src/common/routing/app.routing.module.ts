import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ADMIN_ROUTES } from 'src/admin/admin-routes';
import { FRONTEND_ROUTES } from 'src/frontend/frontend-routes';

const ROUTES = [...ADMIN_ROUTES, ...FRONTEND_ROUTES];

@Module({
  imports: [RouterModule.register(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
