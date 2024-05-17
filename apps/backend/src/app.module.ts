import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import { SessionModule } from 'nestjs-session';
import { AuthModule } from './auth/auth.module.js';
import { JwtAuthGuard } from './auth/jwt-auth.guard.js';
import { CommonModule } from './common/common.module.js';
import { loadConfiguration, AppConfig } from './config/configuration.js';
import { TermsModule } from './terms/terms.module.js';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      load: [loadConfiguration],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<AppConfig, true>) => ({
        uri: config.getOrThrow('database.url', { infer: true }),
      }),
    }),
    SessionModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AppConfig, true>) =>
        // formatting
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
