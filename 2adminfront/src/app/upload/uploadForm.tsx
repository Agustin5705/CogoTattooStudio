"use client";

import React, { useState, useCallback } from "react";
import { GalleryImage } from "@/types/gallery";

const UPLOAD_URL = "http://localhost:3001/gallery"; // Endpoint POST /gallery

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
    <div className="max-w-xl mx-auto p-6 bg-white shadow-2xl rounded-2xl border border-gray-100">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Gestor de Galería (Admin)
      </h1>

      {/* Mensajes de feedback */}
      {message && (
        <div
          className={`p-4 mb-6 border rounded-xl transition-all duration-300 shadow-md ${
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
        <div className="border p-4 rounded-xl bg-indigo-50/50">
          <label
            htmlFor="file-input"
            className="block text-sm font-bold text-gray-700 mb-2"
          >
            1. Imagen (JPG, PNG)
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-200 file:text-indigo-800 hover:file:bg-indigo-300 transition duration-150 cursor-pointer"
            required
          />
        </div>

        {/* 2. Campo de Tags (CHECKBOXES) */}
        <div>
          <span className="block text-sm font-bold text-gray-700 mb-3">
            2. Seleccionar Tags/Categorías:
          </span>
          <div className="flex flex-wrap gap-3 p-4 border border-gray-300 rounded-xl bg-white shadow-inner">
            {AVAILABLE_TAGS.map((tag) => (
              <div key={tag} className="flex items-center">
                <input
                  id={`tag-${tag}`}
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                />
                <label
                  htmlFor={`tag-${tag}`}
                  className="ml-2 text-sm font-medium text-gray-800 cursor-pointer transition-colors hover:text-indigo-700"
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
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-500/50"
          }`}
        >
          {isLoading ? "Subiendo..." : "3. Subir a Galería"}
        </button>
      </form>

      {/* Vista previa de la última subida exitosa */}
      {lastUpload && (
        <div className="mt-10 pt-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Última Imagen Subida:
          </h2>
          <p className="text-sm text-gray-600">
            <span className="font-medium text-indigo-600">Tags guardados:</span>
            <span className="ml-2 font-semibold text-gray-800">
              {lastUpload.tags.join(", ")}
            </span>
          </p>
          <img
            src={lastUpload.secureUrl}
            alt="Última Subida"
            className="mt-4 w-full h-auto object-cover rounded-xl shadow-md border"
          />
        </div>
      )}
    </div>
  );
};

export default UploadForm;
