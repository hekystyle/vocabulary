import { Injectable } from '@nestjs/common';

@Injectable()
export class TimeService {
  // eslint-disable-next-line class-methods-use-this
  now() {
    return new Date();
  }
}
