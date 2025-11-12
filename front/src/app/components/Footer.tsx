import React from "react";
import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/constants/navigation";
import { GOOGLE_MAPS_LINK, SHOP_NAME } from "@/constants/shop";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // 🟢 LECTURA DE VARIABLES DE ENTORNO
  // Se asume que todas estas variables están definidas en .env con el prefijo NEXT_PUBLIC_
  const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#";
  const FACEBOOK_URL = process.env.NEXT_PUBLIC_FACEBOOK_URL || "#";
  const CONTACT_EMAIL =
    process.env.NEXT_PUBLIC_EMAIL_ADDRESS || "correo@ejemplo.com";
  // Usamos el número de teléfono limpio para la llamada (tel:)
  // y el link completo para WhatsApp.
  // NOTA: Para la llamada, extraemos el número del link de WhatsApp, pero lo ideal sería una variable aparte.
  // Usaremos el email y el link de WhatsApp para los enlaces dinámicos.
  const WHATSAPP_LINK = process.env.NEXT_PUBLIC_WHATSAPP_LINK || "#";

  // Función para obtener el número de teléfono sin el protocolo (para la visualización)
  const getDisplayPhone = () => {
    // Ejemplo de extracción simple:
    const match = WHATSAPP_LINK.match(/\/(\d+)$/);
    if (match) {
      // Formatea el número para visualización si es posible, si no, usa el link completo como fallback
      return match[1].replace(/(\d{3})(\d{2})(\d{3})(\d{3})/, "+$1 $2 $3 $4");
    }
    return "Contacto Directo";
  };

  const displayPhone = getDisplayPhone();

  return (
    <footer className="bg-gray-800 text-gray-300 border-t border-rose-900/50 mt-16 shadow-inner">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Columna 1: Logo y Derechos */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link
              href="/"
              className="flex items-center space-x-3 group animate-pulse font-pirata"
            >
              <Image
                src="/cts.png"
                alt="Logo CTS"
                width={40}
                height={40}
                className="rounded-full object-cover transition-transform group-hover:scale-110"
              />
              <span className="text-xl font-bold text-white group-hover:text-rose-500 transition-colors">
                {SHOP_NAME}
              </span>
            </Link>
            <p className="text-sm">
              &copy; {currentYear} {SHOP_NAME}. Todos los derechos reservados.
            </p>

            {/* 🟢 ENLACES DE REDES SOCIALES */}
            <div className="flex space-x-4 mt-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-rose-500 transition-colors"
                aria-label="Instagram"
              >
                {/* SVG para Instagram (Placeholder o icono real si lo tienes) */}
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.258.064 1.761.272 2.156.426.4.153.77.37.994.594.22.224.44.594.597.994.156.395.364.898.428 2.156.056 1.266.069 1.646.069 4.85 0 3.204-.012 3.584-.07 4.85-6.4e-3 1.258-.272 1.761-.426 2.156-.153.4-.37.77-.594.994-.224.22-.594.44-.994.597-.395.156-.898.364-2.156.428-1.266.056-1.646.069-4.85.069-3.204 0-3.584-.012-4.85-.07-1.258-.064-1.761-.272-2.156-.426-.4-.153-.77-.37-.994-.594-.22-.224-.44-.594-.597-.994-.156-.395-.364-.898-.428-2.156-.056-1.266-.069-1.646-.069-4.85 0-3.204.012-3.584.07-4.85.064-1.258.272-1.761.426-2.156.153-.4.37-.77.594-.994.224-.22.594-.44.994-.597.395-.156.898-.364 2.156-.428 1.266-.056 1.646-.069 4.85-.069zm0-2.163c-3.268 0-3.676.012-4.945.07-1.378.067-2.392.302-3.252.648-.86.346-1.57.82-2.26 1.508-.69.69-.706 1.107-1.508 2.26-1.508.86-1.895 1.874-2.26 3.252-.058 1.269-.07 1.677-.07 4.945s.012 3.676.07 4.945c.067 1.378.302 2.392.648 3.252.346.86.82 1.57 1.508 2.26.69.69.706 1.107 1.508 2.26 1.508.86 1.895 1.874 2.26 3.252.058 1.269.07 1.677.07 4.945s-.012 3.676-.07 4.945c-.067 1.378-.302 2.392-.648 3.252-.346.86-.82 1.57-1.508 2.26-.69.69-.706 1.107-1.508 2.26-1.508.86-1.895 1.874-2.26 3.252-.058 1.269-.07 1.677-.07 4.945zm12.336-9.141c0 2.24-1.816 4.056-4.056 4.056s-4.056-1.816-4.056-4.056 1.816-4.056 4.056-4.056 4.056 1.816 4.056 4.056zm-1.056 0c0-1.688-1.368-3.056-3.056-3.056s-3.056 1.368-3.056 3.056 1.368 3.056 3.056 3.056 3.056-1.368 3.056-3.056zm3.765-4.832c0 .548-.445.993-.993.993s-.993-.445-.993-.993.445-.993.993-.993.993.445.993.993z" />
                </svg>
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-rose-500 transition-colors"
                aria-label="Facebook"
              >
                {/* SVG para Facebook */}
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zm-3.5 8h-2c-.55 0-1 .45-1 1v2h3l-.33 3h-2.67v7H9v-7H7V9h2V7.5C9 5.57 10.46 4 12.5 4h2.5v4z" />
                </svg>
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-rose-500 transition-colors"
                aria-label="WhatsApp"
              >
                {/* SVG para WhatsApp */}
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.43 14.86c-.19.66-1.12.91-2.03.62l-1.57-.49c-.44-.13-.93-.19-1.42-.19-.49 0-.98.06-1.42.19l-1.57.49c-.91.29-1.84.04-2.03-.62C3.12 11.23 6.95 6.8 12 6.8c5.05 0 8.88 4.43 7.82 10.06-.19.66-1.12.91-2.03.62l-1.57-.49c-.44-.13-.93-.19-1.42-.19-.49 0-.98.06-1.42.19l-1.57.49zM12 4.8c4.27 0 8.01 3.52 7.03 8.86-.19.66-1.12.91-2.03.62l-1.57-.49c-.44-.13-.93-.19-1.42-.19-.49 0-.98.06-1.42.19l-1.57.49c-.91.29-1.84.04-2.03-.62C3.99 8.32 7.73 4.8 12 4.8zM12 16.2c-2.43 0-4.74-.95-6.52-2.73C3.69 11.75 3 9.75 3 7.5c0-.49.06-.98.19-1.42l1.57-.49c.91-.29 1.84-.04 2.03.62 1.06 4.43 3.99 7.08 7.21 7.08 3.22 0 6.15-2.65 7.21-7.08.19-.66 1.12-.91 2.03-.62l1.57.49c.13.44.19.93.19 1.42 0 2.25-.69 4.25-2.48 6.03-1.78 1.78-4.09 2.73-6.52 2.73z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Columna 2: Navegación Rápida (Sin cambios) */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-rose-500/50 pb-1">
              Navegación
            </h3>
            <ul className="space-y-2 text-sm">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="hover:text-rose-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-rose-500/50 pb-1">
              Contáctanos
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                {/* 🟢 Uso de NEXT_PUBLIC_EMAIL_ADDRESS */}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="hover:text-rose-500 transition-colors"
                >
                  Email: {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                {/* 🟢 Uso de NEXT_PUBLIC_WHATSAPP_LINK */}
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-rose-500 transition-colors"
                >
                  WhatsApp: {displayPhone}
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Ubicación (Maps) (Sin cambios) */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-rose-500/50 pb-1">
              Ubicación
            </h3>
            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-rose-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-rose-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              Ver en Google Maps
            </a>
            <p className="text-xs mt-3 text-gray-400">
              Clic para abrir la ubicación exacta del estudio.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
