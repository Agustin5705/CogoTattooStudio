⚙️ back/ - API del Sistema COGO TATTOO

Este módulo es la fuente única de verdad para toda la plataforma. Está construido con NestJS y sigue un patrón de arquitectura modular para la gestión de datos, seguridad y servicios externos.

🛠️ Tecnologías y Servicios

ComponenteTecnologíaRolFramework

NestJS

Servidor Node.js modular.

Base de Datos

PostgreSQL (vía Neon)

Persistencia de datos (Galería, Destacados, Logs de Contacto).

ORM

Prisma

Cliente ORM tipado para interactuar con PostgreSQL.

Autenticación

JWT

Implementación de tokens para proteger todas las rutas de administración.

Almacenamiento

Cloudinary

Servicio externo para el almacenamiento y entrega optimizada de imágenes de la Galería y Destacados.

Correo

Nodemailer / Gmail SMTP

Servicio para el envío de notificaciones de contacto.

🧱 Estructura de Módulos

El backend se organiza en los siguientes módulos principales:

AuthModule: Maneja el inicio de sesión y la generación/validación de tokens JWT.

CloudinaryModule: Servicio wrapper para las operaciones de subir y eliminar imágenes en Cloudinary.

ContactModule: Recibe las solicitudes del formulario público, guarda el registro en la DB y usa el MailerService.

FeaturedModule: Gestión de los trabajos destacados del estudio (CRUD).

GalleryModule: Gestión de imágenes de la galería pública (CRUD).

PrismaModule: Servicio global para inyectar el cliente Prisma en toda la aplicación.

MailerModule: Configuración y servicio para el envío de correos (Nodemailer).

🔑 Variables de Entorno (SETUP CRÍTICO)

Para que el Backend funcione en modo de desarrollo (.env local) o producción, requiere la configuración de las siguientes variables sensibles:

CategoríaVariableDescripciónBase de Datos

DATABASE_URL

Cadena de conexión completa a Neon DB (PostgreSQL).

Autenticación

JWT_SECRET

Clave secreta para firmar los tokens JWT.

Admin

ADMIN_PASSWORD

Contraseña pre-hasheada para la cuenta de administrador.

Cloudinary

CLOUDINARY_CLOUD_NAME

Nombre de la nube.

Cloudinary

CLOUDINARY_API_KEY

Clave pública de la API.

Cloudinary

CLOUDINARY_API_SECRET

Secreto de la API (la más sensible).

Correo

MAIL_USER

Email remitente (usado para la autenticación SMTP).

Correo

MAIL_PASS

Contraseña de Aplicación generada por Google/SMTP.

Correo

MAIL_DESTINATION_ADDRESS

Email que recibe las notificaciones de contacto.

🚀 Guía de Operación y Desarrollo

1. Instalación y Migraciones

Instalar dependencias:

npm install

Generar el cliente Prisma basado en el esquema (schema.prisma):

npx prisma generate

Para realizar migraciones de esquema (si se modificó schema.prisma):

npx prisma migrate dev --name <nombre_de_la_migracion>

2. Ejecución Local

Asegúrate de que DATABASE_URL esté configurada.

Iniciar el servidor en modo desarrollo:

npm run start:dev

Puerto de API: http://localhost:3001

📚 Documentación de la API (Swagger)

La documentación de los endpoints está disponible de forma interactiva gracias a la integración con Swagger.

Para acceder a la documentación interactiva, visita:

➡️ http://localhost:3001/api/docs

Aquí podrás ver todos los DTOs, los parámetros de las peticiones protegidas y los códigos de respuesta.
