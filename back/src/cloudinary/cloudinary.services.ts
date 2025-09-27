import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
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
        { folder: 'contact-forms' }, // Subirá los archivos a una carpeta llamada 'contact-forms'
        (error, result) => {
          if (error) return reject(error);
          resolve(result as CloudinaryResponse);
        },
      );

      // Crea un stream desde el buffer del archivo y lo "pipea" a Cloudinary
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
