export interface HighlightImage {
  id: string; // UUID de la tabla HighlightImage
  publicId: string; // ID de Cloudinary (para manejar la eliminación)
  secureUrl: string; // URL pública de la imagen
  tags: string[]; // Array de tags
  createdAt: Date; // Fecha de subida
  isActive: boolean; // Estado para mostrar/ocultar en el carrusel
  position: number | null; // Posición de ordenamiento
}
