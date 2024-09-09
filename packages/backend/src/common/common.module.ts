import { Global, Module } from '@nestjs/common';
import { TimeService } from './time.service.js';

@Global()
@Module({
  providers: [TimeService],
  exports: [TimeService],
})
export class CommonModule {}
