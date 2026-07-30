---
name: shadcn-ui
description: Conocimiento profundo de shadcn/ui components y patterns
category: design
tags: [shadcn, components, react, ui-library]
---

# shadcn/ui Skill

Esta skill proporciona conocimiento profundo de shadcn/ui, la librería de componentes React basada en Radix UI y Tailwind CSS.

## Instalacion

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input
```

## Componentes Disponibles

### Layout
- Container, Grid, Flex, Stack

### Form
- Input, Button (variantes: default, destructive, outline, secondary, ghost, link), Label, Select, Checkbox, Radio-group, Switch, Textarea

### Data Display
- Badge, Avatar, Table, Card, Tooltip, Progress, Separator

### Navigation
- Breadcrumb, Pagination, Tabs, NavigationMenu

### Feedback
- Alert, Toast, Dialog, Sheet, Popover

## Patrones de Uso

### Button con variantes
```tsx
<Button variant="default">Primary</Button>
<Button variant="outline">Secondary</Button>
<Button variant="ghost">Ghost</Button>
```

### Card estructurado
```tsx
<Card>
  <CardHeader>
    <CardTitle>Titulo</CardTitle>
  </CardHeader>
  <CardContent>Contenido</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

## Configuracion del Proyecto

El proyecto usa shadcn/ui con los siguientes componentes ya instalados:
- Button (ButtonPrimary, ButtonSecondary)
- Card (ServiceCard, PortfolioCard)
- Input (ContactForm)
- Badge (para estados)

## Tokens del Design System

Los componentes de shadcn/ui deben usar los tokens definidos en `frontend/src/styles/index.css`:
- primary-900, primary-700, primary-500 para colores principales
- neutral-900, neutral-700, neutral-500 para texto
- accent-400 para acentos decorativos
- radius-sm (8px), radius-md (16px), radius-full (999px) para bordes
