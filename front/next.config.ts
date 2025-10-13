/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para permitir imágenes de Cloudinary
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
    // Esto es un fallback por si usas versiones anteriores o solo quieres la propiedad 'domains'
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
