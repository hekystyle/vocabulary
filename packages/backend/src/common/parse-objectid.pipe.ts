import { Injectable, PipeTransform, PreconditionFailedException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string, Types.ObjectId> {
  // eslint-disable-next-line class-methods-use-this
  transform(value: string): Types.ObjectId {
    if (!Types.ObjectId.isValid(value)) {
      throw new PreconditionFailedException(`Invalid ObjectId: ${value}`);
    }

    return new Types.ObjectId(value);
  }
}
