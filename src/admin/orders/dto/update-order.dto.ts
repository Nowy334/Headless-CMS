import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

enum Status {
  New = 'New',
  Paid = 'Paid',
  Shipped = 'Shipped',
  Canceled = 'Canceled',
}

export class UpdateOrderDto {
  @IsEnum(Status)
  @ApiProperty()
  @IsOptional()
  status: Status;
}
