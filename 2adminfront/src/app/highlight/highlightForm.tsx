"use client";

import React, { useState, useEffect, useCallback } from "react";
// Importamos los tipos reales
import { HighlightImage, UpdateHighlightPayload } from "@/types/highlight";
// 🚨 CORRECCIÓN CLAVE: El nombre del archivo debe coincidir exactamente.
import { HighlightUploadForm } from "./highlightUploadForm";

// --- Configuración y Constantes ---
const HIGHLIGHTS_API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/highlights`;
const DASHBOARD_HREF = "/";

// ----------------------------------

// --- Componente de Tarjeta Destacada (Lógica PATCH/DELETE) ---
interface HighlightCardProps {
  highlight: HighlightImage;
  onToggle: (id: string, newStatus: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isUpdating: boolean;
}

const HighlightCard: React.FC<HighlightCardProps> = ({
  highlight,
  onToggle,
  onDelete,
  isUpdating,
}) => {
  // Función de Toggle (llama a PATCH)
  const handleToggle = () => onToggle(highlight.id, !highlight.isActive); // Función de Eliminar (llama a DELETE)

  const handleDelete = () => {
    // Usamos una confirmación personalizada para evitar alert()
    if (
      window.confirm(
        "¿Estás seguro de que quieres ELIMINAR este destacado? Esto es permanente."
      )
    ) {
      onDelete(highlight.id);
    }
  };

  const isReady = !isUpdating;

  return (
    <div className="bg-gray-700 p-3 rounded-xl shadow-lg flex flex-col h-full border border-gray-600 relative overflow-hidden transition-opacity duration-300">
            {/* Overlay de Carga (Spinner) */}     {" "}
      {isUpdating && (
        <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center z-10 rounded-xl">
                   {" "}
          <svg
            className="animate-spin h-5 w-5 text-rose-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
                       {" "}
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
                       {" "}
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
                     {" "}
          </svg>
                   {" "}
          <span className="text-white text-sm font-semibold ml-2">
                        Cargando...          {" "}
          </span>
                 {" "}
        </div>
      )}
            {/* Status Badge */}     {" "}
      <span
        className={`absolute top-0 right-0 m-2 px-3 py-1 text-xs font-bold rounded-full shadow-md ${
          highlight.isActive ? "bg-green-600" : "bg-red-600"
        } text-white`}
      >
                {highlight.isActive ? "ACTIVO" : "INACTIVO"}     {" "}
      </span>
            {/* Image */}     {" "}
      <div className="flex-grow flex items-center justify-center bg-gray-900/50 rounded-lg overflow-hidden mb-3 min-h-[120px]">
               {" "}
        <img
          src={highlight.secureUrl} // URL REAL de Cloudinary
          alt={`Highlight ID ${highlight.id}`}
          className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://placehold.co/150x150/1e293b/ffffff?text=ID+${highlight.id.substring(
              0,
              8
            )}`;
          }}
        />
             {" "}
      </div>
           {" "}
      <p className="text-sm font-semibold text-gray-200 mb-1 truncate">
                ID: {highlight.id.substring(0, 8)}...      {" "}
      </p>
           {" "}
      <p className="text-xs text-gray-400 truncate mb-3">
                Tags: {highlight.tags.join(", ")}     {" "}
      </p>
            {/* Actions */}     {" "}
      <div className="flex space-x-2 mt-auto">
               {" "}
        <button
          className={`w-3/4 flex items-center justify-center py-2 text-xs font-semibold rounded-lg shadow-md transition duration-150 ${
            highlight.isActive
              ? "bg-rose-600 hover:bg-rose-700"
              : "bg-green-600 hover:bg-green-700"
          } text-white`}
          onClick={handleToggle}
          disabled={!isReady}
        >
                    {highlight.isActive ? "Desactivar" : "Activar"}       {" "}
        </button>
               {" "}
        <button
          className="w-1/4 text-xs font-semibold rounded-lg bg-gray-500 hover:bg-gray-600 transition duration-150 text-white shadow-md flex justify-center items-center h-full px-3"
          onClick={handleDelete}
          disabled={!isReady}
        >
                    Borrar        {" "}
        </button>
             {" "}
      </div>
         {" "}
    </div>
  );
};
// -------------------------------------------------------------

