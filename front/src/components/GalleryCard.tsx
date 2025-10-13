import React from "react";
import Image from "next/image";
import { GalleryImage } from "@/app/types/gallery";

interface GalleryCardProps {
  image: GalleryImage;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({ image }) => {
  // URL de placeholder de ejemplo en caso de que la URL de Cloudinary sea inválida
  const placeholderUrl = `https://placehold.co/400x600/1e293b/f87171?text=Tattoo`;

  return (
    <div
      // Contenedor de la tarjeta: usa clases de transición y hover
      className="
                group relative w-full overflow-hidden rounded-xl 
                shadow-xl shadow-rose-900/40 border border-transparent 
                transition-all duration-300 ease-in-out
                hover:scale-[1.03] hover:shadow-rose-600/60 hover:border-rose-500
            "
    >
      {/* Imagen principal */}
      <Image
        src={image.secureUrl || placeholderUrl}
        alt={"Tatuaje de la galería"}
        width={500}
        height={700}
        // Clases de Tailwind para asegurar el llenado y la adaptación al contenedor
        className="
                    w-full h-auto object-cover 
                    transition-opacity duration-300 ease-in-out
                    group-hover:opacity-90 
                "
        // Fallback en caso de error de carga
        onError={(e) => {
          e.currentTarget.src = placeholderUrl;
        }}
        loading="lazy"
      />

      {/* Overlay sutil para la descripción/tags (opcional) */}
      <div
        className="absolute inset-0 bg-black bg-opacity-10 
                transition-opacity duration-300"
      />
    </div>
  );
};
