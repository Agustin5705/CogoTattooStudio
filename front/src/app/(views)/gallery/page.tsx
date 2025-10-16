"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { GalleryCard } from "@/components/GalleryCard";
import { getGalleryImages } from "@/services/galleryService";
import { GalleryImage } from "@/app/types/gallery";
import { AVAILABLE_TAGS } from "@/constants/tags"; // Importamos la lista de tags

// El componente de la página ahora es responsable de manejar el estado y la lógica de filtrado
const GalleryPage: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  // Estado que almacena los tags que el usuario ha seleccionado para DESACTIVAR (OCULTAR)
  const [disabledTags, setDisabledTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Uso del Servicio al montar la vista
  useEffect(() => {
    const loadImages = async () => {
      try {
        const loadedImages = await getGalleryImages();
        setImages(loadedImages);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error desconocido de conexión."
        );
      } finally {
        setIsLoading(false);
      }
    };
    loadImages();
  }, []);

  // 2. Lógica para activar/desactivar un tag
  const handleTagToggle = useCallback((tag: string) => {
    setDisabledTags((prevTags) => {
      // Si el tag ya está en la lista de DESACTIVADOS, lo quitamos (activamos)
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      }
      // Si no está, lo agregamos a la lista de DESACTIVADOS
      return [...prevTags, tag];
    });
  }, []);

  // 3. Lógica de Filtrado de Imágenes (Memorizada)
  const filteredImages = useMemo(() => {
    // Si no hay tags desactivados, mostramos todas las imágenes
    if (disabledTags.length === 0) {
      return images;
    }

    // Filtramos las imágenes. La imagen se MUESTRA si NO tiene NINGÚN tag de la lista de DESACTIVADOS.
    return images.filter((image) => {
      if (!image.tags) return true; // Si no tiene tags, lo mostramos por defecto

      // La imagen se mantiene si TODOS sus tags son tags que NO están en la lista de disabledTags.
      // Usamos .every() para verificar que NINGUNO de los tags de la imagen esté en la lista de tags DESACTIVADOS
      return image.tags.every((tag) => !disabledTags.includes(tag));
    });
  }, [images, disabledTags]);

  // UI: Cargando, Error, Vacío
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-rose-400">
        <p className="text-2xl animate-pulse">
          Cargando el portafolio artístico...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-400">
        <p className="text-xl p-6 bg-gray-800 border border-red-500 rounded-lg shadow-xl">
          Error: {error}. Por favor, verifica la conexión del servidor.
        </p>
      </div>
    );
  }

  // 4. Renderizado Final (Filtros y Cuadrícula)
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-extrabold text-white mb-10 text-center uppercase tracking-wide border-b-2 border-rose-500/50 pb-4 mx-auto max-w-4xl">
        Portafolio de Arte Corporal
      </h2>

      {/* PANEL DE FILTROS */}
      <div className="mb-10 flex flex-wrap gap-3 justify-center border-b border-gray-700 pb-6">
        {AVAILABLE_TAGS.map((tag) => {
          // Si el tag NO está en la lista de DESACTIVADOS, está ACTIVO (mostrando)
          const isActive = !disabledTags.includes(tag);
          const baseClasses =
            "px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer select-none";

          return (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`${baseClasses} ${
                isActive
                  ? "bg-rose-700 text-white shadow-md hover:bg-rose-600" // ESTADO ACTIVO (MOSTRANDO)
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600 line-through" // ESTADO DESACTIVADO (OCULTANDO)
              }`}
            >
              {tag.toUpperCase()}
            </button>
          );
        })}
      </div>

      {/* Cuadrícula de Galería */}
      {filteredImages.length > 0 ? (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredImages.map((image) => (
            // Nota: Se usa 'publicId' como clave si 'id' no está disponible en el tipado final.
            <GalleryCard key={image.publicId} image={image} />
          ))}
        </div>
      ) : (
        <div className="text-center text-lg mt-10 text-gray-400">
          No hay tatuajes que coincidan con los filtros seleccionados.
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
