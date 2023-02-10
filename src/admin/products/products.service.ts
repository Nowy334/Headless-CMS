import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/schemas/products.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('product') private productModel: Model<ProductDocument>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    mainPhoto: Express.Multer.File[],
    photos: Express.Multer.File[],
  ): Promise<Product> {
    const { title, description, category, properties, price, slug } =
      createProductDto;

    const photosArray = photos.map((photo) => {
      return {
        title: photo.originalname,
        fileName: photo.filename,
        src: photo.path,
      };
    });

    const product = new this.productModel({
      title,
      description,
      category,
      properties: properties ?? [],
      price: +price,
      mainPhoto: {
        title: mainPhoto[0].originalname,
        fileName: mainPhoto[0].filename,
        src: mainPhoto[0].path,
      },
      photos: photosArray,
      slug,
    });

    return await product.save();
  }

  findAll() {
    return this.productModel.find({}, { __v: 0 }).populate({
      path: 'category',
      select: '-__v',
    });
  }

  findOne(id: string) {
    return this.productModel.findOne({ _id: id }, { __v: 0 }).populate({
      path: 'category',
      select: '-__v',
    });
  }

  update(
    id: string,
    updateProductDto: UpdateProductDto,
    files: {
      mainPhoto?: Express.Multer.File[];
      photos?: Express.Multer.File[];
    },
  ) {
    let updateBlock = {};
    let photosArray = [];

    updateBlock = {
      ...updateProductDto,
    };

    if (files && files.photos && files.photos.length > 0) {
      photosArray = files.photos.map((photo) => {
        return {
          title: photo.originalname,
          fileName: photo.filename,
          src: photo.path,
        };
      });

      updateBlock['photos'] = photosArray;
    }

    if (files && files.mainPhoto && files.mainPhoto.length > 0) {
      updateBlock['mainPhoto'] = {
        title: files.mainPhoto[0].originalname,
        fileName: files.mainPhoto[0].filename,
        src: files.mainPhoto[0].path,
      };
    }

    return this.productModel.updateOne(
      { _id: id },
      {
        $set: updateBlock,
      },
    );
  }

  remove(id: string) {
    return this.productModel.deleteOne({ _id: id });
  }
}
