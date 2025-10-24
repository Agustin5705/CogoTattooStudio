import { Module } from '@nestjs/common';
import { HighlightsService } from './highlights.service';
import { HighlightsController } from './highlights.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module'; // Importar para CloudinaryService

@Module({
  // Importamos los módulos que proporcionan las dependencias del constructor del servicio
  imports: [PrismaModule, CloudinaryModule],
  controllers: [HighlightsController],
  providers: [HighlightsService],
  // Exportamos para que otros módulos puedan usar el servicio (si es necesario)
  exports: [HighlightsService],
})
export class HighlightsModule {}