// --- Componente Principal de la Página (Lógica de Estado) ---
// Cambiamos el nombre de la función exportada para que coincida con el uso en page.tsx
export default function AdminHighlightsPage() {
  const [highlights, setHighlights] = useState<HighlightImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Controla qué tarjeta está actualmente en proceso de actualización/eliminación
  const [isUpdatingId, setIsUpdatingId] = useState<string | null>(null); // 1. Lógica para cargar los destacados (GET /highlights)

  const fetchHighlights = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(HIGHLIGHTS_API_URL);
      if (!response.ok) {
        throw new Error("Error al cargar la lista de destacados.");
      }
      const data: HighlightImage[] = await response.json(); // Aseguramos que la fecha sea un objeto Date
      setHighlights(
        data.map((h) => ({ ...h, createdAt: new Date(h.createdAt) }))
      );
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con el servidor para obtener destacados.");
    } finally {
      setIsLoading(false);
    }
  }, []); // 2. Lógica para cambiar el estado (PATCH /highlights/:id)

  const handleToggleHighlight = async (id: string, newStatus: boolean) => {
    if (isUpdatingId) return;
    setIsUpdatingId(id);
    setError(null);

    try {
      const payload: UpdateHighlightPayload = { isActive: newStatus };
      const response = await fetch(`${HIGHLIGHTS_API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Error al actualizar estado: ${response.status}`
        );
      } // Actualiza el estado local

      setHighlights((prevHighlights) =>
        prevHighlights.map((h) =>
          h.id === id ? { ...h, isActive: newStatus } : h
        )
      );
    } catch (err) {
      console.error("Error al actualizar estado:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Error de red al cambiar el estado."
      );
    } finally {
      setIsUpdatingId(null);
    }
  }; // 3. Lógica para eliminar (DELETE /highlights/:id)

  const handleDeleteHighlight = async (id: string) => {
    if (isUpdatingId) return;
    setIsUpdatingId(id);
    setError(null);

    try {
      const response = await fetch(`${HIGHLIGHTS_API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.status !== 204) {
        // Esperamos 204 No Content
        throw new Error(`Error al eliminar: ${response.status}`);
      } // Elimina del estado local

      setHighlights((prevHighlights) =>
        prevHighlights.filter((h) => h.id !== id)
      );
    } catch (err) {
      console.error("Error al eliminar:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Error de red al eliminar el destacado."
      );
    } finally {
      setIsUpdatingId(null);
    }
  }; // 4. Callback para el formulario de subida (POST)

  const handleNewUploadSuccess = (newHighlight: HighlightImage) => {
    // 🛑 CORRECCIÓN: Convertir el string de fecha (del JSON de respuesta) a un objeto Date.
    const highlightWithDate: HighlightImage = {
      ...newHighlight,
      // Usamos el constructor de Date, que acepta el string ISO
      createdAt: new Date(newHighlight.createdAt as unknown as string),
    }; // Agrega el nuevo destacado al inicio de la lista

    setHighlights((prev) => [highlightWithDate, ...prev]);
    setError(null);
  };

  useEffect(() => {
    fetchHighlights();
  }, [fetchHighlights]); // Lógica de ordenamiento: Activamos primero, luego por fecha de creación (más reciente primero)

  const sortedHighlights = highlights.slice().sort((a, b) => {
    // Criterio 1: Las activas van primero
    if (a.isActive && !b.isActive) return -1;
    if (!a.isActive && b.isActive) return 1; // Criterio 2: Luego por fecha (más reciente primero) // Necesitamos convertir a number para la comparación si createdAt es Date
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-12">
           {" "}
      <div className="max-w-7xl mx-auto">
                {/* Encabezado */}       {" "}
        <header className="mb-8">
                   {" "}
          <a
            href={DASHBOARD_HREF}
            className="text-rose-500 hover:text-rose-400 flex items-center mb-4 transition-colors"
          >
                       {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
                           {" "}
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
                         {" "}
            </svg>
                        Volver al Panel          {" "}
          </a>
                   {" "}
          <h1 className="text-4xl font-bold text-rose-500">
            2. Gestor de Destacados (Carrusel){" "}
          </h1>
                   {" "}
          <p className="mt-2 text-lg text-gray-400">
            Controla qué imágenes se muestran en el carrusel de la página
            principal.{" "}
          </p>
                 {" "}
        </header>
        <img
          src="/cts.png"
          alt="Logo CTS"
          height={100}
          width={100}
          className="mx-auto animate-pulse"
        />
                {/* 1. Formulario de Subida (POST) */}
                <HighlightUploadForm onUploadSuccess={handleNewUploadSuccess} />
                {/* Mensaje de Error Global de la Lista/Gestión */}       {" "}
        {error && (
          <div
            className="bg-red-900/50 border border-red-700 text-white p-4 rounded-xl mb-6 shadow-md"
            role="alert"
          >
                        <p className="font-bold">Error de Gestión:</p>         
              <p className="text-sm">{error}</p>         {" "}
          </div>
        )}
                {/* 2. Listado de Destacados (GET/PATCH/DELETE) */}       {" "}
        <div className="mt-10">
                   {" "}
          <h2 className="text-2xl font-semibold text-gray-300 mb-6 border-b border-gray-700 pb-2">
                        Imágenes Actualmente Destacadas ({highlights.length})  
                   {" "}
          </h2>
                   {" "}
          {isLoading && (
            <div className="text-center p-12 text-rose-500">
                           {" "}
              <svg
                className="animate-spin h-8 w-8 mx-auto"
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0012 20c3.042 0 5.824-1.135 7.938-3l-2.647-3z"
                ></path>
              </svg>
                           {" "}
              <p className="mt-3">Cargando lista de destacados...</p>           {" "}
            </div>
          )}
                   {" "}
          {!isLoading && highlights.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                           {" "}
              {sortedHighlights.map((highlight) => (
                <HighlightCard
                  key={highlight.id}
                  highlight={highlight}
                  onToggle={handleToggleHighlight}
                  onDelete={handleDeleteHighlight}
                  isUpdating={isUpdatingId === highlight.id}
                />
              ))}
                         {" "}
            </div>
          )}
                   {" "}
          {!isLoading && highlights.length === 0 && (
            <p className="text-center text-gray-500 p-8 border border-dashed border-gray-700 rounded-xl mt-6">
                            No hay destacados actualmente. Usa el formulario de
              arriba para subir la primera.{" "}
            </p>
          )}
                 {" "}
        </div>
                {/* Footer */}       {" "}
        <footer className="mt-20 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} COGO Tattoo Studio.        {" "}
        </footer>
             {" "}
      </div>
         {" "}
    </div>
  );
}
