import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Asegúrate de que la ruta sea correcta

@Injectable()
export class GalleryService {
  // Inyectamos PrismaService para acceder a la DB
  constructor(private readonly prisma: PrismaService) {}

  async findAllImages() {
    // Usamos el modelo GalleryImage que creaste
    return this.prisma.galleryImage.findMany({
      select: {
        id: true,
        secureUrl: true, // Solo necesitamos la URL para mostrar la imagen
        description: true,
      },
      orderBy: {
        createdAt: 'desc', // Ordenar por las imágenes más nuevas primero
      },
    });
  }
}
