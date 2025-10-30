"use client";

import React, { useState, useEffect } from "react";
// ⚠️ Importaciones necesarias: Asegúrate que las rutas sean correctas en tu proyecto real.
import { getHighlights } from "@/services/highlightService";
import ImageCarousel from "@/app/components/ImageCarousel";
import { HighlightImage } from "@/app/types/highlight";
import Image from "next/image";
import Link from "next/link";
import { Loader2, AlertTriangle } from "lucide-react";

/**
 * Componente que se encarga de la lógica de fetch, manejo de estado y renderizado
 * de las secciones de Destacados (Carrusel y Parrilla) para la Home Page.
 */
export default function HighlightsRenderer() {
  const [images, setImages] = useState<HighlightImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Lógica de FETCH
  useEffect(() => {
    async function fetchHighlights() {
      try {
        const fetchedImages: HighlightImage[] = await getHighlights();

        // El backend debe devolver solo los activos, pero se recomienda doble chequeo
        const activeImages = fetchedImages.filter((img) => img.isActive);

        setImages(activeImages);
        setError(null);
      } catch (err) {
        // Capturamos el error de forma segura
        console.error("Error fetching highlights:", err);
        setError(
          "No se pudieron cargar los trabajos destacados. Intenta recargar."
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchHighlights();
  }, []);

  // --- Manejo de Estados de UI ---

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 bg-gray-900 min-h-[40vh]">
        <Loader2 className="w-8 h-8 text-rose-500 animate-spin mr-3" />
        <p className="text-xl text-gray-400">
          Cargando portafolio destacado...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 bg-red-950/50 border-y border-red-700">
        <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-4" />
        <p className="text-xl font-bold text-red-400">Error de Carga</p>
        <p className="text-gray-400 mt-2">{error}</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-900">
        <p className="text-xl text-gray-400">
          No hay destacados configurados para mostrar en la Home.
        </p>
      </div>
    );
  }

  // --- Adaptación de Datos ---

  // Las primeras N imágenes para el carrusel (el componente espera {id, url, description})
  const carouselImages = images.slice(0, 5).map((img) => ({
    id: img.id,
    url: img.secureUrl,
    // Usamos los tags como descripción para el carrusel
    description: img.tags.join(" | ") || "Destacado de Tatuaje",
  }));

  // Usamos un máximo de 4 imágenes para la parrilla inferior
  const featuredWorkGrid = images.slice(0, 4);

  // --- Renderizado Final ---

  return (
    <>
      {/* SECCIÓN 1: CARRUSEL DINÁMICO */}
      <section className="relative w-full">
        <ImageCarousel
          images={carouselImages}
          intervalMs={5000}
          heightClass="h-[calc(100vh-80px)]"
        />
      </section>

      {/* SECCIÓN 2: PARRILLA DE TRABAJOS DESTACADOS (4 IMÁGENES) */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-bold text-white mb-2">
            Portafolio Destacado
          </h3>
          <p className="text-lg text-gray-400 mb-12">
            Una selección de nuestros trabajos más recientes y representativos.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredWorkGrid.map((item) => (
              <Link
                key={item.id}
                href="/gallery"
                passHref
                // Mantén el estilo que tenías en la Home para los items
                className="group relative overflow-hidden rounded-xl shadow-lg transform hover:scale-[1.03] transition-transform duration-500 ease-out cursor-pointer"
              >
                <Image
                  src={item.secureUrl}
                  alt={item.tags.join(", ") || "Tatuaje Destacado"}
                  width={500}
                  height={500}
                  objectFit="cover"
                  className="w-full h-full object-cover transition duration-500 group-hover:opacity-75"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-base font-semibold border-b border-rose-500 p-1">
                    {item.tags.length > 0 ? item.tags[0] : "Ver Detalle"}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <Link href="/gallery" passHref>
            <span className="mt-12 inline-block px-8 py-3 text-lg font-medium rounded-lg border-2 border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white transition duration-300">
              Ver el Portafolio Completo
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
