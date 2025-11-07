import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api') // Prefijo de ruta: todas las rutas aquí comienzan con /api
export class AuthController {
  constructor(private authService: AuthService) {}

  // POST /api/login
  @Post('login')
  // Usamos Body para leer el JSON de la petición (que solo tiene 'password')
  async login(@Body() body: { password: string }) {
    // Llama a la lógica del servicio
    const result = await this.authService.validateUser(body.password);

    // Retorna el resultado que será enviado al proxy de Next.js
    return { token: result.token, message: 'Login exitoso' };
  }
}
