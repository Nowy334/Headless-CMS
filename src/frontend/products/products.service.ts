import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/schemas/categories.schema';
import { ProductDocument } from 'src/schemas/products.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('product') private productModel: Model<ProductDocument>,
    @InjectModel('category') private categoryModel: Model<Category>,
  ) {}
  async findByCategory(symbol: string) {
    const category = await this.categoryModel.findOne({ title: symbol });
    return this.productModel
      .find({ category: category._id }, { __v: 0 })
      .populate({
        path: 'category',
        select: '-__v',
      });
  }

  findOne(id: string) {
    return this.productModel.findOne({ _id: id });
  }
}
