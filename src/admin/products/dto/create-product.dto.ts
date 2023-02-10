import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from 'src/schemas/categories.schema';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsOptional()
  properties: [{ name: string; value: any }];

  @ApiProperty()
  @IsNotEmpty()
  category: Category;

  @ApiProperty()
  @IsString()
  slug: string;
}
