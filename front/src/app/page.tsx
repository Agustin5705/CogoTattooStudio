"use client";

import Image from "next/image";
import Link from "next/link";

// Datos de ejemplo para trabajos destacados (Reemplazar con datos reales más tarde)
const featuredWork = [
  { id: 1, src: "/cts.png", alt: "Placeholder" },
  { id: 2, src: "/cts.png", alt: "Placeholder" },
  { id: 3, src: "/cts.png", alt: "Placeholder" },
  { id: 4, src: "/cts.png", alt: "Placeholder" },
];

// URLs simuladas para las imágenes destacadas
// NOTA: DEBES ASEGURARTE DE QUE estas imágenes existan en tu carpeta /public/tattoos/
// o reemplazarlas con imágenes de tu galería real.
// Por ejemplo, puedes usar imágenes de placeholder de Cloudinary temporalmente
// si ya tienes la configuración de hostnames lista.

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* SECCIÓN HÉROE */}
      <section className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden">
        {/* Fondo con imagen oscura (simulando blackwork) */}
        <div className="absolute inset-0 z-0">
          {/* Usamos una imagen de fondo que represente el estilo Blackwork/Realismo */}
          {/* Usaremos una imagen de placeholder oscuro temporal, o debes subir una a /public/hero_bg.jpg */}
          <Image
            src="https://placehold.co/1920x1080/0A0A0A/444444?text=Fondo+Hero"
            alt="Fondo oscuro del estudio de tatuajes"
            layout="fill"
            objectFit="cover"
            priority
            className="opacity-40" // Control de opacidad para que el texto resalte
          />
        </div>

        {/* Contenido principal del Héroe */}
        <div className="relative z-10 p-6 max-w-4xl mx-auto backdrop-blur-sm bg-gray-900/50 rounded-xl shadow-2xl border border-rose-500/30">
          <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-4 uppercase tracking-tighter drop-shadow-lg">
            COGO TATTOO STUDIO
          </h1>
          <h2 className="text-2xl md:text-3xl text-rose-400 font-semibold mb-6 italic">
            Arte Corporal de Autor: Blackwork, Realismo y Vanguardia.
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Transformamos ideas en obras de arte permanentes. Nuestro estudio se
            especializa en diseños detallados y únicos, ofreciendo una
            experiencia profesional y segura.
          </p>
          <Link href="/contact" passHref>
            <span className="inline-block px-10 py-4 text-xl font-bold uppercase rounded-full bg-rose-600 text-white shadow-lg hover:bg-rose-700 transition duration-300 transform hover:scale-105 tracking-wider">
              Agenda tu Consulta
            </span>
          </Link>
        </div>
      </section>

      {/* SECCIÓN DE TRABAJOS DESTACADOS */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-bold text-white mb-2">
            Portafolio Destacado
          </h3>
          <p className="text-lg text-gray-400 mb-12">
            Una selección de nuestros trabajos más recientes y representativos.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredWork.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-xl shadow-lg transform hover:scale-[1.03] transition-transform duration-500 ease-out cursor-pointer"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={500}
                  height={500}
                  objectFit="cover"
                  className="w-full h-full object-cover transition duration-500 group-hover:opacity-75"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-base font-semibold border-b border-rose-500 p-1">
                    Ver Galería
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Link href="/gallery" passHref>
            <span className="mt-12 inline-block px-8 py-3 text-lg font-medium rounded-lg border-2 border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white transition duration-300">
              Ver el Portafolio Completo
            </span>
          </Link>
        </div>
      </section>

      {/* SECCIÓN CTA (Llamada a la Acción Secundaria) */}
      <section className="bg-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            ¿Listo para tu próxima obra?
          </h3>
          <p className="text-lg text-gray-400 mb-8">
            Hablemos de tu idea. La consulta es el primer paso para crear un
            diseño que defina tu estilo.
          </p>
          <Link href="/contact" passHref>
            <span className="inline-block px-10 py-4 text-xl font-bold rounded-lg bg-white text-gray-900 shadow-xl hover:bg-gray-200 transition duration-300 transform hover:-translate-y-1">
              Contáctanos Ahora
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
