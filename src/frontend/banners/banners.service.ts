import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BannerDocument } from 'src/schemas/banners.schema';
import { CategoryBanner } from 'src/schemas/category-banners.schema';

@Injectable()
export class BannersService {
  constructor(
    @InjectModel('banner') private bannerModel: Model<BannerDocument>,
    @InjectModel('categorybanners')
    private categoryBannerModel: Model<CategoryBanner>,
  ) {}

  async findByCategory(symbol: string) {
    const category = await this.categoryBannerModel.findOne({ symbol: symbol });

    return this.bannerModel.find(
      { category: category._id },
      {
        symbol: 1,
        title: 1,
        description: 1,
        targetUrl: 1,
        targetUrlTitle: 1,
        category: 1,
        imageUrl: 1,
      },
    );
  }

  findOne(symbol: string) {
    return this.bannerModel
      .findOne(
        { symbol: symbol },
        {
          title: 1,
          description: 1,
          targetUrl: 1,
          targetUrlTitle: 1,
          category: 1,
          imageUrl: 1,
        },
      )
      .populate({
        path: 'category',
        select: '-__v',
      });
  }
}
