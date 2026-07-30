import { planes } from "../../data/planes"

const featuredPlans = planes.slice(0, 3)

export function HeroPlanCards() {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl">
      {featuredPlans.map((plan) => (
        <div
          key={plan.id}
          className={`rounded-lg backdrop-blur-md border p-4 transition-all duration-300 hover:scale-[1.02] ${
            plan.destacado
              ? "bg-primary-700/30 border-primary-500/50"
              : "bg-white/10 border-white/20"
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-accent tracking-wider text-white/60 uppercase">
              {plan.nombre}
            </p>
            {plan.badge && (
              <span className="text-[10px] font-accent font-semibold uppercase tracking-wider text-accent-400 dark:text-primary-500">
                {plan.badge}
              </span>
            )}
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl font-heading font-bold mt-2 text-white">
            ${plan.precio.toLocaleString("es-AR")}
            <span className="text-xs font-body text-white/50 font-normal">/{plan.precioPeriodo}</span>
          </p>
          <p className="text-xs text-white/60 mt-1.5 leading-relaxed line-clamp-2">
            {plan.descripcion}
          </p>
        </div>
      ))}
    </div>
  )
}
