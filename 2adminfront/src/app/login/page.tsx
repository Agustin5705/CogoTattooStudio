"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/AuthContext";

// Componente de Login (UI)
const AdminLoginPage: React.FC = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { isAuthenticated, login } = useAuth();
  const router = useRouter();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/"); // Redirige al panel principal
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 🔑 Llama a la función 'login' de AuthContext, que a su vez llama a /api/admin/login
    const success = await login(password);

    setLoading(false);

    if (success) {
      // Éxito: La redirección ocurre en el useEffect
    } else {
      // Fallo: El servidor respondió con 401
      setError("Contraseña incorrecta. Inténtalo de nuevo.");
      setPassword("");
    }
  };

  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center">
          Redirigiendo al panel de administración...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-2xl border border-rose-600/50">
        <h1 className="text-3xl font-bold text-center text-rose-500 mb-6">
          Acceso de Administración COGO Tattoo
        </h1>
        <img
          src="/cts.png"
          alt="Logo CTS"
          height={100}
          width={100}
          className="mx-auto animate-ping"
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-rose-500 focus:border-rose-500 transition duration-150"
              placeholder="Contraseña Secreta"
              required
            />
          </div>

          {error && (
            <p className="text-sm p-3 bg-red-900/40 text-red-400 rounded-lg border border-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold shadow-lg transition duration-300 flex items-center justify-center ${
              loading
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-rose-600 hover:bg-rose-700 text-white transform hover:scale-[1.01]"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Verificando...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
