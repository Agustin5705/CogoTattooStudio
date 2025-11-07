import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [],
  controllers: [AuthController], // Registra la ruta
  providers: [AuthService], // Registra la lógica
  exports: [AuthService],
})
export class AuthModule {}
