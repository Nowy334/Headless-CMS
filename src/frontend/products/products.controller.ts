import { Controller, Get, Param } from '@nestjs/common';
import { Public } from '../../common/decorators/public.decorator';
import { ProductsService } from './products.service';

@Public()
@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('category/:symbol')
  findByCategory(@Param('symbol') symbol: string) {
    return this.productsService.findByCategory(symbol);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }
}
