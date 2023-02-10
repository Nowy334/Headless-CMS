import { Controller, Get, Param } from '@nestjs/common';
import { Public } from '../../common/decorators/public.decorator';
import { BannersService } from './banners.service';

@Public()
@Controller()
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Get('category/:symbol')
  findByCategory(@Param('symbol') symbol: string) {
    return this.bannersService.findByCategory(symbol);
  }

  @Get(':symbol')
  findOne(@Param('symbol') symbol: string) {
    return this.bannersService.findOne(symbol);
  }
}
