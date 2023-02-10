import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { snippetDto, updateSnippetDto } from './dto';
import { SnippetDocument, Snippet } from '../../schemas/snippets.schema';

@Injectable()
export class SnippetsService {
  constructor(
    @InjectModel('snippet') private snippetModel: Model<SnippetDocument>,
  ) {}

  async create(dto: snippetDto): Promise<Snippet> {
    const snippet = new this.snippetModel(dto);
    return snippet.save();
  }

  async findAll(): Promise<Snippet[]> {
    return this.snippetModel.find(
      {},
      { symbol: 1, title: 1, description: 1, active: 1 },
    );
  }

  async findOne(id: string): Promise<Snippet> {
    return this.snippetModel.findOne(
      { _id: id },
      { symbol: 1, title: 1, description: 1, active: 1 },
    );
  }

  update(id: string, updateSnippetDto: updateSnippetDto) {
    const { title, symbol, description, active } = updateSnippetDto;
    return this.snippetModel.updateOne(
      { _id: id },
      {
        $set: { title, symbol, description, active },
      },
    );
  }

  async remove(id: string) {
    return this.snippetModel.deleteOne({ _id: id });
  }
}
