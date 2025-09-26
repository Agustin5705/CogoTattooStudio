// back/src/form/form.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFormDto } from './dto/create-form.dto';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class FormService {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
  ) {}

  async create(data: CreateFormDto) {
    // 1. Convertir la cadena de texto de la fecha a un objeto Date si existe
    const dataToSave = data.fecha
      ? {
          ...data,
          fecha: new Date(data.fecha),
        }
      : data;

    // 2. Guardar los datos de contacto en la base de datos
    const contact = await this.prisma.contact.create({ data: dataToSave });

    // 3. Preparar el contenido del correo
    const emailContent = `
      <p>Se ha recibido un nuevo mensaje de contacto:</p>
      <ul>
        <li>Nombre: ${contact.fullName}</li>
        <li>WhatsApp: ${contact.wpp}</li>
        <li>Enlace: ${contact.link || 'N/A'}</li>
        <li>Presupuesto: ${contact.presupuesto || 'N/A'}</li>
        <li>Fecha: ${contact.fecha ? contact.fecha.toISOString().split('T')[0] : 'N/A'}</li>
      </ul>
    `;

    // 4. Enviar el correo usando el MailerService
    await this.mailerService.sendMail(
      'agus5705@gmail.com', // Reemplaza con el email de destino
      'Nuevo mensaje de contacto',
      'Se ha recibido un nuevo mensaje de contacto',
      emailContent,
    );

    return contact;
  }
}
