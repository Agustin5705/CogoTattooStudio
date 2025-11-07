"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

const AUTH_TOKEN_STORAGE_KEY = "cogo_admin_auth_token";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  authToken: string | null;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const isAuthenticated = useMemo(() => !!authToken, [authToken]);
  const [loading, setLoading] = useState(true);

  // Cargar token desde localStorage al iniciar
  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    if (token) {
      setAuthToken(token);
    }
    setLoading(false);
  }, []);

  /**
   * PASO 3: Lógica de Login que llama al backend (API Route).
   * El frontend solo envía la contraseña y espera el token.
   */
  const login = useCallback(async (password: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        // Si el backend devuelve 401 (contraseña incorrecta), simplemente retornamos false
        return false;
      }

      const data = await response.json();
      const { token } = data; // El token viene del backend

      if (token) {
        localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
        setAuthToken(token);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    setAuthToken(null);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      authToken,
      login,
      logout,
      isLoading: loading,
    }),
    [isAuthenticated, authToken, login, logout, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// =======================================================
// useAuthFetch (Componente de Autorización)
// =======================================================
export const useAuthFetch = () => {
  const { authToken, logout } = useAuth();

  const authFetch = useCallback(
    async (input: RequestInfo | URL, init?: RequestInit) => {
      // Si no hay token, el hook detiene la petición
      if (!authToken) {
        logout();
        throw new Error("Unauthorized: No authentication token found.");
      }

      const config: RequestInit = {
        ...init,
        headers: {
          ...init?.headers,
          // Inyectamos el token: el único rol del frontend
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response = await fetch(input, config);

      // Si el backend devuelve 401, forzamos el logout
      if (response.status === 401) {
        // logout();
        throw new Error("Unauthorized: Token rejected by server.");
      }

      return response;
    },
    [authToken, logout]
  );

  return authFetch;
};
