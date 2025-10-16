import React from "react";
import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/constants/navigation";
import {
  GOOGLE_MAPS_LINK,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SHOP_NAME,
} from "@/constants/shop";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300 border-t border-rose-900/50 mt-16 shadow-inner">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Columna 1: Logo y Derechos */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
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
          </div>

          {/* Columna 2: Navegación Rápida */}
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
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="hover:text-rose-500 transition-colors"
                >
                  Email: {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_PHONE}`}
                  className="hover:text-rose-500 transition-colors"
                >
                  Teléfono: {CONTACT_PHONE}
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Ubicación (Maps) */}
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
