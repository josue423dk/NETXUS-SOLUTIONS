import { useState } from "react"
import { useScrollReveal } from "../hooks/useScrollReveal"

const faqs = [
  {
    pregunta: "¿Cuánto tiempo toma desarrollar un proyecto?",
    respuesta:
      "Depende del alcance. Un sitio web corporativo puede tomar 2-4 semanas, mientras que una aplicación completa puede llevar 2-6 meses. Durante la fase de descubrimiento te daremos un estimado preciso.",
  },
  {
    pregunta: "¿Qué tecnologías utilizan?",
    respuesta:
      "Trabajamos con un stack moderno: React, Next.js, TypeScript, Node.js, PostgreSQL, MongoDB, y Tailwind CSS. Siempre elegimos la tecnología más adecuada para cada proyecto.",
  },
  {
    pregunta: "¿Ofrecen soporte post-lanzamiento?",
    respuesta:
      "Sí. Todos nuestros planes incluyen soporte técnico y mantenimiento. Podemos contratar horas adicionales o un plan de mantenimiento continuo según tus necesidades.",
  },
  {
    pregunta: "¿Cómo manejan la seguridad?",
    respuesta:
      "La seguridad es prioridad desde el diseño. Aplicamos validación de inputs, protección contra XSS/CSRF, headers de seguridad, rate limiting, y seguimos las mejores prácticas de OWASP en cada desarrollo.",
  },
  {
    pregunta: "¿Trabajan con clientes internacionales?",
    respuesta:
      "Sí, trabajamos de forma remota con clientes de toda América Latina y Estados Unidos. Nuestra comunicación es ágil y nos adaptamos a tu huso horario.",
  },
  {
    pregunta: "¿Cómo es el proceso de trabajo?",
    respuesta:
      "Empezamos con una reunión de descubrimiento, luego diseñamos prototipos, desarrollamos en sprints de 1-2 semanas con feedback constante, y finalmente desplegamos con CI/CD automatizado.",
  },
]

function AccordionItem({
  pregunta,
  respuesta,
  abierto,
  onToggle,
}: {
  pregunta: string
  respuesta: string
  abierto: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-neutral-300/50">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left"
        aria-expanded={abierto}
      >
        <span className="font-heading font-medium text-primary-900 pr-4">
          {pregunta}
        </span>
        <svg
          className={`w-5 h-5 text-neutral-500 flex-shrink-0 transition-transform duration-200 ${
            abierto ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          abierto ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-sm text-neutral-700 leading-relaxed">
          {respuesta}
        </p>
      </div>
    </div>
  )
}

export function PreguntasFrecuentes() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="py-24 sm:py-28 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-accent-400 font-semibold tracking-[0.2em] text-sm uppercase">
            FAQ
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary-900 leading-tight">
            Preguntas frecuentes
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-700 max-w-xl mx-auto leading-relaxed">
            Respuestas a las dudas más comunes sobre nuestros servicios y
            proceso de trabajo.
          </p>
        </div>

        <div
          ref={ref}
          className={`rounded-md border border-neutral-300/50 shadow-md px-6 bg-neutral-50 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              pregunta={faq.pregunta}
              respuesta={faq.respuesta}
              abierto={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}