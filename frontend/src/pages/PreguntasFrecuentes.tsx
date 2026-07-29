import { useState } from "react"
import { useScrollReveal } from "../hooks/useScrollReveal"
import { faqs } from "../data/faqs"
import { AccordionItem } from "../components/ui/AccordionItem"
import { SectionHeader } from "../components/ui/SectionHeader"

export function PreguntasFrecuentes() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { ref, isVisible } = useScrollReveal()

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const target = e.target as HTMLElement
    const button = target.closest('button[id^="faq-question-"]')
    if (!button) return

    const currentIndex = parseInt(button.id.replace("faq-question-", ""))
    const total = faqs.length
    if (total === 0) return

    let nextIndex: number
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        nextIndex = (currentIndex + 1) % total
        break
      case "ArrowUp":
        e.preventDefault()
        nextIndex = (currentIndex - 1 + total) % total
        break
      case "Home":
        e.preventDefault()
        nextIndex = 0
        break
      case "End":
        e.preventDefault()
        nextIndex = total - 1
        break
      default:
        return
    }

    setOpenIndex(nextIndex)

    requestAnimationFrame(() => {
      document.getElementById(`faq-question-${nextIndex}`)?.focus()
    })
  }

  return (
    <section className="py-24 sm:py-28 px-4">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          overline="FAQ"
          title="Preguntas frecuentes"
          description="Respuestas a las dudas más comunes sobre nuestros servicios y proceso de trabajo."
          as="h1"
          className="text-shadow"
        />

        <div
          ref={ref}
          onKeyDown={handleKeyDown}
          className={`rounded-md border border-neutral-300/50 dark:border-neutral-300/30 shadow-md px-6 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          role="region"
          aria-label="Preguntas frecuentes"
        >
          {faqs.map((faq, i) => (
            <AccordionItem
              key={faq.pregunta}
              pregunta={faq.pregunta}
              respuesta={faq.respuesta}
              index={i}
              abierto={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
