import { useState, useCallback } from "react"
import { planes, featureLabels, featureMatrix } from "../../data/planes"
import { PricingCard } from "./PricingCard"
import { useScrollReveal } from "../../hooks/useScrollReveal"
import { SectionHeader } from "../ui/SectionHeader"

export function PricingSection() {
  const [activePlanId, setActivePlanId] = useState(
    () => planes.find((p) => p.destacado)?.id ?? planes[1].id
  )
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()
  const { ref: tabsRef, isVisible: tabsVisible } = useScrollReveal()
  const { ref: tableRef, isVisible: tableVisible } = useScrollReveal()

  const activePlan = planes.find((p) => p.id === activePlanId) ?? planes[1]

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const currentIndex = planes.findIndex((p) => p.id === activePlanId)
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault()
        const nextIndex = (currentIndex + 1) % planes.length
        setActivePlanId(planes[nextIndex].id)
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault()
        const prevIndex = (currentIndex - 1 + planes.length) % planes.length
        setActivePlanId(planes[prevIndex].id)
      }
    },
    [activePlanId]
  )

  return (
    <section className="py-16 sm:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`
            transition-all duration-700 ease-out
            ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          <SectionHeader
            title="Elige tu plan"
            description="Soluciones flexibles para cada etapa de tu negocio. Todos nuestros planes incluyen las mejores prácticas de desarrollo y soporte dedicado."
            as="h2"
            className="mb-10 sm:mb-14"
          />
        </div>

        {/* Tabs */}
        <div
          ref={tabsRef}
          role="tablist"
          onKeyDown={handleKeyDown}
          className={`
            flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14
            transition-all duration-700 ease-out delay-100
            ${tabsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          {planes.map((plan) => (
            <button
              key={plan.id}
              id={`tab-${plan.id}`}
              role="tab"
              aria-selected={activePlanId === plan.id}
              aria-controls="tabpanel-plans"
              tabIndex={activePlanId === plan.id ? 0 : -1}
              onClick={() => setActivePlanId(plan.id)}
              className={`
                relative px-5 py-2.5 rounded-lg text-sm font-semibold
                transition-all duration-200
                ${
                  activePlanId === plan.id
                    ? "bg-primary-700 text-white shadow-md"
                    : "bg-neutral-50 dark:bg-neutral-100 text-neutral-500 dark:text-neutral-500 hover:bg-neutral-300/30 dark:hover:bg-neutral-300/50 border border-neutral-300/50 dark:border-neutral-300/50"
                }
              `}
            >
              {plan.nombre}
              {plan.destacado && (
                <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-accent-400 dark:bg-primary-500 align-middle" />
              )}
            </button>
          ))}
        </div>

        {/* Card del plan seleccionado */}
        <div role="tabpanel" id="tabpanel-plans" aria-labelledby={`tab-${activePlan.id}`} className="max-w-lg mx-auto">
          <PricingCard plan={activePlan} key={activePlan.id} />
        </div>

        {/* Tabla comparativa */}
        <div
          ref={tableRef}
          className={`
            mt-16 sm:mt-20
            transition-all duration-700 ease-out
            ${tableVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          <h3 className="text-center text-xl sm:text-2xl font-heading font-semibold text-primary-700 dark:text-neutral-900 mb-8 text-shadow">
            Comparar todos los planes
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-300/50">
                  <th className="text-left py-3 px-4 font-heading font-semibold text-primary-900 dark:text-neutral-900">
                    Característica
                  </th>
                  {planes.map((plan) => (
                    <th
                      key={plan.id}
                      className={`
                        text-center py-3 px-4 font-heading font-semibold
                        ${
                          plan.destacado
                            ? "text-primary-700 dark:text-primary-700"
                            : "text-neutral-900 dark:text-neutral-900"
                        }
                      `}
                    >
                      {plan.nombre}
                      {plan.destacado && (
                        <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-accent-400 dark:bg-primary-500 align-middle" />
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureLabels.map((label) => (
                  <tr
                    key={label}
                    className="border-b border-neutral-300/30 hover:bg-neutral-100/50 dark:hover:bg-neutral-100/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-neutral-700 dark:text-neutral-700">
                      {label}
                    </td>
                    {featureMatrix[label]?.map((included, i) => (
                      <td key={i} className="py-3 px-4 text-center">
                        {included ? (
                          <svg
                            className="w-5 h-5 text-success mx-auto"
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
                            className="w-5 h-5 text-neutral-500/50 dark:text-neutral-500/50 mx-auto"
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
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
