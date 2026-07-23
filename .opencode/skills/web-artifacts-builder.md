---
name: web-artifacts-builder
description: Construye artifacts HTML complejos con React + TypeScript + Tailwind + shadcn/ui
category: design
tags: [react, tailwind, shadcn, artifacts, html]
---

# Web Artifacts Builder Skill

Esta skill está diseñada para construir artifacts HTML multi-componente complejos para claude.ai y OpenCode, usando React 18 + TypeScript + Tailwind CSS + shadcn/ui. No es para artifacts simples de un solo archivo JSX; está diseñada para aplicaciones con gestión de estado, routing y componentes de librería.

## Stack Técnico

| Herramienta         | Versión  | Notas                                    |
|---------------------|----------|------------------------------------------|
| React               | 19.2+    | Auto-instalado                           |
| TypeScript          | 5.7+     | Tipado estricto                          |
| Tailwind CSS        | v4       | Directiva `@theme` en CSS                |
| shadcn/ui           | latest   | Registry-based                           |
| Framer Motion       | 12+      | Motor primario de animación              |

## Estructura de Artifacts

### 1. Configuración Inicial
```tsx
// Importaciones base
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
```

### 2. Componentes de shadcn/ui Disponibles
- **Layout:** Card, Container, Grid, Flex, Stack
- **Form:** Input, Button, Label, Select, Checkbox, RadioGroup
- **Data Display:** Badge, Avatar, Table, Tooltip, Progress
- **Navigation:** Breadcrumb, Pagination, Tabs, NavigationMenu
- **Feedback:** Alert, Toast, Dialog, Sheet, Popover
- **Overlays:** Modal, Drawer, Popover, Tooltip

### 3. Patrones de Gestión de Estado
```tsx
// Estado simple
const [state, setState] = useState<StateType>(initialValue)

// Estado complejo con reducer
const [state, dispatch] = useReducer(reducer, initialState)

// Estado global con contexto
const Context = createContext<ContextType | undefined>(undefined)
```

### 4. Animaciones con Framer Motion
```tsx
import { motion } from 'framer-motion'

// Animación de entrada
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>

// Animación de hover
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
```

## Flujo de Construcción

### Fase 1: Análisis de Requisitos
1. Identificar componentes necesarios
2. Definir estructura de datos
3. Planificar estados y transiciones

### Fase 2: Setup de Componentes
1. Crear componentes base con shadcn/ui
2. Aplicar tokens del Design System
3. Configurar responsive breakpoints

### Fase 3: Implementación
1. Construir componentes principales
2. Añadir gestión de estado
3. Implementar animaciones

### Fase 4: QA
1. Verificar tipado TypeScript
2. Comprobar responsive design
3. Validar accesibilidad (a11y)

## Componentes Base del Proyecto

### ButtonPrimary
```tsx
interface ButtonPrimaryProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}
```

### Card
```tsx
interface CardProps {
  title: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
}
```

## Buenas Prácticas

1. **TypeScript estricto:** Nunca usar `any`, tipar todas las props
2. **Mobile-first:** Escribir primero estilos base y luego breakpoints
3. **Accesibilidad:** HTML semántico, `aria-*`, foco visible
4. **Tokens del Design System:** Usar siempre tokens definidos en `frontend/src/styles/index.css`
5. **Componentes reutilizables:** Extraer lógica común en hooks o componentes base
