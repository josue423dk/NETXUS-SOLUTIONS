import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Check, Star } from "lucide-react"
import confetti from "canvas-confetti"
import NumberFlow from "@number-flow/react"
import { planes } from "../../data/planes"
import { useMediaQuery } from "../../hooks/use-media-query"
import { SectionHeader } from "../ui/SectionHeader"

interface PlanData {
  name: string
  price: string
  yearlyPrice: string
  period: string
  features: string[]
  description: string
  buttonText: string
  isPopular: boolean
}

const pricingPlans: PlanData[] = planes.map((plan) => ({
  name: plan.nombre,
  price: String(plan.precio),
  yearlyPrice: String(Math.round(plan.precio * 0.8)),
  period: plan.precioPeriodo,
  features: plan.features.filter((f) => f.included).map((f) => f.label),
  description: plan.descripción,
  buttonText: plan.ctaLabel,
  isPopular: plan.destacado,
}))

export function PricingSection() {
  const [isMonthly, setIsMonthly] = useState(true)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const switchRef = useRef<HTMLButtonElement>(null)

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked)
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: ["#0F4C4C", "#2DD4BF", "#1C7C7E", "#C7D3D3"],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      })
    }
  }

  return (
    <section id="planes" className="py-16 sm:py-20 lg:py-28 bg-neutral-50 dark:bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          overline="Nuestros planes"
          title="Elige tu plan"
          description="Soluciones flexibles para cada etapa de tu negocio. Todos nuestros planes incluyen las mejores prácticas de desarrollo y soporte dedicado."
          as="h2"
          className="mb-10 sm:mb-14"
        />

        <div className="flex justify-center items-center mb-10 gap-3">
          <span className={`text-sm font-semibold ${isMonthly ? "text-primary-900" : "text-neutral-500"}`}>
            Mensual
          </span>
          <button
            ref={switchRef}
            role="switch"
            aria-checked={!isMonthly}
            onClick={() => handleToggle(!isMonthly)}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors
              ${!isMonthly ? "bg-primary-700" : "bg-neutral-300"}
            `}
          >
            <span
              className={`
                inline-block h-5 w-5 rounded-full bg-white shadow-md transition-transform
                ${!isMonthly ? "translate-x-[22px]" : "translate-x-[2px]"}
              `}
            />
          </button>
          <span className={`text-sm font-semibold ${!isMonthly ? "text-primary-900" : "text-neutral-500"}`}>
            Anual <span className="text-primary-700">(Ahorra 20%)</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={
                isDesktop
                  ? {
                      y: plan.isPopular ? -20 : 0,
                      opacity: 1,
                      x: index === 2 ? -30 : index === 0 ? 30 : 0,
                      scale: index === 0 || index === 2 ? 0.94 : 1.0,
                    }
                  : { opacity: 1, y: 0 }
              }
              viewport={{ once: true }}
              transition={{
                duration: 1.6,
                type: "spring",
                stiffness: 100,
                damping: 30,
                delay: 0.4,
                opacity: { duration: 0.5 },
              }}
              className={`
                relative rounded-2xl border p-6 text-center flex flex-col
                bg-neutral-50 dark:bg-neutral-100
                ${plan.isPopular ? "border-primary-700 border-2" : "border-neutral-300/50"}
                ${!plan.isPopular ? "mt-5" : ""}
                ${index === 0 || index === 2 ? "z-0" : "z-10"}
              `}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-primary-700 py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center">
                  <Star className="text-white h-4 w-4 fill-current" />
                  <span className="text-white ml-1 font-heading text-xs font-semibold">
                    Popular
                  </span>
                </div>
              )}

              <div className="flex-1 flex flex-col">
                <p className="text-base font-heading font-semibold text-neutral-700">
                  {plan.name}
                </p>

                <div className="mt-6 flex items-center justify-center gap-x-2">
                  <span className="text-5xl font-heading font-bold tracking-tight text-primary-900">
                    <NumberFlow
                      value={isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)}
                      prefix="$"
                      transformTiming={{
                        duration: 500,
                        easing: "ease-out",
                      }}
                      willChange
                      className="tabular-nums"
                    />
                  </span>
                  <span className="text-sm font-heading font-semibold tracking-wide text-neutral-700">
                    / {plan.period}
                  </span>
                </div>

                <p className="text-xs leading-5 text-neutral-500 mt-1">
                  {isMonthly ? "facturado mensual" : "facturado anual"}
                </p>

                <ul className="mt-5 gap-2 flex flex-col">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary-700 mt-1 flex-shrink-0" />
                      <span className="text-left text-sm text-neutral-900">{feature}</span>
                    </li>
                  ))}
                </ul>

                <hr className="w-full my-4 border-neutral-300/50" />

                <button
                  type="button"
                  className={`
                    w-full py-3 px-6 rounded-lg font-heading font-semibold text-sm
                    transition-all duration-300
                    ${plan.isPopular
                      ? "bg-primary-700 text-white hover:bg-primary-500"
                      : "bg-transparent border-2 border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white"
                    }
                  `}
                >
                  {plan.buttonText}
                </button>

                <p className="mt-4 text-xs leading-5 text-neutral-500">
                  {plan.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
