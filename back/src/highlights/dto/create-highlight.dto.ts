import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
// 🚨 NECESITAS ESTA IMPORTACIÓN
import { Type } from 'class-transformer';

export class CreateHighlightDto {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags: string[];

  // 🚨 CORRECCIÓN 1: Transforma el string a booleano antes de la validación.
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  // 🚨 CORRECCIÓN 2: Transforma el string a número para la posición.
  @Type(() => Number)
  @IsNumber()
  @IsOptional() // Es opcional al crear
  position: number | null;
}
