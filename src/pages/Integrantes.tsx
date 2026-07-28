import { useScrollReveal } from "../hooks/useScrollReveal"

const equipo = [
  {
    nombre: "Alex Josue Montana",
    rol: "Tech Lead",
    descripcion:
      "Arquitecto de software especializado en sistemas escalables. Define la estrategia técnica y garantiza la calidad del código.",
  },
  {
    nombre: "Ivan Rufino",
    rol: "Product & Design Lead",
    descripcion:
      "Diseñador de producto con enfoque en UX research y diseño de interfaces. Traduce necesidades de negocio en experiencias digitales.",
  },
]

export function Integrantes() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="py-24 sm:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-accent-400 font-semibold tracking-[0.2em] text-sm uppercase">
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
          {equipo.map((miembro) => (
            <div
              key={miembro.nombre}
              className="rounded-md border border-neutral-300/50 shadow-md p-6 sm:p-8 bg-neutral-50"
            >
              <div className="w-16 h-16 rounded-full bg-primary-700/10 flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-primary-700"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h2 className="font-heading font-semibold text-xl text-primary-900">
                {miembro.nombre}
              </h2>
              <span className="inline-block mt-1 text-xs font-semibold tracking-wider uppercase text-accent-400">
                {miembro.rol}
              </span>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                {miembro.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}