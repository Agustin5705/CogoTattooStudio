2adminfront/ - Panel de Administración

Este módulo es el Frontend de la aplicación diseñado exclusivamente para el Administrador o Tatuador. Es la interfaz protegida que interactúa con los endpoints seguros del Backend para la gestión de contenido.

Tecnologías Clave

Framework: Next.js (React)

Lenguaje: TypeScript

Estilo: CSS Modules / Tailwind CSS

Estado: React Hooks

Consumo API: Fetch API

Funcionalidades y Rutas Protegidas

Esta aplicación se enfoca en la gestión de datos. Todas las rutas, excepto /login y los GET, están protegidas por un sistema de autenticación basado en el JSON Web Token (JWT) proporcionado por el Backend.

Rutas Principales:

/ - Página de inicio con enlaces para gestionar galerias y destacados. (Protegido)

/login - Acceso al sistema. (Público)

/gallery - Gestión CRUD (Crear, Ver, Eliminar) de imágenes de la galería pública. (Protegido)

/highlight - Gestión CRUD de trabajos destacados. (Protegido)

Ejecución en Desarrollo Local

ATENCIÓN! Conflicto de Puerto

Esta aplicación, por ser Next.js, intenta ejecutarse en el puerto 3000. Si el Frontend del Consumidor Final (frontpublico/) ya está corriendo, ocurrirá un conflicto. Para el correcto desarrollo, asegúrate de que solo uno de los fronts use el puerto por defecto (como se indica en el README.md principal).

Pasos para Iniciar

Asegúrate de que el Backend (back/) esté corriendo en http://localhost:3001.

Navega al directorio del admin: cd 2adminfront

Instala las dependencias: npm install

Inicia la aplicación (usando el puerto por defecto): npm run dev

Acceso: http://localhost:3000

Variables de Entorno Requeridas

Este módulo requiere una única variable de entorno clave definida en el archivo .env.local (o su equivalente en producción):

Variable: NEXT_PUBLIC_BACKEND_URL

Descripción: La URL base de la API de NestJS.

Uso: Todas las peticiones fetch de la aplicación se dirigen aquí.

Valor de Desarrollo: http://localhost:3001/api
