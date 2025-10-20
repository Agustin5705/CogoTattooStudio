/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/types/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pirata: ["var(--font-pirata)", 'sans-serif'],
        geist: ["var(--font-geist-sans)", 'sans-serif'],
        geistMono: ["var(--font-geist-mono)", 'monospace'],
      },
      colors: {
        rose: {
          500: '#f43f5e',
        }
      }
    },
  },
  plugins: [],
}
