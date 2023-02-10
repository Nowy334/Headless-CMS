import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptionsProduct } from 'src/config/multerOptionsProduct.config';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'mainPhoto', maxCount: 1 },
        { name: 'photos', maxCount: 5 },
      ],
      multerOptionsProduct,
    ),
  )
  create(
    @Body('payload') createProductDto: CreateProductDto,
    @UploadedFiles()
    files: {
      mainPhoto?: Express.Multer.File[];
      photos?: Express.Multer.File[];
    },
  ) {
    if (!files.mainPhoto) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          errorType: 'Error',
          errorMessage: 'main image is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else if (!files.photos) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          errorType: 'Error',
          errorMessage: 'photos is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.productsService.create(
      createProductDto,
      files.mainPhoto,
      files.photos,
    );
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'mainPhoto', maxCount: 1 },
        { name: 'photos', maxCount: 5 },
      ],
      multerOptionsProduct,
    ),
  )
  update(
    @Param('id') id: string,
    @Body('payload') updateProductDto: UpdateProductDto,
    @UploadedFiles()
    files: {
      mainPhoto?: Express.Multer.File[];
      photos?: Express.Multer.File[];
    },
  ) {
    return this.productsService.update(id, updateProductDto, files);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
