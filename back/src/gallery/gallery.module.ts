import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Asumiendo esta ruta para tu módulo de Prisma

@Module({
  imports: [PrismaModule], // Para que GalleryService pueda inyectar PrismaService
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}
