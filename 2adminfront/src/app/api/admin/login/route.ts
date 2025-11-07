import { NextResponse } from "next/server";

/**
 * PROXY: Esta ruta en el proyecto Next.js solo reenvía la petición
 * al verdadero servidor backend (en la carpeta 'back/').
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 🚨 Configura la URL de tu servidor BACKEND real.
    // Asumiendo que corre en localhost:4000 (o el puerto que uses).
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    // Reenviar la petición POST al servidor backend real
    const response = await fetch(`${BACKEND_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Devolver la respuesta (con el token o el error 401) directamente al cliente
    return new NextResponse(response.body, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error en el proxy de login:", error);
    // Devolver error 500 si la comunicación con el backend falla
    return NextResponse.json(
      { message: "No se pudo conectar al servidor de autenticación." },
      { status: 500 }
    );
  }
}
