import type { ReactNode } from "react"
import type { Service } from "../../data/servicios"
import { useScrollReveal } from "../../hooks/useScrollReveal"

interface ServiceCardProps {
  service: Service
  index: number
}

const iconMap: Record<string, ReactNode> = {
  web: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  sistema: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="2" x2="9" y2="4" />
      <line x1="15" y1="2" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="22" />
      <line x1="15" y1="20" x2="15" y2="22" />
    </svg>
  ),
  consultoria: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const { ref, isVisible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`rounded-md border bg-neutral-50 dark:bg-neutral-100 p-6 sm:p-8 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${
        service.destacado
          ? "border-accent-400/50 shadow-lg"
          : "border-neutral-300/50 shadow-md hover:shadow-lg"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        className={`w-14 h-14 rounded-lg flex items-center justify-center mb-5 ${
          service.destacado
            ? "bg-primary-700 text-white"
            : "bg-primary-700/10 text-primary-700"
        }`}
      >
        {iconMap[service.icono] ?? iconMap.web}
      </div>
      <h3 className="font-heading font-semibold text-lg text-primary-900 mb-2">
        {service.titulo}
      </h3>
      <p className="text-sm text-neutral-700 leading-relaxed">
        {service.descripcion}
      </p>
    </div>
  )
}