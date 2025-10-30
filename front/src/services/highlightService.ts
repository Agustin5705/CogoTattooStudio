import { HighlightImage } from "@/app/types/highlight";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Endpoint confirmado del controlador de NestJS: /highlights
const HIGHLIGHTS_URL = `${API_BASE_URL}/highlights`;

/**
 * Obtiene las imágenes marcadas como 'Destacadas' para la Home Page.
 * @returns {Promise<HighlightImage[]>} Un array de imágenes destacadas.
 */
export const getHighlights = async (): Promise<HighlightImage[]> => {
  try {
    const response = await fetch(HIGHLIGHTS_URL, {
      cache: "no-store", // Asegura que siempre traemos lo último del backend
    });

    if (!response.ok) {
      // Intentamos obtener más información del error si está disponible
      const errorText = await response.text();
      console.error(
        `Error ${response.status} en ${HIGHLIGHTS_URL}:`,
        errorText
      );
      throw new Error(
        `Error ${response.status}: No se pudo obtener la lista de destacados.`
      );
    }

    // El JSON se parsea a un array de HighlightImage.
    const data: HighlightImage[] = await response.json();

    // Ordenamos por 'position' (si existe) y luego por fecha.
    data.sort((a, b) => {
      // 1. Ordenamiento primario por 'position'
      const posA = a.position === null ? Infinity : a.position;
      const posB = b.position === null ? Infinity : b.position;

      if (posA !== posB) {
        return posA - posB;
      }

      // 2. Ordenamiento secundario por la más reciente (si la posición es igual o nula)
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });

    return data;
  } catch (error) {
    console.error("Error al obtener destacados:", error);
    throw new Error("Falló la conexión con el servidor de destacados.");
  }
};
