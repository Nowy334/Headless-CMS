import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryBannersService } from './category-banners.service';
import { CreateCategoryBannerDto } from './dto/create-category-banner.dto';
import { UpdateCategoryBannerDto } from './dto/update-category-banner.dto';

@Controller()
export class CategoryBannersController {
  constructor(
    private readonly categoryBannersService: CategoryBannersService,
  ) {}

  @Post()
  create(@Body() createCategoryBannerDto: CreateCategoryBannerDto) {
    return this.categoryBannersService.create(createCategoryBannerDto);
  }

  @Get()
  findAll() {
    return this.categoryBannersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryBannersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryBannerDto: UpdateCategoryBannerDto,
  ) {
    return this.categoryBannersService.update(id, updateCategoryBannerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryBannersService.remove(id);
  }
}
