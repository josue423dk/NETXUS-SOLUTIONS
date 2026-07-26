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
        break-inside-avoid mb-6
        rounded-md overflow-hidden
        bg-neutral-50 dark:bg-neutral-100
        border border-neutral-300/50
        shadow-md hover:shadow-lg
        transition-all duration-700 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden">
        <img
          src={imageSrc}
          alt={`Proyecto: ${project.nombre}`}
          loading="lazy"
          className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
        />
        {project.destacado && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-400 dark:bg-primary-500 text-primary-900 dark:text-white text-xs font-semibold tracking-wide">
            Destacado
          </span>
        )}
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="font-heading font-semibold text-lg text-primary-900 dark:text-neutral-900 leading-snug">
          {project.nombre}
        </h3>

        <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-700 leading-relaxed line-clamp-3">
          {project.descripción}
        </p>

        {project.tags && project.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-700/10 text-primary-700 dark:bg-accent-400/15 dark:text-primary-500 border border-primary-700/15 dark:border-accent-400/20"
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
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-500 dark:text-primary-700 dark:hover:text-primary-500 transition-colors"
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
    </div>
  )
}
