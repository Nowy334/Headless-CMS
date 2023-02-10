import { Controller, Get, Param } from '@nestjs/common';
import { Public } from '../../common/decorators/public.decorator';
import { SnippetsService } from './snippets.service';

@Public()
@Controller()
export class SnippetsController {
  constructor(private readonly snippetsService: SnippetsService) {}
  @Get(':symbol')
  findOne(@Param('symbol') symbol: string) {
    return this.snippetsService.findOne(symbol);
  }
}
