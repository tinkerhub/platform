import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule } from 'nestjs-pino';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesModule } from './profiles/profiles.module';
import { AuthModule } from './auth/auth.module';
import { NocoModule } from './noco/noco.module';

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
      SUPERTOKENS_URI: Joi.string().required(),
      SUPERTOKENS_API_KEY: Joi.string().required(),
      APP_NAME: Joi.string().default('platform'),
      SUPERTOKENS_API_DOMAIN: Joi.string().required(),
      SUPERTOKENS_WEBSITE_DOMAIN: Joi.string().required(),
      SUPERTOKENS_PATH: Joi.string().default('/auth'),
      MSG91_API_DOMAIN: Joi.string().default('https://api.msg91.com/api/v5/flow/'),
      MSG91_SENDER_ID: Joi.string().required(),
      MSG91_FLOW_ID: Joi.string().required(),
      MSG91_SHORT_URL: Joi.string().default('0'),
      MSG91_AUTH_KEY: Joi.string().required(),
    }),
    validationOptions: {
      abortEarly: true,
    },
  }),
  // logging module
  LoggerModule.forRoot({
    pinoHttp: {
      level: 'info',
      redact: ['req.headers'],
    },
  }),
];

@Module({
  imports: [
    ...coreModules,
    ...apiModules,
    AuthModule.forRoot({
      connectionURI: process.env.SUPERTOKENS_URI as string,
      apiKey: process.env.SUPERTOKENS_API_KEY,
      appInfo: {
        appName: process.env.APP_NAME as string,
        apiDomain: process.env.SUPERTOKENS_API_DOMAIN as string,
        websiteDomain: process.env.SUPERTOKENS_WEBSITE_DOMAIN as string,
        apiBasePath: process.env.SUPERTOKENS_PATH,
        websiteBasePath: process.env.SUPERTOKENS_PATH,
      },
    }),
    ThrottlerModule.forRoot({
      ttl: parseInt(process.env.TIME_TO_LIVE as string, 10),
      limit: parseInt(process.env.THROTTLE_LIMIT as string, 10),
    }),
    NocoModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
