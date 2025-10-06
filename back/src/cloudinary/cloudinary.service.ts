import 'multer'; // <-- Mantenemos esta, aunque sea solo para tipado de Express.Multer.File
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary.response';
// ELIMINADO: import { PrismaService } from 'src/prisma/prisma.service'; <-- QUITAR ESTA LÍNEA
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  // CORRECCIÓN: Quitamos el argumento 'private readonly prisma: PrismaService'
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  uploadFile(
    file: Express.Multer.File,
    folder: string,
  ): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: folder },
        (error, result: UploadApiResponse | undefined) => {
          if (error) return reject(error);
          if (!result)
            return reject(new Error('Cloudinary did not return a result.'));
          resolve(result as unknown as CloudinaryResponse);
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
