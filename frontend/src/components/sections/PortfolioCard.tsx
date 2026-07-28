import type { Project } from "../../types"
import { useScrollReveal } from "../../hooks/useScrollReveal"
import { useTheme } from "../../hooks/useTheme"

interface PortfolioCardProps {
  project: Project
  index: number
}

export function PortfolioCard({ project, index }: PortfolioCardProps) {
  const { ref, isVisible } = useScrollReveal()
  const { isDark } = useTheme()
  const imageSrc = isDark && project.imagenDark ? project.imagenDark : project.imagen

  return (
    <div
      ref={ref}
      className={`
        group relative break-inside-avoid mb-6
        p-1.5 rounded-[20px] bg-black/[0.03] dark:bg-white/[0.03]
        transition-all duration-700 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
      style={{ transitionDelay: `${index * 100}ms` }}
      tabIndex={0}
    >
      <div className="relative overflow-hidden rounded-[14px] bg-neutral-50 dark:bg-neutral-100 border border-neutral-300/50 shadow-md hover:shadow-lg">
        <img
          src={imageSrc}
          alt={`Proyecto: ${project.nombre}`}
          loading="lazy"
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {project.destacado && (
          <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-400 dark:bg-primary-500 text-primary-900 dark:text-white text-xs font-accent tracking-wide">
            Destacado
          </span>
        )}

        <div className="
          absolute inset-0 z-10
          flex flex-col justify-end
          p-5 sm:p-6
          bg-primary-900/80
          opacity-0 group-hover:opacity-100 group-focus-within:opacity-100
          transition-opacity duration-300 ease-out
        ">
          {project.categoria && (
            <span className="self-start mb-3 px-2.5 py-0.5 rounded-full text-xs font-accent tracking-wide bg-white/15 text-white border border-white/20">
              {project.categoria.replace("-", " ")}
            </span>
          )}

          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-2.5 py-0.5 rounded-full text-xs font-accent bg-white/15 text-white border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-accent text-white/80 hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Ver proyecto
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          )}
        </div>

        <div className="p-5 sm:p-6">
          <h3 className="font-heading font-semibold text-lg text-primary-900 dark:text-neutral-900 leading-snug">
            {project.nombre}
          </h3>

          <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-700 leading-relaxed line-clamp-3">
            {project.descripción}
          </p>
        </div>
      </div>
    </div>
  )
}
