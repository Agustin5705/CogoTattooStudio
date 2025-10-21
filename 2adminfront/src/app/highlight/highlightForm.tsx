"use client";

import React from "react";

// Mock data structure for highlighted images (reemplazar con API/DB real)
interface HighlightImage {
  id: number;
  url: string;
  tags: string[];
  isActive: boolean;
}

// Datos de ejemplo
const MOCK_HIGHLIGHTS: HighlightImage[] = [
  {
    id: 1,
    url: "/cts.png",
    tags: ["blackwork", "geometria"],
    isActive: true,
  },
  {
    id: 2,
    url: "/cts.png",
    tags: ["realismo", "color"],
    isActive: true,
  },
  {
    id: 3,
    url: "/cts.png",
    tags: ["asiatico", "natural"],
    isActive: false,
  },
  {
    id: 4,
    url: "/cts.png",
    tags: ["dark", "abstracto"],
    isActive: true,
  },
];

const DASHBOARD_HREF = "/";

// Componente para mostrar una tarjeta destacada
const HighlightCard: React.FC<{ highlight: HighlightImage }> = ({
  highlight,
}) => {
  return (
    <div className="bg-gray-700 p-3 rounded-xl shadow-lg flex flex-col h-full border border-gray-600 relative overflow-hidden">
      {/* Status Badge */}
      <span
        className={`absolute top-0 right-0 m-2 px-3 py-1 text-xs font-bold rounded-full shadow-md ${
          highlight.isActive
            ? "bg-green-600 text-white"
            : "bg-red-600 text-white"
        }`}
      >
        {highlight.isActive ? "ACTIVO" : "INACTIVO"}
      </span>

      {/* Image (Placeholder) */}
      <div className="flex-grow flex items-center justify-center bg-gray-900/50 rounded-lg overflow-hidden mb-3 min-h-[120px]">
        <img
          src={highlight.url}
          alt={`Highlight ID ${highlight.id}`}
          // Tailwind class to ensure the image scales nicely, using object-cover as standard
          className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://placehold.co/150x150/1e293b/ffffff?text=ID+${highlight.id}`;
          }}
        />
      </div>

      <p className="text-sm font-semibold text-gray-200 mb-1">
        ID: {highlight.id}
      </p>
      <p className="text-xs text-gray-400 truncate mb-3">
        Tags: {highlight.tags.join(", ")}
      </p>

      {/* Actions */}
      <div className="flex space-x-2 mt-auto">
        <button
          className="flex-1 py-2 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-700 transition duration-150 text-white shadow-md"
          // Placeholder for actual action
          onClick={() => console.log(`Toggle status for ID: ${highlight.id}`)}
        >
          {highlight.isActive ? "Desactivar" : "Activar"}
        </button>
        <button
          className="py-2 px-3 text-xs font-semibold rounded-lg bg-gray-500 hover:bg-gray-600 transition duration-150 text-white shadow-md"
          // Placeholder for actual action
          onClick={() => console.log(`Edit ID: ${highlight.id}`)}
        >
          Editar
        </button>
      </div>
    </div>
  );
};

// Página principal del Gestor de Destacados
export default function AdminHighlightsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <header className="mb-8">
          <a
            href={DASHBOARD_HREF}
            className="text-rose-500 hover:text-rose-400 flex items-center mb-4 transition-colors"
          >
            {/* Ícono de flecha hacia la izquierda */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Volver al Panel
          </a>
          <h1 className="text-4xl font-bold text-rose-500">
            2. Gestor de Destacados (Carrusel)
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Controla qué imágenes de la galería se muestran en el carrusel de la
            página principal.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-rose-600 text-white font-semibold rounded-xl shadow-lg hover:bg-rose-700 transition duration-150"
            // Placeholder for opening a modal or new form to add a new highlight
            onClick={() =>
              console.log("Abrir formulario para añadir destacado")
            }
          >
            + Añadir Nuevo Destacado
          </button>
        </header>

        {/* Listado de Destacados */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-300 mb-6 border-b border-gray-700 pb-2">
            Imágenes Actualmente Destacadas ({MOCK_HIGHLIGHTS.length})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {MOCK_HIGHLIGHTS.map((highlight) => (
              <HighlightCard key={highlight.id} highlight={highlight} />
            ))}
          </div>

          {MOCK_HIGHLIGHTS.length === 0 && (
            <p className="text-center text-gray-500 p-8 border border-dashed border-gray-700 rounded-xl mt-6">
              No hay destacados aun.
            </p>
          )}
        </div>

        {/* Footer simple de administración */}
        <footer className="mt-20 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} COGO Tattoo Studio.
        </footer>
      </div>
    </div>
  );
}
