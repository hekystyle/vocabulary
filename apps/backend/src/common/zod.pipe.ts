import { PipeTransform } from '@nestjs/common';
import { z } from 'zod';

export class ZodPipe<T> implements PipeTransform<unknown, T> {
  constructor(private readonly schema: z.Schema<T>) {}

  transform(value: unknown) {
    return this.schema.parse(value);
  }
}
