export interface NavItem {
  label: string
  href: string
}

export interface Project {
  _id?: string
  nombre: string
  descripción: string
  imagen?: string
  tags?: string[]
  createdAt?: string
  updatedAt?: string
}
