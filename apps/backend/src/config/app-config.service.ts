import { ConfigService } from '@nestjs/config';
import { AppConfig } from './configuration.js';

export type AppConfigService = ConfigService<AppConfig, true>;
