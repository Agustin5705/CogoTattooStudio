"use client";

import React, { useState, useCallback } from "react";

// Si no tienes el archivo de tipos, puedes usar un tipo temporal:
interface GalleryImage {
  id: string;
  secureUrl: string;
  tags: string[];
}

// Endpoint de prueba que debes reemplazar
const UPLOAD_URL = "http://localhost:3001/gallery"; // Endpoint POST /gallery
// URL de Next.js para volver al dashboard
const DASHBOARD_HREF = "/";

// CATEGORÍAS FIJAS: Tus categorías definidas
const AVAILABLE_TAGS = [
  "blackwork",
  "realismo",
  "tribal",
  "asiatico",
  "geometria",
  "natural",
  "color",
  "black & grey",
  "abstracto",
  "dark",
  "pop",
];

const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const [lastUpload, setLastUpload] = useState<GalleryImage | null>(null);

  const handleTagChange = useCallback((tag: string) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!file) {
        setMessage({
          text: "Por favor, selecciona un archivo.",
          type: "error",
        });
        return;
      }

      setIsLoading(true);
      setMessage(null);

      const tagsToUpload = selectedTags;

      const formData = new FormData();
      formData.append("file", file);

      // Añadir tags al FormData.
      tagsToUpload.forEach((tag) => {
        formData.append("tags[]", tag);
      });

      try {
        // --- LLAMADA REAL A TU API DE UPLOAD ---
        const response = await fetch(UPLOAD_URL, {
          method: "POST",
          body: formData,
        });
        // --- FIN LLAMADA REAL A TU API DE UPLOAD ---

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Error desconocido al subir el archivo."
          );
        }

        const result: GalleryImage = await response.json();

        setMessage({
          text: `Subida exitosa: ID ${result.id}.`,
          type: "success",
        });
        setLastUpload(result);
        setFile(null);
        setSelectedTags([]); // Limpiamos la selección

        // Resetea el input de tipo file
        const fileInput = document.getElementById(
          "file-input"
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      } catch (error) {
        console.error("Error de subida:", error);
        setMessage({
          text: `Error al subir: ${
            error instanceof Error ? error.message : "Error de red."
          }`,
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [file, selectedTags]
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white max-w-full max-h-full">
      {/* El padding se aplica al contenedor centrado */}
      <div className="max-w-3xl mx-auto p-4 md:p-12">
        {/* Encabezado */}
        <header className="mb-8">
          <a
            href={DASHBOARD_HREF}
            className="text-rose-500 hover:text-rose-400 flex items-center mb-4 transition-colors"
          >
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
            Gestor de Galería (Uploads)
          </h1>
          <p className="mt-2 text-gray-400">
            Sube nuevos trabajos a tu portafolio y asigna tags para la
            navegación.
          </p>
        </header>

        <div className="bg-gray-800 p-6 md:p-8 rounded-xl shadow-2xl border border-gray-700">
          {/* Mensajes de feedback */}
          {message && (
            <div
              className={`p-4 mb-6 rounded-lg transition-all duration-300 shadow-md ${
                message.type === "success"
                  ? "bg-green-700/50 text-white border border-green-600"
                  : "bg-red-700/50 text-white border border-red-600"
              }`}
              role="alert"
            >
              <p className="font-semibold">{message.text}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Campo de Archivo */}
            <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600">
              <label
                htmlFor="file-input"
                className="block text-sm font-bold text-gray-300 mb-3"
              >
                1. Seleccionar Imagen (JPG, PNG)
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                onChange={(e) =>
                  setFile(e.target.files ? e.target.files[0] : null)
                }
                // Estilos para el input de tipo file
                className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-600 file:text-white hover:file:bg-rose-700 transition duration-150 cursor-pointer"
                required
                disabled={isLoading}
              />
            </div>

            {/* 2. Campo de Tags (CHECKBOXES) */}
            <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600">
              <span className="block text-sm font-bold text-gray-300 mb-3">
                2. Asignar Tags/Categorías:
              </span>
              {/* Se mantiene w-full para evitar expansión, y flex-wrap */}
              <div className="flex flex-wrap gap-3 p-3 bg-gray-800 rounded-lg shadow-inner border border-gray-700 w-full">
                {AVAILABLE_TAGS.map((tag) => (
                  <div key={tag} className="flex items-center min-w-0">
                    <input
                      id={`tag-${tag}`}
                      type="checkbox"
                      checked={selectedTags.includes(tag)}
                      onChange={() => handleTagChange(tag)}
                      className="h-4 w-4 text-rose-600 border-gray-500 rounded focus:ring-rose-500 cursor-pointer bg-gray-600"
                      disabled={isLoading}
                    />
                    <label
                      htmlFor={`tag-${tag}`}
                      className="ml-2 text-sm font-medium text-gray-200 cursor-pointer transition-colors hover:text-rose-400"
                    >
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Botón de Subida */}
            <button
              type="submit"
              disabled={isLoading || !file || selectedTags.length === 0}
              className={`w-full py-3 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white transition duration-300 transform hover:scale-[1.01] ${
                isLoading || !file || selectedTags.length === 0
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-rose-500/50 focus:ring-offset-gray-900"
              }`}
            >
              {isLoading ? "Subiendo..." : "3. Subir a Galería"}
            </button>
          </form>
        </div>

        {/* Vista previa de la última subida exitosa */}
        {lastUpload && (
          <div className="mt-10 pt-6 border-t border-gray-700">
            <h2 className="text-xl font-semibold text-gray-200 mb-4">
              Última Imagen Subida:
            </h2>
            <p className="text-sm text-gray-400">
              <span className="font-medium text-rose-500">Tags guardados:</span>
              <span className="ml-2 font-semibold text-gray-200">
                {lastUpload.tags.join(", ")}
              </span>
            </p>
            {/* Si no tienes un componente Image, usa img normal */}
            {/* Si la URL de secureUrl es real, considera usar next/image aquí */}
            <img
              src={lastUpload.secureUrl}
              alt="Última Subida"
              className="mt-4 w-full h-auto object-cover rounded-xl shadow-md border border-gray-700"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadForm;
