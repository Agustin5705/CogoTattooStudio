import { Module } from '@nestjs/common';
import { FormController } from './form.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FormService } from './form.service';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  imports: [PrismaModule, MailerModule],
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {}
