import { useState, useCallback } from "react"
import { useScrollReveal } from "../hooks/useScrollReveal"
import { faqs } from "../data/faqs"
import { AccordionItem, SectionHeader } from "../components/ui"

export function PreguntasFrecuentes() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { ref, isVisible } = useScrollReveal()

  const handleKeyNavigation = useCallback(
    (direction: "up" | "down" | "home" | "end") => {
      const total = faqs.length
      if (total === 0) return

      let nextIndex: number

      switch (direction) {
        case "down":
          nextIndex = openIndex === null ? 0 : (openIndex + 1) % total
          break
        case "up":
          nextIndex = openIndex === null ? total - 1 : (openIndex - 1 + total) % total
          break
        case "home":
          nextIndex = 0
          break
        case "end":
          nextIndex = total - 1
          break
      }

      setOpenIndex(nextIndex)

      requestAnimationFrame(() => {
        const button = document.getElementById(`faq-question-${nextIndex}`)
        button?.focus()
      })
    },
    [openIndex]
  )

  return (
    <section className="py-16 md:py-24 sm:py-28 px-4">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          overline="FAQ"
          title="Preguntas frecuentes"
          description="Respuestas a las dudas más comunes sobre nuestros servicios y proceso de trabajo."
          as="h1"
        />

        <div
          ref={ref}
          className={`px-2 sm:px-4 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          role="region"
          aria-label="Preguntas frecuentes"
        >
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              pregunta={faq.pregunta}
              respuesta={faq.respuesta}
              index={i}
              abierto={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              onKeyNavigation={handleKeyNavigation}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
