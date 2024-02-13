import assert from 'assert';
import {
  Body,
  Controller,
  Delete,
  Get,
  Query,
  Param,
  Patch,
  Post,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { DEFAULT_LIMIT, Paginate, Paginated, type PaginateQuery } from 'nestjs-paginate';
import { SortBy } from 'nestjs-paginate/lib/helper.js';
import { Equal, Repository } from 'typeorm';
import { z } from 'zod';
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

    // return await paginate(query, this.termsRepository, {
    //   maxLimit: DEFAULT_MAX_LIMIT,
    //   defaultLimit: DEFAULT_LIMIT,
    //   sortableColumns: ['updatedAt'],
    //   where: {
    //     owner: user._id,
    //   },
    // });
  }

  @Get('distinct')
  async distinct(
    @Query('field', new ZodPipe(z.enum(['partOfSpeech', 'tags'])))
    field: 'partOfSpeech' | 'tags',
    @Query('search')
    search: string | undefined,
    @ActiveUser()
    user: User,
  ): Promise<string[]> {
    const terms = await this.termsRepository.find({
      where: {
        owner: user._id,
        [field]: {
          $regex: search,
          $options: 'i',
        },
      },
      select: [field],
    });

    return Array.from(new Set(...terms.flatMap(term => term[field])));
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseObjectIdPipe)
    id: ObjectId,
    @ActiveUser()
    user: User,
  ) {
    const term = await this.termsRepository.findOneByOrFail({ _id: id });

    assert(term.owner.equals(user._id), new ForbiddenException('You are not the owner of this term'));

    return term;
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
    const termToDelete = await this.termsRepository.findOneBy({ _id: id });

    if (!termToDelete) return null;

    assert(termToDelete.owner.equals(user._id), new ForbiddenException('You are not the owner of this term'));

    const deletedAt = this.timeService.now();

    await this.termsRepository.update(termToDelete._id, {
      deletedAt,
    });

    await this.usersRepository.update(user._id, {
      lastDataMutationAt: deletedAt,
    });

    return null;
  }
}
