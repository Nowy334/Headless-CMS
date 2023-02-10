import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryBanner } from 'src/schemas/category-banners.schema';
import { CreateCategoryBannerDto } from './dto/create-category-banner.dto';
import { UpdateCategoryBannerDto } from './dto/update-category-banner.dto';

@Injectable()
export class CategoryBannersService {
  constructor(
    @InjectModel('categorybanners')
    private categoryBannerModel: Model<CategoryBanner>,
  ) {}

  async create(
    createCategoryBannerDto: CreateCategoryBannerDto,
  ): Promise<CategoryBanner> {
    const categoryBanner = new this.categoryBannerModel(
      createCategoryBannerDto,
    );
    return categoryBanner.save();
  }

  async findAll(): Promise<CategoryBanner[]> {
    return this.categoryBannerModel.find({}, { symbol: 1, name: 1 });
  }

  async findOne(id: string) {
    return this.categoryBannerModel.findOne(
      { _id: id },
      { symbol: 1, name: 1 },
    );
  }

  async update(id: string, updateCategoryBannerDto: UpdateCategoryBannerDto) {
    const { name } = updateCategoryBannerDto;
    return this.categoryBannerModel.updateOne(
      { _id: id },
      {
        $set: { name },
      },
    );
  }

  async remove(id: string) {
    return this.categoryBannerModel.deleteOne({ _id: id });
  }
}
