import type { Project } from "../types"

export const trabajos: Project[] = [
  {
    nombre: "E-Commerce ModaFirma",
    descripcion:
      "Plataforma de comercio electrónico para marca de moda con pasarela de pagos Stripe, panel de administración y diseño responsive.",
    imagen: "https://placehold.co/800x600/0F4C4C/FFFFFF?text=ModaFirma",
    imagenDark: "https://placehold.co/800x600/1A1A1A/FF6B00?text=ModaFirma",
    tags: ["React", "Next.js", "Stripe", "Tailwind"],
    url: "https://modafirma.com",
    categoria: "desarrollo-web",
    destacado: true,
  },
  {
    nombre: "Dashboard Analytics",
    descripcion:
      "Panel de visualización de datos con gráficos interactivos en tiempo real para empresa de logística.",
    imagen: "https://placehold.co/800x500/1C7C7E/FFFFFF?text=Dashboard",
    imagenDark: "https://placehold.co/800x500/1A1A1A/FFB800?text=Dashboard",
    tags: ["React", "D3.js", "Node.js", "PostgreSQL"],
    categoria: "sistemas-a-medida",
    destacado: false,
  },
  {
    nombre: "Landing Page GreenTech",
    descripcion:
      "Sitio institucional de una empresa de energía renovable con animaciones fluidas y optimización SEO.",
    imagen: "https://placehold.co/800x700/2DD4BF/FFFFFF?text=GreenTech",
    imagenDark: "https://placehold.co/800x700/1A1A1A/FFB800?text=GreenTech",
    tags: ["Astro", "Tailwind", "Framer Motion"],
    url: "https://greentech.com.ar",
    categoria: "desarrollo-web",
    destacado: false,
  },
  {
    nombre: "Sistema de Gestión Hospitalaria",
    descripcion:
      "Plataforma integral para gestión de pacientes, turnos, historial clínico y reportes administrativos.",
    imagen: "https://placehold.co/800x550/0A2E30/FFFFFF?text=HospitalSys",
    imagenDark: "https://placehold.co/800x550/1A1A1A/E8351A?text=HospitalSys",
    tags: ["TypeScript", "Express", "MongoDB", "React"],
    categoria: "sistemas-a-medida",
    destacado: true,
  },
  {
    nombre: "Plataforma Educativa EduClick",
    descripcion:
      "E-learning con cursos en video, seguimiento de progreso, sistema de evaluaciones y certificados.",
    imagen: "https://placehold.co/800x650/0F4C4C/FFFFFF?text=EduClick",
    imagenDark: "https://placehold.co/800x650/1A1A1A/FF8C00?text=EduClick",
    tags: ["Next.js", "Prisma", "Tailwind"],
    categoria: "desarrollo-web",
    destacado: false,
  },
  {
    nombre: "App de Inventario RetailPro",
    descripcion:
      "Sistema de control de stock con escaneo de código de barras, alertas de reposición y reportes de movimiento.",
    imagen: "https://placehold.co/800x480/1C7C7E/FFFFFF?text=RetailPro",
    imagenDark: "https://placehold.co/800x480/1A1A1A/FF6B00?text=RetailPro",
    tags: ["React", "Node.js", "PostgreSQL", "Docker"],
    categoria: "sistemas-a-medida",
    destacado: false,
  },
]
