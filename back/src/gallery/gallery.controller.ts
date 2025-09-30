import { Controller, Get } from '@nestjs/common';
import { GalleryService } from './gallery.service';

@Controller('gallery') // Esto define la ruta base: /gallery
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get() // Esto define el endpoint final: GET /gallery
  async getGallery() {
    return this.galleryService.findAllImages();
  }
}
