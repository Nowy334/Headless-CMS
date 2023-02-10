import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BannerDocument } from 'src/schemas/banners.schema';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@Injectable()
export class BannersService {
  constructor(
    @InjectModel('banner') private bannerModel: Model<BannerDocument>,
  ) {}

  async create(createBannerDto: CreateBannerDto, file: Express.Multer.File) {
    const banner = new this.bannerModel({
      symbol: createBannerDto.symbol,
      title: createBannerDto.title,
      description: createBannerDto.description ?? null,
      targetUrl: createBannerDto.targetUrl ?? null,
      targetUrlTitle: createBannerDto.targetUrlTitle ?? null,
      category: createBannerDto.category,
      imageUrl: file.path,
      active: createBannerDto.active,
    });
    return banner.save();
  }

  async findAll() {
    return this.bannerModel
      .find(
        {},
        {
          symbol: 1,
          title: 1,
          description: 1,
          targetUrl: 1,
          targetUrlTitle: 1,
          category: 1,
          imageUrl: 1,
          active: 1,
        },
      )
      .populate('category');
  }

  findOne(id: string) {
    return this.bannerModel
      .findOne(
        { _id: id },
        {
          symbol: 1,
          title: 1,
          description: 1,
          targetUrl: 1,
          targetUrlTitle: 1,
          category: 1,
          imageUrl: 1,
          active: 1,
        },
      )
      .populate('category');
  }

  update(
    id: string,
    updateBannerDto: UpdateBannerDto,
    file: Express.Multer.File,
  ) {
    const {
      symbol,
      title,
      description,
      targetUrl,
      targetUrlTitle,
      category,
      active,
    } = updateBannerDto;
    let updateBlock = {};
    if (file) {
      updateBlock = {
        symbol,
        title,
        description: description ?? null,
        targetUrl: targetUrl ?? null,
        targetUrlTitle: targetUrlTitle ?? null,
        category,
        imageUrl: file.path,
        active,
      };
    } else {
      updateBlock = {
        symbol,
        title,
        description: description ?? null,
        targetUrl: targetUrl ?? null,
        targetUrlTitle: targetUrlTitle ?? null,
        category,
        active,
      };
    }
    return this.bannerModel.updateOne(
      { _id: id },
      {
        $set: updateBlock,
      },
    );
  }

  remove(id: string) {
    return this.bannerModel.deleteOne({ _id: id });
  }
}
