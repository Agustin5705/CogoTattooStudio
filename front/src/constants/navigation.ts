export interface NavItem {
  id: number;
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { id: 1, label: "Inicio", href: "/" },
  { id: 2, label: "Galería", href: "/gallery" },
  { id: 3, label: "Sobre Nosotros", href: "/about" },
  { id: 4, label: "Contacto", href: "/form" },
];
