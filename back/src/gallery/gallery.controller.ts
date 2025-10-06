import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  ParseArrayPipe, // <-- CLAVE: Necesario para leer el array de FormData
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GalleryService } from './gallery.service';
// No necesitamos un DTO simple si usamos ParseArrayPipe directamente en el @Body()

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  async getGallery() {
    // Llama a la versión actualizada que devuelve publicId y tags
    return this.galleryService.findAllImages();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    // Extrae el array 'tags[]' del FormData y lo convierte a string[]
    // El 'tags' es el nombre del campo que enviaste desde el frontend.
    @Body('tags', new ParseArrayPipe({ items: String, optional: true }))
    tags: string[],
  ) {
    // Llama al servicio con el array de tags
    return this.galleryService.uploadGalleryImage(file, tags || []);
  }
}
