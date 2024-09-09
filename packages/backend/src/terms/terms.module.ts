import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '@/users/users.module.js';
import { Term, termSchema } from './term.entity.js';
import { TermsController } from './terms.controller.js';

@Module({
  controllers: [TermsController],
  exports: [],
  imports: [
    MongooseModule.forFeature([
      {
        name: Term.name,
        schema: termSchema,
      },
    ]),
    UsersModule,
  ],
  providers: [],
})
export class TermsModule {}
