/* eslint-disable import/no-import-module-exports */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import supertokens from 'supertokens-node';
import { AppModule } from './app.module';
import { SupertokensExceptionFilter } from './auth/auth.filter';

declare const module: any;

async function bootstrap() {
  const fastify = new FastifyAdapter({
    logger: true,
  });

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastify, {
    bufferLogs: true,
  });
  // supertokens
  app.enableCors({
    origin: process.env.SUPERTOKENS_WEBSITE_DOMAIN as string,
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });
  app.useGlobalFilters(new SupertokensExceptionFilter());

  // swagger
  const config = new DocumentBuilder()
    .setTitle('TinkerHub Platform API')
    .setDescription('The core APIs provided by TinkerHub platform')
    .setVersion('1.0')
    .addTag('tinkerhub')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // setup validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );
  await app.listen(process.env.PORT as string, '0.0.0.0');
  // eslint-disable-next-line no-console
  console.log(`Application is running on: ${await app.getUrl()}`);

  // webpack based hot reloading
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
