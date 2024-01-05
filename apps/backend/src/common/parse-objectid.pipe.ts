import { Injectable, PipeTransform, PreconditionFailedException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string, ObjectId> {
  // eslint-disable-next-line class-methods-use-this
  transform(value: string): ObjectId {
    if (!ObjectId.isValid(value)) {
      throw new PreconditionFailedException(`Invalid ObjectId: ${value}`);
    }

    return new ObjectId(value);
  }
}
