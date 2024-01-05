import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { ExtractJwt, JwtFromRequestFunction, Strategy as PassportJwtStrategy, StrategyOptions } from 'passport-jwt';
import { Repository } from 'typeorm';
import { AppConfig } from '@/config/configuration.js';
import { User } from '@/users/user.entity.js';
import { jwtPayloadSchema } from './jwt.payload.js';
import type { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(PassportJwtStrategy, 'jwt') {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(ConfigService)
    configService: ConfigService<AppConfig, true>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJwtFromSession(),
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret', { infer: true }),
    } satisfies StrategyOptions);
  }

  async validate(payload: unknown) {
    const result = jwtPayloadSchema.safeParse(payload);

    if (!result.success) {
      throw new UnauthorizedException('Invalid JWT payload', {
        cause: result.error,
      });
    }

    const user = await this.usersRepository.findOneBy({
      _id: new ObjectId(result.data.sub),
    });

    if (!user) {
      throw new UnauthorizedException('No user found for JWT');
    }

    return user;
  }

  private static extractJwtFromSession(): JwtFromRequestFunction {
    return (request: Request) => request.session.jwt ?? null;
  }
}
