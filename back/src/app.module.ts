import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { FormModule } from './form/form.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [PrismaModule, FormModule, MailerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
