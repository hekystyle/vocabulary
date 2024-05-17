import assert from 'assert';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  NotFoundException,
  ForbiddenException,
  Delete,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ParseObjectIdPipe } from '@/common/parse-objectid.pipe.js';
import { TimeService } from '@/common/time.service.js';
import { ZodPipe } from '@/common/zod.pipe.js';
import { Pagination, type PaginationShape } from '@/pagination.js';
import { ActiveUser } from '@/users/active-user.decorator.js';
import { User } from '../users/user.entity.js';
import { Term } from './term.entity.js';
import { type TermDto, termDtoSchema } from './terms.dto.js';

@Controller('terms')
export class TermsController {
  constructor(
    @InjectModel(Term.name)
    private termsRepository: Model<Term>,
    @InjectModel(User.name)
    private usersRepository: Model<User>,
    private timeService: TimeService,
  ) {}

  @Get()
  async find(
    @ActiveUser()
    user: User,
    @Pagination()
    pagination: PaginationShape,
  ) {
    const [items, total] = await Promise.all([
      this.termsRepository
        .find({ owner: user._id, deletedAt: null })
        .skip(pagination.skip)
        .limit(pagination.pageSize)
        .exec(),
      this.termsRepository.countDocuments({ owner: user._id }),
    ]);

    return {
      data: items,
      meta: {
        pagination: {
          ...pagination,
          total,
          pageCount: Math.ceil(total / pagination.pageSize),
        },
      },
    };
  }

  @Post()
  async create(
    @ActiveUser()
    user: User,
    @Body(new ZodPipe(termDtoSchema))
    dto: TermDto,
  ) {
    const term = await this.termsRepository.create({
      ...dto,
      owner: user._id,
    });

    await this.usersRepository.findByIdAndUpdate(user._id, {
      lastDataMutationAt: term.updatedAt ?? null,
    });

    return term;
  }

  @Patch(':id')
  async patch(
    @Param('id', ParseObjectIdPipe)
    id: ObjectId,
    @ActiveUser()
    user: User,
    @Body(new ZodPipe(termDtoSchema.partial()))
    dto: Partial<TermDto>,
  ) {
    const termToUpdate = await this.termsRepository.findById(id);

    assert(termToUpdate, new NotFoundException('Term not found'));

    assert(termToUpdate.owner.equals(user._id), new ForbiddenException('You are not the owner of this term'));

    const updatedTerm = await this.termsRepository.findByIdAndUpdate(termToUpdate._id, dto, { new: true });

    await this.usersRepository.findByIdAndUpdate(user._id, {
      lastDataMutationAt: updatedTerm?.updatedAt,
    });

    return updatedTerm;
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseObjectIdPipe)
    id: Types.ObjectId,
    @ActiveUser()
    user: User,
  ) {
    const termToUpdate = await this.termsRepository.findById(id).where({ deletedAt: null });

    if (!termToUpdate) return;

    assert(termToUpdate.owner.equals(user._id), new ForbiddenException('You are not the owner of this term'));

    const deletedTerm = await this.termsRepository.findByIdAndUpdate(
      termToUpdate._id,
      {
        deletedAt: this.timeService.now(),
      },
      { new: true },
    );

    assert(deletedTerm?.deletedAt, 'Term was not deleted');

    await this.usersRepository.findOneAndUpdate(user._id, {
      lastDataMutationAt: deletedTerm.deletedAt,
    });
  }
}
