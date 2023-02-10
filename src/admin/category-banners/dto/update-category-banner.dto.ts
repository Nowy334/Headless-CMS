import { PartialType } from '@nestjs/swagger';
import { CreateCategoryBannerDto } from './create-category-banner.dto';

export class UpdateCategoryBannerDto extends PartialType(
  CreateCategoryBannerDto,
) {}
