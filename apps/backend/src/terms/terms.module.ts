import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/users/user.entity.js';
import { Term } from './term.entity.js';
import { TermsController } from './terms.controller.js';

@Module({
  controllers: [TermsController],
  exports: [],
  imports: [TypeOrmModule.forFeature([Term, User])],
  providers: [],
})
export class TermsModule {}
