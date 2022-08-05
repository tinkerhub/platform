import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesModule } from './profiles/profiles.module';
import { AuthModule } from './auth/auth.module';

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
  imports: [
    ...coreModules,
    ...apiModules,
    AuthModule,
    AuthModule.forRoot({
      // These are the connection details of the app you created on supertokens.com
      connectionURI: process.env.SUPERTOKENS_URI as string,
      apiKey: process.env.SUPERTOKENS_API_KEY as string,
      appInfo: {
        // Learn more about this on https://supertokens.com/docs/passwordless/appinfo
        appName: process.env.APP_NAME as string,
        apiDomain: process.env.SUPERTOKENS_API_DOMAIN as string,
        websiteDomain: process.env.SUPERTOKENS_WEBSITE_DOMAIN as string,
        apiBasePath: '/api/auth',
        websiteBasePath: '/auth',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
