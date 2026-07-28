import { HashLink } from "../ui/HashLink"

export function Hero() {
  return (
    <section className="relative min-h-screen z-10 flex items-center px-4 sm:px-6">
      <div className="w-full lg:max-w-2xl pt-16 lg:pt-20 lg:ml-[8%] xl:ml-[10%]">
        <span
          className="inline-block text-white/90 dark:text-primary-500 font-accent tracking-[0.2em] text-sm sm:text-base lg:text-lg"
          style={{ textShadow: "var(--shadow-text-sm)" }}
        >
          CONSULTORÍA EN DESARROLLO DE SOFTWARE
        </span>

        <h1
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold mt-6 text-white leading-[1.1]"
          style={{ textShadow: "var(--shadow-text-md)" }}
        >
          Transformar ideas en{" "}
          <span className="hero-animated-text animate-back-in-up">productos digitales</span>
        </h1>

        <p
          className="mt-8 text-white/90 text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-xl"
          style={{ textShadow: "var(--shadow-text-lg)" }}
        >
          Creamos soluciones digitales escalables, intuitivas y optimizadas.
          Priorizamos la calidad del código y la experiencia de usuario.
        </p>

        <div className="flex flex-wrap gap-4 sm:gap-5 mt-10">
          <HashLink
            href="#planes"
            className="inline-flex items-center px-7 sm:px-8 py-3 sm:py-4 bg-primary-700 text-white font-semibold rounded-lg text-base sm:text-lg hover:opacity-90 active:scale-[0.98] transition-all will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Empezá tu proyecto
          </HashLink>
          <HashLink
            href="#trabajos"
            className="inline-flex items-center gap-2 px-7 sm:px-8 py-3 sm:py-4 border-2 border-white/80 text-white font-semibold rounded-lg text-base sm:text-lg hover:bg-white/10 active:scale-[0.98] transition-all will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Ver servicios
            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </HashLink>
        </div>
      </div>
    </section>
  )
}
