import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFormDto } from './dto/create-form.dto';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class FormService {
  // 🟢 SOLUCIÓN: Usar un valor por defecto (||) para satisfacer a TypeScript
  // y asegurar que la variable se lea cuando el entorno esté cargado.
  private readonly DESTINATION_EMAIL =
    process.env.MAIL_DESTINATION_ADDRESS || 'destino-error@example.com';

  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
  ) {}

  async create(data: CreateFormDto) {
    // ... (El resto del código es idéntico)
    const dataToSave = data.fecha
      ? {
          ...data,
          fecha: new Date(data.fecha),
        }
      : data;

    const contact = await this.prisma.contact.create({ data: dataToSave });

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

    await this.mailerService.sendMail(
      this.DESTINATION_EMAIL, // Usa la propiedad de clase
      'Nuevo mensaje de contacto',
      'Se ha recibido un nuevo mensaje de contacto',
      emailContent,
    );

    return contact;
  }
}
