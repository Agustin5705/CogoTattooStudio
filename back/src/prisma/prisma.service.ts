import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // 🚨 AHORA SOLO LEE LA VARIABLE DATABASE_URL QUE ES LA ÚNICA QUE TIENES EN EL .env
    const url = process.env.DATABASE_URL;

    // Si la URL existe, la usa. Si no, usa la configuración por defecto (que fallaría, pero
    // por lo menos no da el error 'undefined').
    super(
      url
        ? {
            log: ['query'], // Mantuvimos tu configuración de log: ['query']
            datasources: { db: { url } },
          }
        : {},
    );
  }

  async onModuleInit() {
    // Conexión y chequeo de estabilidad
    try {
      await this.$connect();
      console.log('✅ Conexión a la base de datos establecida con éxito.');
    } catch (e) {
      console.error('❌ Error al conectar con la base de datos:', e.message);
      // Forzamos el fallo si hay error, mostrando el P1001 si vuelve a ocurrir
      throw e;
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit' as never, async () => {
      await app.close();
    });
  }
}
