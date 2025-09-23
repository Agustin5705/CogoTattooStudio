// src/form/form.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFormDto } from './dto/create-form.dto';

@Injectable()
export class FormService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateFormDto) {
    // Convierte la cadena de texto de la fecha a un objeto Date si existe
    const dataToSave = data.fecha
      ? {
          ...data,
          fecha: new Date(data.fecha),
        }
      : data;

    return this.prisma.contact.create({ data: dataToSave });
  }
}
