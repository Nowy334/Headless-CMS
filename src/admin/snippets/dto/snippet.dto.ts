import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class snippetDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  symbol: string;

  @IsString()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsBoolean()
  @ApiProperty()
  active: boolean;
}
