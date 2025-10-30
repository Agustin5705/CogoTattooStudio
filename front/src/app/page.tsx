"use client";

import Image from "next/image";
import Link from "next/link";
// 🚨 Importamos el componente que maneja la lógica, carga y renderizado de los destacados.
import HighlightsRenderer from "@/components/HighlightsRenderer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* SECCIÓN HÉROE (ESTÁTICA) - SIN CAMBIOS */}
      <section className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden">
        {/* Fondo con imagen oscura (simulando blackwork) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/cts.png"
            alt="Fondo oscuro del estudio de tatuajes"
            layout="fill"
            objectFit="cover"
            priority
            className="opacity-10" // Control de opacidad para que el texto resalte
          />
        </div>

        {/* Contenido principal del Héroe */}
        <div className="relative z-10 p-6 max-w-4xl mx-auto backdrop-blur-sm bg-gray-900/50 rounded-xl shadow-2xl border border-rose-500/30">
          <h1 className="text-6xl md:text-8xl text-white mb-4 uppercase tracking-tighter drop-shadow-lg font-pirata animate-pulse outline-double">
            COGO TATTOO STUDIO
          </h1>
          <h2 className="text-2xl md:text-3xl text-green-800 font-semibold mb-6 italic">
            Arte Corporal de Autor: Blackwork, Realismo y Vanguardia.
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Transformamos ideas en obras de arte permanentes. Nuestro estudio se
            especializa en diseños detallados y únicos, ofreciendo una
            experiencia profesional y segura.
          </p>
          <Link href="/contact" passHref>
            <span className="inline-block px-10 py-4 text-xl font-bold uppercase rounded-full bg-green-950 text-white shadow-lg hover:bg-rose-700 transition duration-300 transform hover:scale-105 tracking-wider">
              Agenda tu Consulta
            </span>
          </Link>
        </div>
      </section>

      {/* 🚨 SECCIONES DINÁMICAS: CARRUSEL Y PARRILLA CON DATA REAL */}
      {/* Todo el contenido dinámico y la lógica de carga se maneja dentro de este componente. */}
      <HighlightsRenderer />

      {/* SECCIÓN CTA (Llamada a la Acción Secundaria) - SIN CAMBIOS */}
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
