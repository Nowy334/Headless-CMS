import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { multerOptions } from 'src/config/multerOptions.config';

@Controller()
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('banner', multerOptions))
  create(
    @Body('payload')
    createBannerDto: CreateBannerDto,
    @UploadedFile() file,
  ) {
    if (!file) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          errorType: 'Error',
          errorMessage: 'image is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.bannersService.create(createBannerDto, file);
  }

  @Get()
  findAll() {
    return this.bannersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bannersService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('banner', multerOptions))
  update(
    @Param('id') id: string,
    @Body('payload') updateBannerDto: UpdateBannerDto,
    @UploadedFile() file,
  ) {
    return this.bannersService.update(id, updateBannerDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannersService.remove(id);
  }
}
