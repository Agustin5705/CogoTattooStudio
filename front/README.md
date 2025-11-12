frontpublico/ - Frontend de Consumidor Final

Este módulo es la interfaz principal y pública de la plataforma, diseñada para mostrar el trabajo del estudio y facilitar el contacto con el tatuador.

Tecnologías Clave

Framework: Next.js (React)

Lenguaje: TypeScript

Estilo: CSS Modules / Tailwind CSS

Consumo API: Fetch API

Rutas y Contenido

La aplicación es un sitio de una sola página (o con pocas rutas públicas), diseñado para una navegación fluida.

/ - Página Principal (Home)

Contenido: Presentación del estudio, Galería de trabajos y la sección de Trabajos Destacados.

Flujo: Obtiene la Galería y los Destacados directamente desde el Backend (API).

/form - Formulario de Contacto

Flujo: Permite a los clientes enviar solicitudes o consultas. Los datos se envían a un endpoint público del Backend, el cual guarda el registro en la DB y dispara el envío de un correo electrónico al administrador.

Ejecución en Desarrollo Local

ATENCIÓN! Conflicto de Puerto

Esta aplicación, por ser Next.js, intenta ejecutarse en el puerto 3000. Si el Frontend de Administración (2adminfront/) ya está corriendo, ocurrirá un conflicto.

Para evitarlo, debes iniciar esta aplicación especificando un puerto diferente, como se indica en el README.md principal.

Pasos para Iniciar

Asegúrate de que el Backend (back/) esté corriendo en http://localhost:3001.

Navega al directorio público: cd frontpublico

Instala las dependencias: npm install

Inicia la aplicación npm run dev

Variables de Entorno Requeridas

Este módulo requiere variables de entorno para la API y para los enlaces de redes sociales (que se muestran en el Footer).

NEXT_PUBLIC_BACKEND_URL: URL base de la API de NestJS. (Valor de Desarrollo: http://localhost:3001/api)

NEXT_PUBLIC_INSTAGRAM_URL: Enlace directo a la cuenta de Instagram.

NEXT_PUBLIC_FACEBOOK_URL: Enlace directo a la cuenta de Facebook.

NEXT_PUBLIC_WHATSAPP_LINK: Enlace directo de WhatsApp para contacto.

NEXT_PUBLIC_EMAIL_ADDRESS: Correo electrónico de contacto del estudio.
