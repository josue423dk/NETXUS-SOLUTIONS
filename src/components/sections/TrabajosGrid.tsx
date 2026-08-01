import { useState, useEffect } from "react"
import { api } from "../../lib/api"
import type { Project } from "../../types"
import { trabajos as fallbackProjects } from "../../data/trabajos"
import { PortfolioCard } from "./PortfolioCard"
import { Spinner } from "../ui/Spinner"
import { useScrollReveal } from "../../hooks/useScrollReveal"
import { SectionHeader } from "../ui/SectionHeader"

export function TrabajosGrid() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const data = await api.get<Project[]>("/projects")
        if (!cancelled) setProjects(data)
      } catch {
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const allProjects = projects.length > 0 ? [...projects, ...fallbackProjects] : fallbackProjects

  return (
    <section id="trabajos" className="py-16 sm:py-20 md:py-24 lg:py-28">
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

        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : allProjects.length === 0 ? (
          <p className="text-center text-neutral-500 py-20">
            No hay proyectos todavía.
          </p>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {allProjects.map((project, index) => (
              <PortfolioCard key={project.id || project.nombre} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
