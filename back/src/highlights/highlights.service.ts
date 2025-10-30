import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Ruta relativa a prisma
import { CloudinaryService } from '../cloudinary/cloudinary.service'; // Reutilizamos el servicio de Cloudinary
import { HighlightImage } from '@prisma/client';
import { CreateHighlightDto } from './dto/create-highlight.dto';
import { UpdateHighlightDto } from './dto/update-highlight.dto';

@Injectable()
export class HighlightsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService, // Inyectamos el servicio de subida
  ) {}

  // POST /highlights
  // Sube el archivo a Cloudinary y guarda los metadatos en la tabla HighlightImage.
  async create(
    file: Express.Multer.File,
    data: CreateHighlightDto,
  ): Promise<HighlightImage> {
    // 1. Subir el archivo binario a Cloudinary, usando una carpeta separada 'highlights'
    const cloudinaryResult = await this.cloudinaryService.uploadFile(
      file,
      'highlights', // Carpeta específica para destacados
    );

    // 2. Guardar los metadatos en la tabla HighlightImage
    const newHighlight = await this.prisma.highlightImage.create({
      data: {
        publicId: cloudinaryResult.public_id,
        secureUrl: cloudinaryResult.secure_url,
        tags: data.tags || [],
        isActive: data.isActive ?? true,
        position: data.position ?? null,
      },
    });

    return newHighlight;
  }

  // GET /highlights
  // Obtiene todos los destacados (activos o no), ordenados por posición.
  async findAll(): Promise<HighlightImage[]> {
    return this.prisma.highlightImage.findMany({
      orderBy: { position: 'asc' },
    });
  }

  // PATCH /highlights/:id
  // Actualiza el estado isActive o la posición.
  async update(id: string, data: UpdateHighlightDto): Promise<HighlightImage> {
    try {
      const updatedHighlight = await this.prisma.highlightImage.update({
        where: { id: id },
        data: {
          isActive: data.isActive,
          position: data.position,
        },
      });
      return updatedHighlight;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Destacado con ID "${id}" no encontrado.`);
      }
      throw error;
    }
  }

  // DELETE /highlights/:id (Opcional, pero esencial para mantener el almacenamiento limpio)
  async delete(id: string): Promise<void> {
    const highlight = await this.prisma.highlightImage.findUnique({
      where: { id },
    });

    if (!highlight) {
      throw new NotFoundException(`Destacado con ID "${id}" no encontrado.`);
    }

    // 1. Borrar de Cloudinary
    await this.cloudinaryService.destroy(highlight.publicId);

    // 2. Borrar de la base de datos
    await this.prisma.highlightImage.delete({ where: { id } });
  }
}
