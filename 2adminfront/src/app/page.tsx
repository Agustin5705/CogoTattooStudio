"use client";

import LogoutButton from "@/components/LogoutButton";
import React from "react";

// Componente AdminButton (Integrado en el archivo de la página)
interface AdminButtonProps {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const AdminButton: React.FC<AdminButtonProps> = ({
  href,
  title,
  description,
  icon,
}) => {
  return (
    <a
      href={href}
      className="flex items-center p-6 bg-gray-700/50 backdrop-blur-sm rounded-xl border-2 border-gray-600 transition-all duration-300 hover:bg-gray-700 hover:border-rose-500 transform hover:scale-[1.02] shadow-xl"
    >
      <div className="text-rose-500 mr-6 flex-shrink-0">{icon}</div>
      <div>
        <h3 className="text-2xl font-semibold mb-1 text-white">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </a>
  );
};

// Iconos SVG simples
const UploadIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const HighlightIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// FUNCIÓN DE LA PÁGINA PRINCIPAL
export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Encabezado y Bienvenida */}
        <header className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold text-rose-500 tracking-wider">
            COGO | Panel de Control
          </h1>
          <p className="mt-3 text-lg text-gray-400">
            Gestiona el contenido de tu web desde aquí.
          </p>
        </header>

        <img
          src="/cts.png"
          alt="Logo CTS"
          height={100}
          width={100}
          className="mx-auto animate-pulse"
        />

        {/* Contenedor de Navegación */}
        <main className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Botón 1: Uploads */}
          <AdminButton
            href="/upload"
            title="1. Gestión de Archivos (Uploads)"
            description="Sube nuevas imágenes de trabajos a la galería principal de tu portafolio."
            icon={UploadIcon}
          />

          {/* Botón 2: Destacados */}
          <AdminButton
            href="/highlight"
            title="2. Gestión de Destacados (Carrusel)"
            description="Controla qué obras aparecen en el carrusel principal de la página de inicio."
            icon={HighlightIcon}
          />
        </main>
        <div className="flex justify-center p-4">
          <LogoutButton />
        </div>
        {/* Footer simple de administración */}
        <footer className="mt-20 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} COGO Tattoo Studio.
        </footer>
      </div>
    </div>
  );
}
