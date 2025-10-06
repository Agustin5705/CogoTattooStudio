import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module'; // <-- Importar

@Module({
  // CAMBIO 4: Añadir CloudinaryModule
  imports: [PrismaModule, CloudinaryModule],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}
