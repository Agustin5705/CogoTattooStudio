import {
  IsArray,
  IsNotEmpty,
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';

// Aunque esta es una clase DTO de SALIDA, usar decoradores ayuda con la documentación
// (ej. con Swagger) y el tipado.

export class HighlightImageDto {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  publicId: string; // ID en el servicio de almacenamiento (Cloudinary)

  @IsUrl()
  secureUrl: string; // URL pública de la imagen

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsDate()
  createdAt: Date;

  @IsBoolean()
  isActive: boolean;

  @IsInt()
  @IsOptional()
  position: number | null;
}
