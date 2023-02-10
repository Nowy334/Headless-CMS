import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { snippetDto } from './snippet.dto';

export class updateSnippetDto extends PartialType(snippetDto) {
  @IsString()
  symbol: string;
  @IsString()
  title: string;
  @IsString()
  description: string;
}
