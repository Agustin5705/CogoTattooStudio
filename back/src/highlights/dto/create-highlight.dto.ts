import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

// NOTA: El archivo binario es manejado por el middleware (Multer) y NO se incluye aquí.
export class CreateHighlightDto {
  // Tags (requeridos para la navegación)
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags: string[];

  // Estado inicial (true por defecto, pero se puede definir)
  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
