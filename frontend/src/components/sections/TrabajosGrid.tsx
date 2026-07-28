import { trabajos } from "../../data/trabajos"
import { PortfolioCard } from "./PortfolioCard"
import { useScrollReveal } from "../../hooks/useScrollReveal"
import { SectionHeader } from "../ui/SectionHeader"

export function TrabajosGrid() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()

  return (
    <section id="trabajos" className="py-16 sm:py-20 lg:py-28 bg-neutral-50 dark:bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`
            transition-all duration-700 ease-out
            ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          <SectionHeader
            overline="Nuestro trabajo"
            title="Proyectos recientes"
            description="Soluciones digitales que desarrollamos para nuestros clientes, priorizando calidad, rendimiento y experiencia de usuario."
            as="h2"
            className="mb-12 sm:mb-16"
          />
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {trabajos.map((trabajo, index) => (
            <PortfolioCard key={trabajo.nombre} project={trabajo} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
