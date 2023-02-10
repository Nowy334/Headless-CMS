import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/schemas/categories.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('category')
    private categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { title, description } = createCategoryDto;
    const category = new this.categoryModel({
      title,
      description: description ?? null,
    });
    return category.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find({}, { title: 1, description: 1 });
  }

  async findOne(id: string): Promise<Category> {
    return this.categoryModel.findOne(
      { _id: id },
      { title: 1, description: 1 },
    );
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const { title, description } = updateCategoryDto;
    return this.categoryModel.updateOne(
      { _id: id },
      {
        $set: { title, description: description ?? null },
      },
    );
  }

  remove(id: string) {
    return this.categoryModel.deleteOne({ _id: id });
  }
}
