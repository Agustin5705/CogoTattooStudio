import React, { useState } from "react";
import { HighlightImage } from "@/types/highlight";

// URL del endpoint de subida
const HIGHLIGHTS_API_URL = "http://localhost:3001/highlights";

// Lista de tags disponibles (copiada de la captura de pantalla)
const AVAILABLE_TAGS = [
  "Blackwork",
  "Realismo",
  "Tribal",
  "Asiatico",
  "Geometria",
  "Natural",
  "Color",
  "Black & grey",
  "Abstracto",
  "Dark",
  "Pop",
];

interface HighlightUploadFormProps {
  // Callback que se ejecuta tras una subida exitosa para actualizar la lista del padre
  onUploadSuccess: (newHighlight: HighlightImage) => void;
}

const initialTagsState: { [key: string]: boolean } = AVAILABLE_TAGS.reduce(
  (acc, tag) => ({ ...acc, [tag]: false }),
  {}
);

export const HighlightUploadForm: React.FC<HighlightUploadFormProps> = ({
  onUploadSuccess,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [selectedTags, setSelectedTags] = useState(initialTagsState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
    setError(null);
  };

  const handleTagChange = (tag: string) => {
    setSelectedTags((prev) => ({ ...prev, [tag]: !prev[tag] }));
  };

  // Función de limpieza de estado
  const resetForm = () => {
    setFile(null);
    setSelectedTags(initialTagsState);
    const fileInput = document.getElementById(
      "highlight-file-input"
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setUploadMessage(null);

    if (!file) {
      setError("Por favor, selecciona un archivo de imagen.");
      return;
    }

    const tagsArray = AVAILABLE_TAGS.filter((tag) => selectedTags[tag]);

    if (tagsArray.length === 0) {
      setError("Por favor, selecciona al menos un tag/categoría.");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      // Adjuntamos cada tag por separado, el backend (ParseArrayPipe) lo leerá como un array
      tagsArray.forEach((tag) => formData.append("tags", tag));
      // Si desea que se active al subir, puede añadir:
      formData.append("isActive", "true");

      const response = await fetch(HIGHLIGHTS_API_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Error desconocido al subir el destacado."
        );
      }

      const result: HighlightImage = await response.json();

      onUploadSuccess(result);
      setUploadMessage(
        `Imagen subida con éxito. ID: ${result.id.substring(0, 8)}...`
      );
      resetForm();
    } catch (err) {
      console.error("Error de subida:", err);
      setError(err instanceof Error ? err.message : "Error de red o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  const buttonDisabled =
    isLoading ||
    !file ||
    AVAILABLE_TAGS.filter((tag) => selectedTags[tag]).length === 0;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-xl shadow-2xl mb-8 border border-rose-500/20"
    >
      <h2 className="text-2xl font-bold text-rose-400 mb-6">
        1. Subir Nueva Imagen Destacada
      </h2>

      {/* Mensajes de estado */}
      {error && (
        <div className="bg-red-800/50 border border-red-600 text-white p-3 rounded-lg mb-4 text-sm font-semibold">
          {error}
        </div>
      )}
      {uploadMessage && (
        <div className="bg-green-700/50 border border-green-600 text-white p-3 rounded-lg mb-4 text-sm font-semibold">
          {uploadMessage}
        </div>
      )}

      {/* Input de Archivo */}
      <div className="mb-6">
        <label
          htmlFor="highlight-file-input"
          className="block text-gray-300 font-semibold mb-2"
        >
          Seleccionar Imagen (JPG, PNG)
        </label>
        <input
          id="highlight-file-input"
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
          className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-600 file:text-white hover:file:bg-rose-700 transition duration-150"
        />
      </div>

      {/* Asignar Tags */}
      <div className="mb-8">
        <label className="block text-gray-300 font-semibold mb-3">
          Asignar Tags/Categorías (Mín. 1)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {AVAILABLE_TAGS.map((tag) => (
            <div key={tag} className="flex items-center">
              <input
                id={`tag-${tag}`}
                type="checkbox"
                checked={selectedTags[tag]}
                onChange={() => handleTagChange(tag)}
                className="w-4 h-4 text-rose-600 bg-gray-700 border-gray-600 rounded focus:ring-rose-500"
              />
              <label
                htmlFor={`tag-${tag}`}
                className="ml-2 text-sm font-medium text-gray-300 hover:text-white cursor-pointer transition-colors"
              >
                {tag}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Botón de Subida */}
      <button
        type="submit"
        disabled={buttonDisabled}
        className={`w-full py-3 rounded-xl font-bold transition duration-150 shadow-md ${
          buttonDisabled
            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
            : "bg-rose-600 hover:bg-rose-700 text-white transform hover:scale-[1.01]"
        }`}
      >
        {isLoading ? "Subiendo..." : "2. Subir a Destacados"}
      </button>
    </form>
  );
};
