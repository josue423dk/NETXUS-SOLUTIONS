import { useScrollReveal } from "../hooks/useScrollReveal"
import { equipo } from "../data/equipo"
import { TeamCard } from "../components/sections/TeamCard"
import { SectionHeader } from "../components/ui/SectionHeader"

export function Integrantes() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="py-24 sm:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          overline="Equipo"
          title="Conocé al equipo"
          description="Detrás de cada proyecto hay personas comprometidas con la calidad y la innovación."
          as="h1"
          className="mb-14"
        />

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
