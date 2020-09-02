import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';

import { AppModule } from './app.module';

import * as express from 'express';
import * as config from 'config';

async function bootstrap() {
  const serverConfig = config.get('server');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(express.static(join(process.cwd(), 'uploads')));
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
}
bootstrap();
