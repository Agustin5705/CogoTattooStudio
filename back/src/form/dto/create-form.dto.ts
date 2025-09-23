// src/form/dto/create-form.dto.ts
export class CreateFormDto {
  fullName: string;
  wpp: string;
  link?: string;
  presupuesto?: number;
  fecha?: string;
  // Puedes agregar más campos según tu modelo de Prisma
}
