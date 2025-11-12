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
        user: process.env.MAIL_USER, // Reemplaza con tu email de Gmail
        pass: process.env.MAIL_PASS, // Reemplaza con tu contraseña de aplicación
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html: string) {
    await this.transporter.sendMail({
      from: '"COGO TATTOO Contacto" <${senderEmail}>',
      to,
      subject,
      text,
      html,
    });
  }
}
