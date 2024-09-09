import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as LocalStrategy, IStrategyOptions } from 'passport-local';
import { User } from '@/users/user.entity.js';
import { AuthService } from './auth.service.js';

@Injectable()
export class PasswordStrategy extends PassportStrategy(LocalStrategy, 'password') {
  constructor(private authService: AuthService) {
    super({} satisfies IStrategyOptions);
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
