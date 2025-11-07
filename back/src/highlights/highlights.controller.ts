import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseArrayPipe,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { HighlightsService } from './highlights.service';
import { CreateHighlightDto } from './dto/create-highlight.dto';
import { UpdateHighlightDto } from './dto/update-highlight.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('highlights')
export class HighlightsController {
  constructor(private readonly highlightsService: HighlightsService) {}

  @Get()
  async findAll() {
    return this.highlightsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file')) // Aplica el middleware Multer/FileInterceptor
  async create(
    @UploadedFile() file: Express.Multer.File,
    // Extrae el array 'tags[]' del FormData
    @Body('tags', new ParseArrayPipe({ items: String, optional: true }))
    tags: string[],
    // Usamos el DTO para el resto del body
    @Body() body: Partial<CreateHighlightDto>,
  ) {
    // 🚨 LA ÚNICA LÍNEA DE CÓDIGO NUEVA QUE ARREGLA TODO
    // Convierte el string "true" o "false" (que viene de FormData) a un booleano real.
    const isActiveBoolean =
      body.isActive !== undefined
        ? JSON.parse(String(body.isActive).toLowerCase())
        : false;

    const data: CreateHighlightDto = {
      tags: tags || [],
      isActive: isActiveBoolean, // <-- ¡Aquí usamos el valor booleano correcto!
      position: (body.position as number) ?? null,
    };

    // El servicio manejará la subida a Cloudinary y el guardado en Neon
    return this.highlightsService.create(file, data);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: UpdateHighlightDto,
  ) {
    return this.highlightsService.update(id, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Retorna 204 No Content
  async delete(@Param('id') id: string) {
    await this.highlightsService.delete(id);
  }
}
