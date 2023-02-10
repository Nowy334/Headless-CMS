import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class JsonParsePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.data === 'payload') {
      const data = JSON.parse(value, (key, value) => {
        return key === 'price' ? +value : value;
      });
      return { ...data };
    }
    return value;
  }
}
