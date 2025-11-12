import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nosotros | COGO TATTOO STUDIO",
  description:
    "Conoce la historia, filosofía y el artista detrás de COGO TATTOO STUDIO.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <header className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl text-rose-500 mb-4">
            Nuestra Filosofía
          </h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Transformando visiones en arte corporal.
          </p>
        </header>

        {/* Sección de Contenido Principal (Layout de dos columnas) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Columna de Texto */}
          <div className="lg:order-2 space-y-8">
            <article className="bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-700/50">
              <h2 className="text-3xl font-bold text-white mb-4 border-b border-rose-500/50 pb-2">
                El Estudio: Pasión y Oscuridad
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                COGO TATTOO STUDIO nace de la necesidad de fusionar el arte
                conceptual con la técnica del tatuaje. Nos especializamos en
                estilos que requieren precisión y profundidad: **Blackwork,
                Realismo en escala de grises y Fine Line**. No hacemos solo
                tatuajes; creamos piezas de colección que evolucionan con el
                tiempo.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Cada proyecto es manejado con dedicación meticulosa, desde la
                consulta inicial hasta el último retoque. Creemos que la tinta
                oscura tiene un poder único para expresar profundidad y
                narrativas personales complejas.
              </p>
            </article>

            <article className="bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-700/50">
              <h2 className="text-3xl font-bold text-white mb-4 border-b border-rose-500/50 pb-2">
                El Artista:
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Detrás de COGO está Camilo Pereira, un profesional con muchos
                años de experiencia, reconocido por su manejo impecable de las
                sombras, el contraste y el trabajo de colores.
              </p>
              <ul className="text-gray-300 list-disc list-inside space-y-2 mt-4 ml-4">
                <li>
                  Compromiso con la esterilización y seguridad de nivel
                  hospitalario.
                </li>
              </ul>
            </article>
          </div>

          {/* Columna de Imagen (Para el artista o el estudio) */}
          <div className="lg:order-1 relative h-96 lg:h-[700px] rounded-xl overflow-hidden shadow-2xl">
            {/* Imagen de Placeholder para el artista o el estudio */}
            {/* Nota: Usamos <img> simple por la restricción de next/image */}
            <img
              src="/cts.png"
              alt="Foto del estudio por dentro"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-500"
            />
          </div>
        </section>

        {/* Call to Action Final */}
        <div className="text-center mt-20">
          <h2 className="text-4xl text-white mb-4">
            ¿Listo para comenzar tu Obra?
          </h2>
          <a
            href="/contact"
            className="inline-block px-10 py-4 text-xl font-bold uppercase tracking-wider bg-rose-500 text-white rounded-lg shadow-2xl transition duration-300 transform hover:scale-105 hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-500 focus:ring-opacity-50"
          >
            Contactar Ahora
          </a>
        </div>
      </div>
    </div>
  );
}
