import { trabajos } from "../../data/trabajos"
import { PortfolioCard } from "./PortfolioCard"
import { useScrollReveal } from "../../hooks/useScrollReveal"

export function TrabajosGrid() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()

  return (
    <section id="trabajos" className="py-16 sm:py-20 lg:py-28 bg-neutral-50 dark:bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`
            text-center mb-12 sm:mb-16
            transition-all duration-700 ease-out
            ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          <span className="inline-block text-accent-400 dark:text-primary-500 font-semibold tracking-[0.2em] text-sm uppercase">
            Nuestro trabajo
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary-900 dark:text-neutral-900 leading-tight">
            Proyectos recientes
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-700 dark:text-neutral-700 max-w-2xl mx-auto leading-relaxed">
            Soluciones digitales que desarrollamos para nuestros clientes,
            priorizando calidad, rendimiento y experiencia de usuario.
          </p>
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
