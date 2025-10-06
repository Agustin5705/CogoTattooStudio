export interface GalleryImage {
  id: string; // UUID de la DB
  publicId: string; // ID de Cloudinary (CRÍTICO para eliminar)
  secureUrl: string; // URL pública de la imagen
  tags: string[]; // Array de strings para las etiquetas (ej: ["japonés", "floral"])
  createdAt: string; // Fecha de creación
}
