import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CategoryBanner } from 'src/schemas/category-banners.schema';

export class CreateBannerDto {
  @ApiProperty()
  @IsString()
  symbol: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  targetUrl: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  targetUrlTitle: string;

  @ApiProperty()
  @IsNotEmpty()
  category: CategoryBanner;

  @IsOptional()
  @ApiProperty()
  active: boolean;
}
