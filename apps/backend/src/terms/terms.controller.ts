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
import { DEFAULT_LIMIT, DEFAULT_MAX_LIMIT, Paginate, paginate, Paginated, type PaginateQuery } from 'nestjs-paginate';
import { SortBy } from 'nestjs-paginate/lib/helper.js';
import { Equal, Repository } from 'typeorm';
import { ParseObjectIdPipe } from '@/common/parse-objectid.pipe.js';
import { TimeService } from '@/common/time.service.js';
import { ZodPipe } from '@/common/zod.pipe.js';
import { MAX_PAGE_SIZE } from '@/pagination.js';
import { ActiveUser } from '@/users/active-user.decorator.js';
import { StrictOmit } from '@/utils/StrictOmit.js';
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
    @Paginate() query: PaginateQuery,
  ): Promise<StrictOmit<Paginated<Term>, 'links'>> {
    console.log('🚀 ~ TermsController ~ query:', query);

    const page = Math.max(query.page ?? 1, 1);
    const limit = Math.min(query.limit ?? DEFAULT_LIMIT, MAX_PAGE_SIZE);

    const [items, count] = await this.termsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        owner: user._id,
        ...Object.entries(query.filter ?? {}).reduce((acc, [column, filter]) => {
          const [operator, value] = filter.toString().split(':');
          if (operator === 'eq') {
            return {
              ...acc,
              [column]: Equal(value),
            };
          }
          return acc;
        }, {}),
      },
      order:
        query.sortBy?.reduce(
          (acc, [column, order]) => ({
            ...acc,
            [column]: order,
          }),
          {},
        ) ?? {},
    });

    return {
      data: items,
      meta: {
        currentPage: page,
        filter: query.filter ?? {},
        itemsPerPage: limit,
        search: '',
        searchBy: [],
        select: [],
        sortBy: (query.sortBy as SortBy<Term>) ?? [],
        totalItems: count,
        totalPages: Math.ceil(count / limit),
      },
    };

    return await paginate(query, this.termsRepository, {
      maxLimit: DEFAULT_MAX_LIMIT,
      defaultLimit: DEFAULT_LIMIT,
      sortableColumns: ['updatedAt'],
      where: {
        owner: user._id,
      },
    });
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
