import 'multer';
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary.response';
// Asegúrate de que 'streamifier' esté importado si lo instalaste
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  constructor() {
    // Configuración de credenciales al inicializar
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  // Método que sube el archivo a Cloudinary
  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'contact-forms' },
        (error, result: UploadApiResponse | undefined) => {
          // <-- Usamos UploadApiResponse
          if (error) return reject(error);

          // Forzamos la conversión de tipo (casting)
          if (result) {
            resolve(result as unknown as CloudinaryResponse);
          } else {
            reject(new Error('Cloudinary did not return a result.'));
          }
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
