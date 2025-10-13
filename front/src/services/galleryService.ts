import { GalleryImage } from "@/app/types/gallery";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const GALLERY_URL = `${API_BASE_URL}/gallery`;

// Función para obtener todas las imágenes de la galería
export const getGalleryImages = async (): Promise<GalleryImage[]> => {
  try {
    const response = await fetch(GALLERY_URL, {
      // Usamos 'no-cache' para asegurar que siempre traemos lo último del backend
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Error ${response.status}: No se pudo obtener la galería.`
      );
    }

    const data: GalleryImage[] = await response.json();

    // Ordenamos por la más reciente (opcional, pero buena práctica)
    data.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return data;
  } catch (error) {
    console.error("Error al obtener imágenes:", error);
    // Lanzamos el error para que el componente pueda mostrar un mensaje al usuario
    throw new Error("Falló la conexión con el servidor de la galería.");
  }
};

// Nota: Necesitas el archivo de tipado GalleryImage en front/src/types/gallery.ts
// Asegúrate de copiarlo desde el adminFront si aún no lo tienes.
