import { useState } from "react"
import { Link } from "react-router-dom"
import { Mail } from "lucide-react"
import { Logo } from "../ui/Logo"
import { navLinks } from "../../data/navigation"
import { TextHoverEffect, FooterBackgroundGradient } from "../ui/hover-footer"

const serviceLinks = [
  { label: "Desarrollo Web", href: "/cotizacion" },
  { label: "Apps Móviles", href: "/cotizacion" },
  { label: "Sistemas a Medida", href: "/cotizacion" },
  { label: "Consultoría TI", href: "/cotizacion" },
]

const legalLinks = [
  { label: "Términos y condiciones", href: "/terminos" },
  { label: "Política de privacidad", href: "/privacidad" },
  { label: "Cookies", href: "/cookies" },
]

const socialIcons = [
  {
    label: "WhatsApp",
    href: "https://wa.me/5491100000000",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/monru.ux",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/monru-ux",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/monru-ux",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:contacto@monru.ux",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 4l-10 8L2 4" />
      </svg>
    ),
  },
]

export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [honeypot, setHoneypot] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (honeypot) return
    if (email.trim()) {
      setSubscribed(true)
      setEmail("")
    }
  }

  return (
    <footer className="relative bg-neutral-50/80 dark:bg-neutral-50 overflow-hidden">
      <FooterBackgroundGradient />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 lg:gap-12 pb-10">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-sm text-neutral-700 leading-relaxed">
              Transformamos ideas en soluciones digitales. Desarrollo de software a medida
              con tecnología de vanguardia.
            </p>
            <div className="flex items-center gap-2 text-sm text-neutral-700">
              <Mail size={16} className="text-primary-700 flex-shrink-0" />
              <a href="mailto:contacto@monru.ux" className="hover:text-primary-700 transition-colors">
                contacto@monru.ux
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-primary-900 text-sm font-heading font-semibold mb-4 uppercase tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  {l.href.startsWith("#") ? (
                    <a href={l.href} className="text-sm text-neutral-700 hover:text-primary-700 transition-colors">
                      {l.label}
                    </a>
                  ) : (
                    <Link to={l.href} className="text-sm text-neutral-700 hover:text-primary-700 transition-colors">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-primary-900 text-sm font-heading font-semibold mb-4 uppercase tracking-wider">
              Servicios
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-sm text-neutral-700 hover:text-primary-700 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <h5 className="text-primary-900 text-xs font-heading font-semibold mb-3 uppercase tracking-wider">
                  Legal
                </h5>
                <ul className="space-y-2.5">
                  {legalLinks.map((l) => (
                    <li key={l.label}>
                      <Link to={l.href} className="text-sm text-neutral-700 hover:text-primary-700 transition-colors">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-primary-900 text-sm font-heading font-semibold mb-4 uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-sm text-neutral-700 mb-3">
              Recibí novedades y contenido exclusivo.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              {subscribed ? (
                <p className="text-sm text-success font-medium py-2.5">
                  ¡Gracias por suscribirte!
                </p>
              ) : (
                <>
                  <div aria-hidden="true" className="absolute opacity-0 pointer-events-none" tabIndex={-1}>
                    <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
                  </div>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Tu correo electrónico"
                    className="w-full px-4 py-2.5 text-sm rounded-lg bg-neutral-100 border border-neutral-300 text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-700/30 focus:border-primary-700 transition-all"
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-2.5 text-sm font-semibold rounded-lg bg-primary-700 text-white hover:bg-primary-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-700/50"
                  >
                    Suscribir
                  </button>
                </>
              )}
            </form>
          </div>
        </div>

        <hr className="border-neutral-300/50 my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} MONRU UX. Todos los derechos reservados.
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

        <div className="hidden lg:flex h-[30rem] -mt-52 -mb-36 justify-center">
          <TextHoverEffect text="MONRU UX" className="z-50" />
        </div>
      </div>
    </footer>
  )
}
