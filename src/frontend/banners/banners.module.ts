import { Module } from '@nestjs/common';
import { BannersService } from './banners.service';
import { BannersController } from './banners.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BannerSchema } from 'src/schemas/banners.schema';
import { CategoryBannerSchema } from 'src/schemas/category-banners.schema';

@Module({
  controllers: [BannersController],
  providers: [BannersService],
  imports: [
    MongooseModule.forFeature([
      { name: 'banner', schema: BannerSchema },
      { name: 'categorybanners', schema: CategoryBannerSchema },
    ]),
  ],
})
export class BannersModule {}
