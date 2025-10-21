"use client";

import React from "react";

// Se utiliza 'a' para la navegación simple de Next.js App Router
interface AdminButtonProps {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode; // Para pasar un SVG o un ícono
}

const AdminButton: React.FC<AdminButtonProps> = ({
  href,
  title,
  description,
  icon,
}) => {
  return (
    <a
      href={href}
      className="flex items-center p-6 bg-gray-700/50 backdrop-blur-sm rounded-xl border-2 border-gray-600 transition-all duration-300 hover:bg-gray-700 hover:border-rose-500 transform hover:scale-[1.02] shadow-xl"
    >
      <div className="text-rose-500 mr-6 flex-shrink-0">{icon}</div>
      <div>
        <h3 className="text-2xl font-semibold mb-1 text-white">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </a>
  );
};

export default AdminButton;
