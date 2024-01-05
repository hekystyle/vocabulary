import assert from 'assert';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';
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
    @InjectRepository(Term)
    private termsRepository: Repository<Term>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private timeService: TimeService,
  ) {}

  @Get()
  async find(
    @ActiveUser()
    user: User,
    @Pagination()
    pagination: PaginationShape,
  ) {
    const [terms, total] = await this.termsRepository.findAndCount({
      where: {
        owner: user._id,
      },
      skip: pagination.skip,
      take: pagination.pageSize,
    });

    return {
      data: terms,
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
    const term = this.termsRepository.create({
      ...dto,
      owner: user._id,
    });

    await this.termsRepository.save(term);

    await this.usersRepository.update(user._id, {
      lastDataMutationAt: term.updatedAt,
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
    const termToUpdate = await this.termsRepository.findOneBy({ _id: id });

    assert(termToUpdate, new NotFoundException('Term not found'));

    assert(termToUpdate.owner.equals(user._id), new ForbiddenException('You are not the owner of this term'));

    await this.termsRepository.update(termToUpdate._id, dto);

    const updatedTerm = await this.termsRepository.findOneByOrFail({ _id: id });

    await this.usersRepository.update(user._id, {
      lastDataMutationAt: updatedTerm.updatedAt,
    });

    return updatedTerm;
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseObjectIdPipe)
    id: ObjectId,
    @ActiveUser()
    user: User,
  ) {
    const termToUpdate = await this.termsRepository.findOneBy({ _id: id });

    assert(termToUpdate, new NotFoundException('Term not found'));

    assert(termToUpdate.owner.equals(user._id), new ForbiddenException('You are not the owner of this term'));

    await this.termsRepository.update(termToUpdate._id, {
      deletedAt: this.timeService.now(),
    });

    const deletedTerm = await this.termsRepository.findOneByOrFail({ _id: id });

    await this.usersRepository.update(user._id, {
      lastDataMutationAt: deletedTerm.updatedAt,
    });
  }
}
