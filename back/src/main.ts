import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// 🚨 1. Importar ValidationPipe
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
