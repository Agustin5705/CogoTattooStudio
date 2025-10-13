/** @type {import('tailwindcss').Config} */
module.exports = {
  // CRÍTICO: Indica a Tailwind dónde buscar las clases (páginas, componentes, tipos)
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/types/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}