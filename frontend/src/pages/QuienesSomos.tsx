import { servicios } from "../data/servicios"
import { ServiceCard } from "../components/sections/ServiceCard"
import { SectionHeader } from "../components/ui/SectionHeader"

export function QuienesSomos() {
  return (
    <>
      <section className="py-24 sm:py-28 px-4">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            overline="Quiénes somos"
            title="Hacemos realidad tus ideas"
            description="En MONRU UX creemos que el software de calidad nace de equipos chicos, enfocados y con altos estándares técnicos. Trabajamos codo a codo con nuestros clientes para transformar conceptos en productos digitales escalables, seguros y con una experiencia de usuario cuidada al detalle."
          />
          <p className="mt-4 text-base sm:text-lg text-neutral-700 leading-relaxed max-w-2xl mx-auto">
            Nuestro enfoque combina craftsmanship en el código con diseño
            centrado en el usuario, priorizando rendimiento, accesibilidad
            y mantenibilidad en cada proyecto.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-neutral-100/50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary-900">
              Nuestros servicios
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicios.map((s, i) => (
              <ServiceCard key={s.titulo} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary-900">
            Metodología
          </h2>
          <div className="mt-10 grid sm:grid-cols-3 gap-8 text-left">
            {[
              {
                paso: "01",
                titulo: "Descubrimiento",
                desc: "Entendemos tu negocio, objetivos y usuarios para definir el alcance del proyecto.",
              },
              {
                paso: "02",
                titulo: "Iteración",
                desc: "Desarrollamos en ciclos cortos con feedback constante. Entregas frecuentes de valor.",
              },
              {
                paso: "03",
                titulo: "Entrega",
                desc: "Desplegamos con CI/CD, tests automatizados y documentación. Soporte post-lanzamiento.",
              },
            ].map((item) => (
              <div key={item.paso}>
                <span className="text-4xl font-heading font-bold text-accent-400/60">
                  {item.paso}
                </span>
                <h3 className="mt-2 font-heading font-semibold text-primary-900">
                  {item.titulo}
                </h3>
                <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}