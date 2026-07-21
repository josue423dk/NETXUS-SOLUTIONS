interface NavbarProps {
  brand?: string
}

const NAV_LINKS: { label: string; href: string }[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Trabajos', href: '#trabajos' },
  { label: 'Planes', href: '#planes' },
  { label: 'Contacto', href: '#contacto' },
]

export function Navbar({ brand = 'Netxus' }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-gray-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#inicio" className="text-xl font-bold tracking-tight text-white">
          {brand}
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contacto"
          className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
        >
          Cotizar
        </a>
      </div>
    </nav>
  )
}
