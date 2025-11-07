import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { FormModule } from './form/form.module';
import { MailerModule } from './mailer/mailer.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { GalleryModule } from './gallery/gallery.module';
import { HighlightsModule } from './highlights/highlights.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // 🛡️ Configuración del módulo JWT: Le decimos a NestJS qué clave usar.
    JwtModule.register({
      // 🔑 Aquí usamos la clave del .env, con un FALLBACK (la cadena fija)
      secret:
        process.env.JWT_SECRET ||
        'CLAVE_SECRETA_FUERTE_PARA_COGO_TATTOO_ADMIN_12345',
      signOptions: { expiresIn: '1d' },
      global: true, // Accesible en toda la app
    }),
    PrismaModule,
    FormModule,
    MailerModule,
    CloudinaryModule,
    GalleryModule,
    HighlightsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
