import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SnippetSchema } from '../../schemas/snippets.schema';
import { SnippetsController } from './snippets.controller';
import { SnippetsService } from './snippets.service';

@Module({
  providers: [SnippetsService],
  controllers: [SnippetsController],
  imports: [
    MongooseModule.forFeature([{ name: 'snippet', schema: SnippetSchema }]),
  ],
})
export class SnippetsModule {}
