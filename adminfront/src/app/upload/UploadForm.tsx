"use client";

import React, { useState, useCallback } from "react";
import { GalleryImage } from "@/types/gallery";

const UPLOAD_URL = "http://localhost:3001/gallery"; // Endpoint POST /gallery

// CATEGORÍAS FIJAS: Definimos los tags disponibles para el admin
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
  // NUEVO ESTADO: Guarda solo los tags que el admin ha marcado
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const [lastUpload, setLastUpload] = useState<GalleryImage | null>(null);

  // Función para manejar la selección/deselección de un tag
  const handleTagChange = useCallback((tag: string) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        // Deseleccionar: si ya existe, lo quitamos
        return prevTags.filter((t) => t !== tag);
      } else {
        // Seleccionar: si no existe, lo añadimos
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

      // Los selectedTags ya son un array limpio, no necesitamos parsing
      const tagsToUpload = selectedTags;

      // 1. Crear FormData
      const formData = new FormData();
      formData.append("file", file);

      // 2. Añadir tags al FormData. Se envía al backend tal cual.
      tagsToUpload.forEach((tag) => {
        formData.append("tags[]", tag);
      });

      try {
        const response = await fetch(UPLOAD_URL, {
          method: "POST",
          body: formData,
        });

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

        (document.getElementById("file-input") as HTMLInputElement).value = "";
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
    <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Subir Imagen con Categorías Fijas
      </h1>

      {/* Mensajes */}
      {message && (
        <div
          className={`p-4 mb-4 border rounded-xl transition-all duration-300 ${
            message.type === "success"
              ? "bg-green-100 text-green-800 border-green-400"
              : "bg-red-100 text-red-800 border-red-400"
          }`}
          role="alert"
        >
          <p className="font-semibold">{message.text}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Campo de Archivo */}
        <div>
          <label
            htmlFor="file-input"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Seleccionar Imagen (JPG, PNG)
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition duration-150"
            required
          />
        </div>

        {/* 2. Campo de Tags (CHECKBOXES - NUEVA INTERFAZ) */}
        <div>
          <span className="block text-sm font-medium text-gray-700 mb-2">
            Seleccionar Tags/Categorías:
          </span>
          <div className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-xl bg-gray-50">
            {AVAILABLE_TAGS.map((tag) => (
              <div key={tag} className="flex items-center">
                <input
                  id={`tag-${tag}`}
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label
                  htmlFor={`tag-${tag}`}
                  className="ml-2 text-sm font-medium text-gray-700 cursor-pointer transition-colors hover:text-indigo-700"
                >
                  {/* Capitalizamos el tag para la UI */}
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </label>
              </div>
            ))}
          </div>
          {/* Indicador de tags seleccionados */}
          <p className="mt-2 text-xs text-gray-500">
            Tags seleccionados:
            <span className="font-semibold text-gray-600 ml-1">
              {selectedTags.length > 0 ? selectedTags.join(", ") : "Ninguno"}
            </span>
          </p>
        </div>

        {/* 3. Botón de Subida */}
        <button
          type="submit"
          disabled={isLoading || !file}
          className={`w-full py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-semibold text-white transition duration-300 ${
            isLoading || !file
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          }`}
        >
          {isLoading ? "Subiendo..." : "Subir a Galería"}
        </button>
      </form>

      {/* Vista previa de la última subida exitosa */}
      {lastUpload && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Última Imagen Subida:
          </h2>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Tags guardados:</span>{" "}
            {lastUpload.tags.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
