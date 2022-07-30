import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesModule } from './profiles/profiles.module';

const apiModules = [ProfilesModule];

const coreModules = [
  // env config module
  ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
      PORT: Joi.number().default(8000),
      DATABASE_URL: Joi.string().required(),
    }),
    validationOptions: {
      abortEarly: true,
    },
  }),
  // logging module
  LoggerModule.forRoot(),
];

@Module({
  imports: [...coreModules, ...apiModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
