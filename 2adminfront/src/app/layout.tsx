"use client";

import React, { useMemo, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

// Importa tus fuentes
import { Geist, Geist_Mono } from "next/font/google";

// Importa tu Contexto (Asegúrate que la ruta sea correcta, si lo tienes en 'hooks')
import { AuthProvider, useAuth } from "@/hooks/AuthContext";
import "./globals.css";

// --- Configuración de Fuentes y Metadata (SIN CAMBIOS) ---

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- Componente AuthGuard (Lógica de Protección) ---

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 🔑 CONSUMIMOS isLoading y isAuthenticated
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const loginPath = "/login";
  const isLoginPage = useMemo(
    () => pathname === loginPath,
    [pathname, loginPath]
  );

  useEffect(() => {
    // 1. Si el contexto aún está cargando el token inicial, NO hacemos nada.
    if (isLoading) return;

    // 2. Si NO está autenticado Y NO está en la página de login, lo mandamos al login.
    if (!isAuthenticated && !isLoginPage) {
      router.replace(loginPath);
    }

    // 3. Si está autenticado Y está en la página de login, lo mandamos a la página principal.
    if (isAuthenticated && isLoginPage) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoginPage, router, isLoading]);

  // Muestra el cargador si AÚN estamos cargando el estado inicial
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-rose-500 text-lg">
        Verificando credenciales de acceso...
      </div>
    );
  }

  // Muestra el contenido si está autenticado O si está en la página de login
  if (isAuthenticated || isLoginPage) {
    return <>{children}</>;
  }

  // Si llegamos aquí y no estamos ni cargando, ni autenticados, ni en login, mostramos un feedback mientras se completa la redirección.
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-rose-500 text-lg">
      Redirigiendo al Login...
    </div>
  );
};

// --- Componente RootLayout (Contenedor Final) ---

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gray-900 text-white`}
      >
        {/* Aquí integramos el AuthProvider y el AuthGuard */}
        <AuthProvider>
          <AuthGuard>{children}</AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
