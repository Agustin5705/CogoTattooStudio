import 'multer';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
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
        // Mantenemos tu lógica de validación de archivos
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }), // Máximo 5MB
          new FileTypeValidator({ fileType: 'image/(jpeg|png|jpg)' }), // Solo JPEG, PNG, JPG
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    // CAMBIO REQUERIDO: Le pasamos 'contact-forms' al servicio para que sepa dónde subir.
    // Esto previene que se rompa el código después de modificar CloudinaryService.
    return this.cloudinaryService.uploadFile(file, 'contact-forms');
  }
}
