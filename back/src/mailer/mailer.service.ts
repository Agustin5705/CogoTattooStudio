// back/src/mailer/mailer.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'agus5705@gmail.com', // Reemplaza con tu email de Gmail
        pass: 'owwn fhur tpjt yoep', // Reemplaza con tu contraseña de aplicación
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html: string) {
    await this.transporter.sendMail({
      from: '"Nombre del remitente" <tu_email@gmail.com>',
      to,
      subject,
      text,
      html,
    });
  }
}
