import type { FaqItem } from "../types"

export const faqs: FaqItem[] = [
  {
    pregunta: "¿Cuánto cuesta desarrollar un proyecto?",
    respuesta:
      "Depende del alcance y la complejidad. Un sitio web corporativo puede partir desde USD 2.000, mientras que una aplicación completa puede oscilar entre USD 10.000 y USD 50.000+. En la reunión inicial evaluamos tus necesidades y te damos un presupuesto detallado sin compromiso.",
    categoria: "presupuesto",
  },
  {
    pregunta: "¿Cuánto tiempo toma desarrollar un proyecto?",
    respuesta:
      "Depende del alcance. Un sitio web corporativo puede tomar 2-4 semanas, mientras que una aplicación completa puede llevar 2-6 meses. Durante la fase de descubrimiento te daremos un estimado preciso.",
    categoria: "proceso",
  },
  {
    pregunta: "¿Qué tecnologías utilizan?",
    respuesta:
      "Trabajamos con un stack moderno: React, Next.js, TypeScript, Node.js, PostgreSQL, MongoDB, y Tailwind CSS. Siempre elegimos la tecnología más adecuada para cada proyecto.",
    categoria: "tecnico",
  },
  {
    pregunta: "¿Cómo es el proceso de trabajo?",
    respuesta:
      "Empezamos con una reunión de descubrimiento, luego diseñamos prototipos, desarrollamos en sprints de 1-2 semanas con feedback constante, y finalmente desplegamos con CI/CD automatizado.",
    categoria: "proceso",
  },
  {
    pregunta: "¿Puedo ver avances durante el desarrollo?",
    respuesta:
      "Sí, por supuesto. Trabajamos con sprints cortos y al final de cada sprint te mostramos los avances, recibimos tu feedback y ajustamos la dirección si es necesario. La transparencia es parte de nuestro proceso.",
    categoria: "proceso",
  },
  {
    pregunta: "¿El sitio funcionará en celular?",
    respuesta:
      "Absolutamente. Todos nuestros desarrollos son mobile-first, lo que significa que diseñamos primero para dispositivos móviles y luego escalamos a pantallas más grandes. Tu sitio se verá y funcionará perfectamente en cualquier dispositivo.",
    categoria: "tecnico",
  },
  {
    pregunta: "¿Ofrecen soporte post-lanzamiento?",
    respuesta:
      "Sí. Todos nuestros planes incluyen soporte técnico y mantenimiento. Podemos contratar horas adicionales o un plan de mantenimiento continuo según tus necesidades.",
    categoria: "soporte",
  },
  {
    pregunta: "¿Qué pasa si no me gusta el resultado?",
    respuesta:
      "Trabajamos con hitos de revisión en cada fase del proyecto. Si algo no te convence, lo ajustamos antes de avanzar. Además, ofrecemos una garantía de satisfacción en todos nuestros servicios.",
    categoria: "confianza",
  },
  {
    pregunta: "¿Quién es dueño del código?",
    respuesta:
      "Tú. Una vez que el proyecto se entrega y se completa el pago, el código fuente es 100% tuyo. Te proporcionamos documentación completa y acceso al repositorio para que tengas total control sobre tu producto.",
    categoria: "confianza",
  },
  {
    pregunta: "¿Trabajan con clientes internacionales?",
    respuesta:
      "Sí, trabajamos de forma remota con clientes de toda América Latina y Estados Unidos. Nuestra comunicación es ágil y nos adaptamos a tu huso horario.",
    categoria: "logistica",
  },
  {
    pregunta: "¿Cómo manejan la seguridad?",
    respuesta:
      "La seguridad es prioridad desde el diseño. Aplicamos validación de inputs, protección contra XSS/CSRF, headers de seguridad, rate limiting, y seguimos las mejores prácticas de OWASP en cada desarrollo.",
    categoria: "tecnico",
  },
  {
    pregunta: "¿Cuáles son sus formas de pago?",
    respuesta:
      "Trabajamos con transferencia bancaria, PayPal y Mercado Pago. El pago se estructura por hitos: 30% al inicio, 40% a mitad de proyecto y 30% a la entrega final. Para proyectos grandes podemos acordar un plan de pago personalizado.",
    categoria: "presupuesto",
  },
]
