"use client";

import React from "react";
// Asegúrate de que la ruta de importación sea correcta para tu proyecto (ej: '@/hooks/AuthContext')
import { useAuth } from "@/hooks/AuthContext";

const LogoutButton: React.FC = () => {
  // Obtenemos la función logout del contexto
  const { logout } = useAuth();

  // Puedes usar useRouter si quieres asegurar una redirección explícita,
  // pero el AuthGuard del layout ya se encargará de forzar la redirección a /login
  // tan pronto como el estado de isAuthenticated cambie a false.

  const handleLogout = () => {
    // 🔑 Llamamos al método logout, que elimina el token y actualiza el estado.
    logout();
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-rose-600 text-white font-semibold rounded-lg shadow-md hover:bg-rose-700 transition duration-300 transform hover:scale-[1.02] active:scale-95"
    >
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;
