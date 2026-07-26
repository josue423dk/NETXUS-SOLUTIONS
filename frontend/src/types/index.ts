export interface NavItem {
  label: string
  href: string
}

export type CategoriaProyecto =
  | "desarrollo-web"
  | "apps-moviles"
  | "sistemas-a-medida"
  | "consultoria"

export interface Project {
  _id?: string
  nombre: string
  descripción: string
  imagen?: string
  imagenDark?: string
  tags?: string[]
  url?: string
  categoria?: CategoriaProyecto
  destacado?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface PlanFeature {
  label: string
  included: boolean
}

export interface Plan {
  id: string
  nombre: string
  precio: number
  precioPeriodo: string
  moneda: string
  descripción: string
  features: PlanFeature[]
  badge?: string
  destacado: boolean
  ctaLabel: string
}
