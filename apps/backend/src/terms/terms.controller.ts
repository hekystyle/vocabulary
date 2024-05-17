import assert from 'assert';
import {
  Body,
  Controller,
  Get,
  Query,
  Param,
  Patch,
  Post,
  NotFoundException,
  ForbiddenException,
  Delete,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DEFAULT_LIMIT, DEFAULT_MAX_LIMIT, Paginate, Paginated, type PaginateQuery } from 'nestjs-paginate';
import { SortBy } from 'nestjs-paginate/lib/helper.js';
import { z } from 'zod';
import { ParseObjectIdPipe } from '@/common/parse-objectid.pipe.js';
import { TimeService } from '@/common/time.service.js';
import { ZodPipe } from '@/common/zod.pipe.js';
import { ActiveUser } from '@/users/active-user.decorator.js';
import { StrictOmit } from '@/utils/StrictOmit.js';
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
    @Paginate() query: PaginateQuery,
  ): Promise<StrictOmit<Paginated<Term>, 'links'>> {
    // prevent negative page
    const page = Math.max(query.page ?? 1, 1);
    // limit the number of items per page
    const limit = Math.min(query.limit ?? DEFAULT_LIMIT, DEFAULT_MAX_LIMIT);

    const dbQuery = this.termsRepository
      .find({
        owner: user._id,
        ...Object.entries(query.filter ?? {}).reduce((acc, [column, filter]) => {
          const [operator, value] = ([filter].flat().at(0) ?? '').split(':');

          return {
            ...acc,
            [column]: operator ? { [operator]: value } : {},
          };
        }, {}),
      })
      .sort(
        query.sortBy?.reduce(
          (acc, [column, order]) => ({
            ...acc,
            [column]: order,
          }),
          {},
        ),
      )
      .skip((page - 1) * limit)
      .limit(limit);

    const [items, count] = await Promise.all([dbQuery.exec(), dbQuery.countDocuments()]);

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
    id: Types.ObjectId,
    @ActiveUser()
    user: User,
  ) {
    const term = await this.termsRepository.findById(id);

    assert(term, new NotFoundException('Term not found'));

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
    id: Types.ObjectId,
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
    const termToDelete = await this.termsRepository.findById(id).where({ deletedAt: null });

    if (!termToDelete) return;

    assert(termToDelete.owner.equals(user._id), new ForbiddenException('You are not the owner of this term'));

    const deletedTerm = await this.termsRepository.findByIdAndUpdate(
      termToDelete._id,
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
