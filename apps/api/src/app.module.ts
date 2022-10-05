import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule } from 'nestjs-pino';
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
    NocoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
