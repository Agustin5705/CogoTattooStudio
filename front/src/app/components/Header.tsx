"use client";

import React, { useState } from "react";
import Link from "next/link";
import { navItems } from "@/constants/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Función para alternar el menú móvil y cerrarlo al hacer clic en un enlace
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const logoStyle =
    "text-3xl font-extrabold text-rose-500 tracking-wider hover:text-rose-400 transition-colors flex flex-row items-center";

  return (
    <header className="bg-gray-900 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 flex-row">
          {/* Logo/Título del Sitio */}
          <div className="flex-shrink-0">
            <Link href="/" className={logoStyle} onClick={closeMenu}>
              <Image
                src="/cts.png"
                alt="Logo CTS"
                width={60} // Tamaño de la imagen (ajustable)
                height={60} // Tamaño de la imagen (ajustable)
                className="rounded-full object-cover hover:animate-pulse"
              />
              COGO TATTOO STUDIO
            </Link>
          </div>

          {/* Menú de Escritorio (Desktop) */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const linkClasses = `
                text-lg font-medium 
                transition duration-300 ease-in-out
                ${
                  isActive
                    ? "text-white border-b-2 border-rose-500" // Estilo Activo
                    : "text-gray-400 hover:text-rose-500 hover:border-rose-500/50 hover:border-b-2" // Estilo Inactivo
                }
              `;
              return (
                <Link key={item.id} href={item.href} className={linkClasses}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Botón de Menú Móvil */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-rose-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              {/* Icono de hamburguesa o X */}
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const linkClasses = `
                block px-3 py-2 rounded-md text-base font-medium 
                ${
                  isActive
                    ? "bg-rose-800 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }
              `;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={linkClasses}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
