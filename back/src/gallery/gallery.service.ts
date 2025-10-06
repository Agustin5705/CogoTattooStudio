import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class GalleryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async findAllImages() {
    // CORRECCIÓN 1 (Línea 16): Seleccionamos 'tags' y 'publicId', y quitamos 'description'.
    return this.prisma.galleryImage.findMany({
      select: {
        id: true,
        secureUrl: true,
        publicId: true,
        tags: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async uploadGalleryImage(
    file: Express.Multer.File,
    // CORRECCIÓN 2 (Línea 32): La firma del método ahora espera 'tags' (string[])
    tags: string[],
  ) {
    // 1. Subimos a Cloudinary, especificando la carpeta 'gallery'
    const cloudinaryResult = await this.cloudinaryService.uploadFile(
      file,
      'gallery',
    );

    // 2. Guardamos el registro en la tabla GalleryImage
    return this.prisma.galleryImage.create({
      data: {
        publicId: cloudinaryResult.public_id,
        secureUrl: cloudinaryResult.secure_url,
        // CORRECCIÓN 3 (Línea 40): Guardamos el array de tags que nos llegó
        tags: tags,
      },
    });
  }
}
