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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { HighlightsService } from './highlights.service';
import { CreateHighlightDto } from './dto/create-highlight.dto';
import { UpdateHighlightDto } from './dto/update-highlight.dto';

@Controller('highlights')
export class HighlightsController {
  constructor(private readonly highlightsService: HighlightsService) {}

  @Get()
  async findAll() {
    return this.highlightsService.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file')) // Aplica el middleware Multer/FileInterceptor
  async create(
    @UploadedFile() file: Express.Multer.File,
    // Extrae el array 'tags[]' del FormData
    @Body('tags', new ParseArrayPipe({ items: String, optional: true }))
    tags: string[],
    // Usamos el DTO para el resto del body, aunque sólo esperamos campos opcionales aquí
    @Body() body: Partial<CreateHighlightDto>,
  ) {
    const data: CreateHighlightDto = {
      tags: tags || [],
      isActive: body.isActive,
      position: body.position,
    };

    // El servicio manejará la subida a Cloudinary y el guardado en Neon
    return this.highlightsService.create(file, data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: UpdateHighlightDto,
  ) {
    return this.highlightsService.update(id, updateData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Retorna 204 No Content
  async delete(@Param('id') id: string) {
    await this.highlightsService.delete(id);
  }
}
