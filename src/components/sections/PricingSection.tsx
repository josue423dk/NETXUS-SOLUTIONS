import { useState, useRef } from "react"
import { Check, Star } from "lucide-react"
import confetti from "canvas-confetti"
import NumberFlow from "@number-flow/react"
import { planes } from "../../data/planes"
import { SectionHeader } from "../ui/SectionHeader"
import { useScrollReveal } from "../../hooks/useScrollReveal"

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
  description: plan.descripcion,
  buttonText: plan.ctaLabel,
  isPopular: plan.destacado,
}))

function PlanCard({ plan, index, isMonthly }: { plan: PlanData; index: number; isMonthly: boolean }) {
  const { ref, isVisible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`
        relative rounded-2xl border text-center flex flex-col
        bg-neutral-50 dark:bg-neutral-100
        ${plan.isPopular ? "border-primary-700 border-2 z-10" : "border-neutral-300/50 z-0"}
        ${!plan.isPopular ? "mt-5" : ""}
        p-6
        transition-all duration-700 ease-out
        ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8"}
        ${plan.isPopular && isVisible ? "md:scale-105" : ""}
      `}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {plan.isPopular && (
        <div className="absolute -top-0.5 -right-0.5 bg-primary-700 py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center">
          <Star className="text-white h-4 w-4 fill-current" />
          <span className="text-white ml-1 font-heading text-xs font-semibold">Popular</span>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <p className="text-sm sm:text-base font-heading font-semibold text-neutral-700">{plan.name}</p>

        <div className="mt-4 sm:mt-6 flex items-center justify-center gap-x-2">
          <span className="text-3xl sm:text-5xl font-heading font-bold tracking-tight text-primary-900">
            <NumberFlow
              value={isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)}
              prefix="$"
              transformTiming={{ duration: 500, easing: "ease-out" }}
              willChange
              className="tabular-nums"
            />
          </span>
          <span className="text-xs sm:text-sm font-heading font-semibold tracking-wide text-neutral-700">
            / {plan.period}
          </span>
        </div>

        <p className="text-xs leading-5 text-neutral-500 mt-1">
          {isMonthly ? "facturado mensual" : "facturado anual"}
        </p>

        <ul className="mt-3 sm:mt-5 gap-1.5 sm:gap-2 flex flex-col">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-1.5 sm:gap-2 min-w-0">
              <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary-700 mt-0.5 flex-shrink-0" />
              <span className="text-left text-xs sm:text-sm text-neutral-900 break-words [word-break:break-word]">{feature}</span>
            </li>
          ))}
        </ul>

        <div>
          <hr className="w-full my-3 sm:my-4 border-neutral-300/50" />
          <p className="text-xs leading-5 text-neutral-500">{plan.description}</p>
          <button
            type="button"
            className={`
              w-full mt-3 sm:mt-4 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-heading font-semibold text-xs sm:text-sm
              transition-all duration-300
              ${plan.isPopular
                ? "bg-primary-700 text-white hover:bg-primary-500"
                : "bg-transparent border-2 border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white"
              }
            `}
          >
            {plan.buttonText}
          </button>
        </div>
      </div>
    </div>
  )
}

function PlanCardMobile({ plan, index, isMonthly }: { plan: PlanData; index: number; isMonthly: boolean }) {
  const { ref, isVisible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`
        relative rounded-2xl border
        bg-neutral-50 dark:bg-neutral-100
        ${plan.isPopular ? "border-primary-700 border-2" : "border-neutral-300/50 shadow-sm"}
        transition-all duration-500 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {plan.isPopular && (
        <div className="absolute -top-3 left-4 bg-primary-700 py-1 px-3 rounded-full flex items-center gap-1.5 z-10">
          <Star className="text-white h-3 w-3 fill-current" />
          <span className="text-white font-heading text-xs font-semibold tracking-wide">Popular</span>
        </div>
      )}

      <div className="p-5">
        <p className="font-heading font-semibold text-base text-neutral-700">{plan.name}</p>

        <div className="mt-4 flex items-baseline gap-x-1.5">
          <span className="text-4xl font-heading font-bold tracking-tight text-primary-900">
            <NumberFlow
              value={isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)}
              prefix="$"
              transformTiming={{ duration: 500, easing: "ease-out" }}
              willChange
              className="tabular-nums"
            />
          </span>
          <span className="text-sm font-heading font-semibold tracking-wide text-neutral-700">/ {plan.period}</span>
        </div>
        <p className="text-xs leading-5 text-neutral-500 mt-1">{isMonthly ? "facturado mensual" : "facturado anual"}</p>

        <hr className="w-full my-4 border-neutral-300/50" />

        <ul className="space-y-2.5">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 min-w-0">
              <Check className="h-4 w-4 text-primary-700 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-neutral-900 leading-relaxed break-words [word-break:break-word]">{feature}</span>
            </li>
          ))}
        </ul>

        <p className="text-xs leading-5 text-neutral-500 mt-4">{plan.description}</p>

        <button
          type="button"
          className={`
            w-full mt-4 py-3.5 px-4 rounded-xl font-heading font-semibold text-sm
            transition-all duration-300 active:scale-[0.98]
            ${plan.isPopular
              ? "bg-primary-700 text-white hover:bg-primary-500 shadow-sm"
              : "bg-transparent border-2 border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white"
            }
          `}
        >
          {plan.buttonText}
        </button>
      </div>
    </div>
  )
}

export function PricingSection() {
  const [isMonthly, setIsMonthly] = useState(true)
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
        origin: { x: x / window.innerWidth, y: y / window.innerHeight },
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
    <section id="planes" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-neutral-50/70 dark:bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          overline="Nuestros planes"
          title="Elige tu plan"
          description="Soluciones flexibles para cada etapa de tu negocio. Todos nuestros planes incluyen las mejores prácticas de desarrollo y soporte dedicado."
          as="h2"
          className="mb-10 sm:mb-14"
        />

        <div className="flex justify-center items-center mb-10 gap-3">
          <span className={`text-sm font-semibold ${isMonthly ? "text-primary-900" : "text-neutral-500"}`}>Mensual</span>
          <button
            ref={switchRef}
            role="switch"
            aria-checked={!isMonthly}
            onClick={() => handleToggle(!isMonthly)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${!isMonthly ? "bg-primary-700" : "bg-neutral-300"}`}
          >
            <span className={`inline-block h-5 w-5 rounded-full bg-white shadow-md transition-transform ${!isMonthly ? "translate-x-[22px]" : "translate-x-[2px]"}`} />
          </button>
          <span className={`text-sm font-semibold ${!isMonthly ? "text-primary-900" : "text-neutral-500"}`}>
            Anual <span className="text-primary-700">(Ahorra 20%)</span>
          </span>
        </div>

        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, index) => (
            <PlanCard key={index} plan={plan} index={index} isMonthly={isMonthly} />
          ))}
        </div>

        <div className="md:hidden space-y-4">
          {pricingPlans.map((plan, index) => (
            <PlanCardMobile key={index} plan={plan} index={index} isMonthly={isMonthly} />
          ))}
        </div>
      </div>
    </section>
  )
}
