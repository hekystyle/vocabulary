import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { z } from 'zod';
import type { Request } from 'express';

export const MAX_PAGE_SIZE = 100;
export const DEFAULT_PAGE_SIZE = 10;

export const paginationByPageSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  pageSize: z.coerce.number().int().min(1).max(MAX_PAGE_SIZE).optional().default(DEFAULT_PAGE_SIZE),
});

export interface PaginationShape extends z.infer<typeof paginationByPageSchema> {
  skip: number;
}

export const Pagination = createParamDecorator<never, ExecutionContext, PaginationShape>((_, context) => {
  const request = context.switchToHttp().getRequest<Request>();

  const pagination = paginationByPageSchema.parse({
    page: request.query['page'],
    pageSize: request.query['pageSize'],
  });

  return {
    ...pagination,
    skip: (pagination.page - 1) * pagination.pageSize,
  };
});
