import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as jose from 'jose';

// Inicializamos Prisma y el secreto JWT
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;
const secret = new TextEncoder().encode(JWT_SECRET);

@Injectable()
export class AuthService {
  // Método que recibe la contraseña, verifica en Neon y genera el token.
  async validateUser(password: string): Promise<{ token: string }> {
    const username = 'admin'; // Nombre de usuario fijo para el administrador

    // 1. Buscar al usuario
    const adminUser = await prisma.adminUser.findUnique({
      where: { username: username },
    });

    if (!adminUser || !adminUser.hashedPassword) {
      // Usar la excepción de NestJS para manejar el error de autenticación
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    // 2. Comparar la contraseña con el hash guardado en Neon
    const isPasswordValid = await bcrypt.compare(
      password,
      adminUser.hashedPassword,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    // 3. Generar el Token JWT
    const token = await new jose.SignJWT({ username: adminUser.username })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1d') // Expira en 1 día
      .sign(secret);

    return { token };
  }
}
