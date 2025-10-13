/**
 * Interfaz que define la estructura de un documento de imagen de la galería.
 * Esta estructura debe coincidir con el DTO (CreateGalleryImageDto) del backend de NestJS
 * y la estructura del registro en NeonDB.
 */
export interface GalleryImage {
  /** Identificador único generado por la base de datos (Prisma/NeonDB). */
  id: string;

  /** URL segura de la imagen alojada en Cloudinary. */
  secureUrl: string;

  /** ID público de Cloudinary, usado para la gestión (edición/eliminación). */
  publicId: string;

  /** Array de strings con los tags/estilos asociados a la imagen (ej: ["blackwork", "realismo"]). */
  tags: string[];

  /** Fecha y hora de creación del registro en la base de datos (se usa para ordenar). */
  createdAt: Date;
}

// Nota: No necesitamos exportar los tags aquí, ya que son un array de strings dentro de GalleryImage.
