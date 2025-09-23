import { Module } from '@nestjs/common';
import { FormController } from './form.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FormService } from './form.service';

@Module({
  imports: [PrismaModule],
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {}
