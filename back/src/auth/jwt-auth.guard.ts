import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // ⬅️ Usamos el servicio oficial de NestJS

@Injectable()
export class JwtAuthGuard implements CanActivate {
  // ⬅️ Inyectamos el servicio para que use la configuración de AppModule
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Token de autenticación faltante o inválido.',
      );
    }

    const token = authHeader.substring(7); // Quitar 'Bearer '

    try {
      // 🛡️ Utilizamos .verify() del JwtService. Él ya conoce la clave de AppModule.
      const payload = await this.jwtService.verify(token);

      request.user = payload;

      return true; // Token válido, permite acceso
    } catch (e) {
      // El token es inválido, expirado, o la firma no coincide.
      throw new UnauthorizedException('Token inválido o expirado.');
    }
  }
}
