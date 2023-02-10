import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Snippet, SnippetDocument } from 'src/schemas/snippets.schema';

@Injectable()
export class SnippetsService {
  constructor(
    @InjectModel('snippet') private snippetModel: Model<SnippetDocument>,
  ) {}

  async findOne(symbol: string): Promise<Snippet> {
    return this.snippetModel.findOne(
      { symbol: symbol },
      { symbol: 1, title: 1, description: 1, _id: 0 },
    );
  }
}
