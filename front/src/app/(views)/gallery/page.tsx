"use client";

import React, { useState, useEffect } from "react";
import { GalleryCard } from "@/components/GalleryCard";
import { getGalleryImages } from "@/services/galleryService";
import { GalleryImage } from "@/app/types/gallery";

const GalleryPage: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
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

  // 2. UI de estados (Carga, Error, Vacío)
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-indigo-400">
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

  if (images.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-400">
        <p className="text-xl">
          Aún no hay tatuajes en la galería. ¡Pronto subiremos más arte!
        </p>
      </div>
    );
  }

  // 3. Renderizado de la Cuadrícula Principal con Tailwind
  return (
    <div className="bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-extrabold text-white mb-10 text-center uppercase tracking-wide border-b-2 border-indigo-500/50 pb-4 mx-auto max-w-4xl">
        Nuestro Portafolio de Arte Corporal
      </h2>

      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {images.map((image) => (
          <GalleryCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
