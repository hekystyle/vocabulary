import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import { SessionModule } from 'nestjs-session';
import { AuthModule } from './auth/auth.module.js';
import { JwtAuthGuard } from './auth/jwt-auth.guard.js';
import { CommonModule } from './common/common.module.js';
import { loadConfiguration, AppConfig } from './config/configuration.js';
import { Term } from './terms/term.entity.js';
import { TermsModule } from './terms/terms.module.js';
import { IdentityProvider } from './users/identity-provider.entity.js';
import { User } from './users/user.entity.js';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      load: [loadConfiguration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<AppConfig, true>) => ({
        type: 'mongodb' as const,
        url: config.getOrThrow('database.url', { infer: true }),
        entities: [Term, User, IdentityProvider],
        retryAttempts: 0,
      }),
    }),
    SessionModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AppConfig, true>) =>
        // formating
        ({
          session: {
            secret: configService.get('session.secret', { infer: true }),
            resave: false,
            saveUninitialized: false,
            store: MongoStore.create({
              mongoUrl: configService.get('database.url', { infer: true }),
            }),
          },
        }),
    }),
    AuthModule,
    TermsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  // eslint-disable-next-line class-methods-use-this
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
