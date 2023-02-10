import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryBannerDto {
  @IsString()
  @ApiProperty()
  symbol: string;

  @IsString()
  @ApiProperty()
  name: string;
}
