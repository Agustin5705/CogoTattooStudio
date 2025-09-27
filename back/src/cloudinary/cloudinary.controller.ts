import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';

@Controller('upload')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file')) // 'file' es el nombre del campo en el formulario del frontend
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        // Validación de archivos:
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }), // Máximo 5MB
          new FileTypeValidator({ fileType: 'image/(jpeg|png|jpg)' }), // Solo JPEG, PNG, JPG
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    // Llama al servicio para subir el archivo
    return this.cloudinaryService.uploadFile(file);
  }
}
