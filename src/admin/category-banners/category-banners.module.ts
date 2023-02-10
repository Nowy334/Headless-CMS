import { Module } from '@nestjs/common';
import { CategoryBannersService } from './category-banners.service';
import { CategoryBannersController } from './category-banners.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryBannerSchema } from 'src/schemas/category-banners.schema';

@Module({
  controllers: [CategoryBannersController],
  providers: [CategoryBannersService],
  imports: [
    MongooseModule.forFeature([
      { name: 'categorybanners', schema: CategoryBannerSchema },
    ]),
  ],
})
export class CategoryBannersModule {}
