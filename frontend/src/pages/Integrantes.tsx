import { useScrollReveal } from "../hooks/useScrollReveal"
import { equipo } from "../data/equipo"
import { TeamCard } from "../components/sections/TeamCard"

export function Integrantes() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="py-24 sm:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-accent-400 font-accent tracking-[0.2em] text-sm uppercase">
            Equipo
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary-900 leading-tight">
            Conocé al equipo
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-700 max-w-xl mx-auto leading-relaxed">
            Detrás de cada proyecto hay personas comprometidas con la calidad
            y la innovación.
          </p>
        </div>

        <div
          ref={ref}
          className={`grid sm:grid-cols-2 gap-8 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {equipo.map((miembro, index) => (
            <TeamCard key={miembro.nombre} member={miembro} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
