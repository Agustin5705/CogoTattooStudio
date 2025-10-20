"use client";

import React, { useState, useEffect, useCallback } from "react";

// Definición de la estructura básica de la imagen
interface CarouselImage {
  id: string;
  url: string;
  description: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  intervalMs?: number; // Intervalo de tiempo para el autoplay en milisegundos
  heightClass?: string; // Clase de Tailwind para definir la altura
}

// Componente Carrusel (Solo maneja el ciclo de imágenes)
const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  intervalMs = 5000, // 5 segundos
  heightClass = "h-full", // Altura por defecto para llenar el contenedor padre
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para pasar a la imagen siguiente
  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  // Función para pasar a la imagen anterior
  const prevImage = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  }, [images.length]);

  // Manejo del autoplay
  useEffect(() => {
    if (images.length < 2) return;

    const timer = setInterval(() => {
      nextImage();
    }, intervalMs);

    return () => clearInterval(timer);
  }, [images.length, intervalMs, nextImage]);

  if (!images || images.length === 0) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-900 border-2 border-dashed border-rose-500/50 ${heightClass}`}
      >
        <p className="text-xl text-gray-500">Cargando imágenes destacadas...</p>
      </div>
    );
  }

  return (
    // Outer Container (Define la altura y oculta el desbordamiento)
    <div className={`relative overflow-hidden w-full ${heightClass}`}>
      {/* Inner Container (El que se traslada) */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        // 1. ANCHO TOTAL: N veces el 100% del contenedor padre (viewport width)
        style={{
          width: `${images.length * 100}%`,
          // 2. TRASLACIÓN: Mueve el carrusel a la imagen actual
          transform: `translateX(-${currentIndex * (100 / images.length)}%)`,
        }}
      >
        {images.map((image) => (
          // Slide Container
          <div
            key={image.id}
            className="h-full relative"
            // 3. LA CORRECCIÓN: Cada slide debe tener 100/N % del ancho del contenedor interno
            style={{ width: `${100 / images.length}%` }}
          >
            <img
              src={image.url}
              alt={image.description}
              className="absolute inset-0 w-full h-full object-contain brightness-[0.7] transition duration-500 ease-in-out"
            />
            {/* Overlay sutil (se mantiene) */}
            <div className="absolute inset-0 bg-black opacity-30"></div>
          </div>
        ))}
      </div>

      {/* Botones de Navegación (Flechas) */}
      <button
        onClick={prevImage}
        aria-label="Imagen anterior"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/40 hover:bg-black/70 text-white rounded-full transition duration-300 z-20"
      >
        {/* SVG Ícono de Chevron Izquierda */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={nextImage}
        aria-label="Imagen siguiente"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/40 hover:bg-black/70 text-white rounded-full transition duration-300 z-20"
      >
        {/* SVG Ícono de Chevron Derecha */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      {/* Indicadores de Posición (Puntos) */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir a imagen ${index + 1}`}
            className={`h-3 w-3 rounded-full transition-colors duration-300 ${
              index === currentIndex
                ? "bg-rose-500"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
