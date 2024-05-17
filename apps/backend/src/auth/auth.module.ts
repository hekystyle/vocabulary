import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppConfig } from '@/config/configuration.js';
import { UsersModule } from '@/users/users.module.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { GitHubStrategy } from './github.strategy.js';
import { JwtStrategy } from './jwt.strategy.js';
import { PasswordStrategy } from './password.strategy.js';

@Module({
  controllers: [AuthController],
  exports: [],
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<AppConfig, true>) => ({
        secret: config.getOrThrow('jwt.secret', { infer: true }),
        signOptions: {},
      }),
    }),
    UsersModule,
  ],
  providers: [AuthService, PasswordStrategy, JwtStrategy, GitHubStrategy],
})
export class AuthModule {}
