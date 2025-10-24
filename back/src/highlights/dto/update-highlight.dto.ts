import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

// Utiliza PartialType si usas @nestjs/mapped-types, o define manualmente.
export class UpdateHighlightDto {
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsNumber()
  @IsOptional()
  position?: number;
}
