export interface Service {
  titulo: string
  descripcion: string
  icono: "web" | "mobile" | "sistema" | "consultoria"
  destacado?: boolean
}

export const servicios: Service[] = [
  {
    titulo: "Desarrollo Web",
    descripcion:
      "Creamos aplicaciones web modernas con React, Next.js y TypeScript. Optimizadas para rendimiento, SEO y experiencia de usuario.",
    icono: "web",
    destacado: true,
  },
  {
    titulo: "Apps Móviles",
    descripcion:
      "Desarrollamos aplicaciones nativas e híbridas con React Native. Experiencias fluidas en iOS y Android con código compartido.",
    icono: "mobile",
  },
  {
    titulo: "Sistemas a Medida",
    descripcion:
      "Arquitecturas backend robustas con Node.js, Express y bases de datos SQL/NoSQL. APIs RESTful y GraphQL escalables.",
    icono: "sistema",
  },
  {
    titulo: "Consultoría TI",
    descripcion:
      "Asesoramiento técnico en arquitectura de software, code reviews, migraciones tecnológicas y optimización de procesos de desarrollo.",
    icono: "consultoria",
  },
]
