import type { Plan } from "../../types"
import { useScrollReveal } from "../../hooks/useScrollReveal"

interface PricingCardProps {
  plan: Plan
}

export function PricingCard({ plan }: PricingCardProps) {
  const { ref, isVisible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`
        p-1.5 rounded-[20px] bg-black/[0.03] dark:bg-white/[0.03]
        transition-all duration-700 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
    >
      <div
        className={`relative rounded-[14px] border-2 overflow-hidden bg-neutral-50 dark:bg-neutral-100 ${
          plan.destacado ? "border-accent-400 dark:border-primary-500 shadow-lg" : "border-neutral-300/50 shadow-md"
        }`}
      >
        <div className="p-6 sm:p-8">
          <h3 className="font-heading font-semibold text-xl text-primary-900 dark:text-neutral-900">
            {plan.nombre}
          </h3>

          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-sm text-neutral-700 dark:text-neutral-700">{plan.moneda}</span>
            <span className="text-4xl sm:text-5xl font-heading font-bold text-primary-700 dark:text-primary-700">
              ${plan.precio.toLocaleString("es-AR")}
            </span>
            <span className="text-sm text-neutral-700 dark:text-neutral-500">/ {plan.precioPeriodo}</span>
          </div>

          <p className="mt-4 text-sm text-neutral-700 dark:text-neutral-700 leading-relaxed">
            {plan.descripción}
          </p>

          <ul className="mt-6 space-y-3">
            {plan.features.map((feature) => (
              <li key={feature.label} className="flex items-start gap-2.5">
                {feature.included ? (
                  <svg
                    className="w-5 h-5 text-success flex-shrink-0 mt-0.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-neutral-500 dark:text-neutral-500 flex-shrink-0 mt-0.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <span
                  className={`text-sm ${
                    feature.included
                      ? "text-neutral-900 dark:text-neutral-900"
                      : "text-neutral-500 dark:text-neutral-500 line-through"
                  }`}
                >
                  {feature.label}
                </span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            aria-label={`Seleccionar plan ${plan.nombre}`}
            className={`
              mt-8 w-full py-3 px-6 rounded-lg font-semibold text-sm
              transition-all active:scale-[0.98] will-change-transform
              ${
                plan.destacado
                  ? "bg-primary-700 text-white hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-700/50"
                  : "bg-transparent border-2 border-primary-700 text-primary-700 hover:bg-primary-700/10 focus:outline-none focus:ring-2 focus:ring-primary-700/30"
              }
            `}
          >
            {plan.ctaLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
