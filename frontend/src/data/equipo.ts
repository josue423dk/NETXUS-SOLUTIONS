import type { TeamMember } from "../types"
import alexImg from "../assets/hero/alex.jpeg"
import ivanImg from "../assets/hero/ivan.jpeg"

export const equipo: TeamMember[] = [
  {
    nombre: "Alex Josue Montaña",
    rol: "Tech Lead",
    descripcion:
      "Arquitecto de software especializado en sistemas escalables. Define la estrategia técnica y garantiza la calidad del código.",
    imagen: alexImg,
    github: "https://github.com/josue423dk",
    linkedin: "https://www.linkedin.com/in/alex-josu%C3%A9-monta%C3%B1a-58b726268/",
  },
  {
    nombre: "Ivan Rufino",
    rol: "Product & Design Lead",
    descripcion:
      "Diseñador de producto con enfoque en UX research y diseño de interfaces. Traduce necesidades de negocio en experiencias digitales.",
    imagen: ivanImg,
    github: "https://github.com/CuatroSeis",
    linkedin: "https://www.linkedin.com/in/rufinodev/",
  },
]
