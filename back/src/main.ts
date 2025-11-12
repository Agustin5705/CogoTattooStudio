// back/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// NUEVOS IMPORTS para Swagger
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // RECOMENDACIÓN: Añadir el prefijo global 'api' (buena práctica para Backend)
  app.setGlobalPrefix('api');

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      // Se recomienda añadir esto para seguridad adicional en la validación
      forbidNonWhitelisted: true,
    }),
  );

  // --- CONFIGURACIÓN DE SWAGGER ---
  const config = new DocumentBuilder()
    .setTitle('COGO TATTOO API')
    .setDescription(
      'Documentación de la API para la gestión de galería, destacados y contacto.',
    )
    .setVersion('1.0')
    // Añadir el esquema de seguridad (JWT) para las rutas de administrador
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // La documentación estará disponible en /api/docs
  SwaggerModule.setup('api/docs', app, document);
  // --------------------------------

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`🚀 API en ejecución en: http://localhost:${port}/api`);
  console.log(`📚 Swagger Docs en: http://localhost:${port}/api/docs`);
}
bootstrap();
