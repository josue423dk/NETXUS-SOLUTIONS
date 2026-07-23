import { Logo } from "../ui/Logo"

const navLinks = [
  { label: "Trabajos", href: "/trabajos" },
  { label: "Cotización", href: "/cotizacion" },
  { label: "Planes", href: "/planes" },
  { label: "Quiénes somos", href: "/quienes-somos" },
  { label: "Integrantes", href: "/integrantes" },
  { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
]

const serviceLinks = [
  { label: "Desarrollo Web", href: "/cotizacion" },
  { label: "Apps Móviles", href: "/cotizacion" },
  { label: "Sistemas a Medida", href: "/cotizacion" },
  { label: "Consultoría TI", href: "/cotizacion" },
]

const legalLinks = [
  { label: "Términos y condiciones", href: "#" },
  { label: "Política de privacidad", href: "#" },
  { label: "Cookies", href: "#" },
]

const socialIcons = [
  {
    label: "WhatsApp",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:contacto@netxus.solutions",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 4l-10 8L2 4" />
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer className="relative border-t border-neutral-300/50 bg-neutral-50/60 dark:bg-neutral-50/60 backdrop-blur-xl overflow-hidden">
      <style>{`
        @keyframes footerMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .footer-marquee {
          animation: footerMarquee 100s linear infinite;
        }
      `}</style>
      <div className="absolute inset-x-0 top-0 bottom-28 lg:bottom-36 flex items-center justify-start overflow-hidden pointer-events-none select-none">
        <span
          className="footer-marquee text-[clamp(8rem,22vw,20rem)] font-heading font-bold leading-none whitespace-nowrap text-neutral-900/5 dark:text-neutral-900/5"
          style={{ WebkitTextStroke: "1px rgba(128,128,128,0.08)" }}
          aria-hidden="true"
        >
          <span>Netxus Solutions es una consultora de desarrollo de software enfocada en la creación de soluciones digitales de alto rendimiento.&nbsp;&nbsp;&nbsp;</span>
          <span>Netxus Solutions es una consultora de desarrollo de software enfocada en la creación de soluciones digitales de alto rendimiento.&nbsp;&nbsp;&nbsp;</span>
        </span>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/[0.03] via-accent-400/[0.03] to-primary-500/[0.03] dark:from-primary-900/[0.05] dark:via-accent-400/[0.05] dark:to-primary-500/[0.05]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="col-span-2 lg:col-span-4">
            <Logo />
            <p className="hidden lg:block mt-3 text-sm text-neutral-700 leading-relaxed max-w-xs">
              Transformamos ideas en soluciones digitales. Desarrollo de software a medida
              con tecnología de vanguardia.
            </p>
            <div className="mt-4">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-700/10 text-primary-700 text-xs font-medium border border-primary-700/20">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4l-10 8L2 4" />
                </svg>
                contacto@netxus.solutions
              </span>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-2">
            <h3 className="text-xs font-heading font-semibold text-primary-900 mb-3 tracking-wider uppercase">Navegación</h3>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-neutral-700 hover:text-primary-700 transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-heading font-semibold text-primary-900 mb-3 tracking-wider uppercase">Servicios</h3>
            <ul className="space-y-2">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-neutral-700 hover:text-primary-700 transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-heading font-semibold text-primary-900 mb-3 tracking-wider uppercase">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-neutral-700 hover:text-primary-700 transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-2">
            <h3 className="text-xs font-heading font-semibold text-primary-900 mb-3 tracking-wider uppercase">Newsletter</h3>
            <p className="text-sm text-neutral-700 mb-3">
              Recibí novedades y contenido exclusivo.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                placeholder="tu@email.com"
                aria-label="Tu correo electrónico"
                className="w-full px-4 py-2.5 text-sm rounded-lg bg-neutral-100 border border-neutral-300 text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-700/30 focus:border-primary-700 transition-all"
              />
              <button
                type="submit"
                className="w-full px-4 py-2.5 text-sm font-semibold rounded-lg bg-primary-700 text-white hover:bg-primary-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-700/50"
              >
                Suscribir
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-neutral-300/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} Netxus Solutions. Todos los derechos reservados.
          </p>
          <div className="flex gap-2.5">
            {socialIcons.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full bg-neutral-100/50 border border-neutral-300/50 flex items-center justify-center text-neutral-700 hover:text-primary-700 hover:border-primary-700 hover:bg-primary-700/10 transition-all backdrop-blur-sm"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
