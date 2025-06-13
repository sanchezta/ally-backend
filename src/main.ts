import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api/v1");

  app.enableCors({
    origin: 'http://ally-frontend.netlify.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(envs.port || 3001);
  logger.log(`Application is running on port ${envs.port}`);
  logger.log(`Accepting requests from origin: ${envs.corsOrigin}`)
}

bootstrap();
