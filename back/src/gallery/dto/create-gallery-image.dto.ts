import { IsArray, IsOptional, IsString } from 'class-validator';

// El @Body() de NestJS intentará parsear los campos del FormData a este objeto.
export class CreateGalleryImageDto {
  // Los tags vienen como un array de strings
  @IsArray()
  @IsString({ each: true }) // Valida que cada elemento del array sea un string
  @IsOptional() // Hacemos los tags opcionales, aunque es mejor que el admin los ponga
  tags: string[];
}
