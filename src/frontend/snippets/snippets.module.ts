import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SnippetSchema } from 'src/schemas/snippets.schema';
import { SnippetsController } from './snippets.controller';
import { SnippetsService } from './snippets.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'snippet', schema: SnippetSchema }]),
  ],
  controllers: [SnippetsController],
  providers: [SnippetsService],
})
export class SnippetsModule {}
