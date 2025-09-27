import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';

@Module({
  imports: [],
  providers: [CloudinaryService],
  controllers: [CloudinaryController],
  exports: [CloudinaryService], // Exportamos para que otros módulos lo puedan usar si es necesario
})
export class CloudinaryModule {}
