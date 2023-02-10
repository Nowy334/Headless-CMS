import { Module } from '@nestjs/common';
import { BannersService } from './banners.service';
import { BannersController } from './banners.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BannerSchema } from 'src/schemas/banners.schema';

@Module({
  controllers: [BannersController],
  providers: [BannersService],
  imports: [
    MongooseModule.forFeature([{ name: 'banner', schema: BannerSchema }]),
  ],
})
export class BannersModule {}
