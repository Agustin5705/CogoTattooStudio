// Define la estructura de datos que esperamos recibir del backend
// GET /highlights, POST /highlights, PATCH /highlights/:id
// Se mapea directamente al modelo HighlightImage de Prisma.

export interface HighlightImage {
  id: string; // UUID de la tabla HighlightImage
  publicId: string; // ID de Cloudinary (para manejar la eliminación)
  secureUrl: string; // URL pública de la imagen
  tags: string[]; // Array de tags
  createdAt: Date; // Fecha de subida
  isActive: boolean; // Estado para mostrar/ocultar en el carrusel
  position: number | null; // Posición de ordenamiento
}

// Tipo usado para las peticiones POST (Subida)
// No incluye el archivo binario, solo los campos de texto
export interface CreateHighlightPayload {
  tags: string[];
  isActive?: boolean;
  position?: number;
}

// Tipo usado para las peticiones PATCH (Actualización)
export interface UpdateHighlightPayload {
  isActive?: boolean;
  position?: number;
}
