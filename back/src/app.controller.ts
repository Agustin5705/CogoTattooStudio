import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard'; // Importa el Guardián JWT

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 🛡️ RUTA DE PRUEBA PROTEGIDA: Ahora usa el Guardián JWT
  // Esto elimina el código de prueba manual que tenías antes.
  @UseGuards(JwtAuthGuard)
  @Get('test-protected')
  getProtectedData(): { message: string } {
    // Si llegamos aquí, el token fue verificado correctamente por JwtAuthGuard.
    // El frontend recibirá 200 OK y NO BORRARÁ el token.
    return { message: 'Conexión segura establecida. El token es válido.' };
  }
}
