import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from './user.entity.js';

export const ActiveUser = createParamDecorator<never, ExecutionContext, User | undefined>((_, context) => {
  const request = context.switchToHttp().getRequest<Express.Request>();
  return request.user as User | undefined;
});
