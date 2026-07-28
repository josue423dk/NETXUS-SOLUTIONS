---
name: frontend-design
description: Genera componentes UI responsivos y profesionales, evita el "AI slop" con criterio de diseño
category: design
tags: [ui, design, responsive, tailwind, accessibility]
---

# Frontend Design Skill

Esta skill enseña al agente sobre espaciado, teoría del color, puntos de ruptura responsivos y tiempos de animación para generar interfaces web que lucen terminadas, no como un proyecto de hackatón.

## Principios de Diseño

### Sistema de Espaciado (8px grid)
- Usar múltiplos de 8px: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128
- Padding de botones: 12px 24px
- Padding de cards: 24px mobile / 32px desktop
- Gap entre elementos: 16-24px
- Separación entre secciones: 64px mobile / 96-128px desktop

### Teoría del Color
- **Texto sobre fondo claro:** usar `primary-700` (#0F4C4C) o más oscuro, o `neutral-700`/`neutral-900`
- **Texto sobre fondo oscuro:** usar `neutral-900` (#FFFFFF) o `neutral-700` (#B0B7C3)
- **`accent-400` (#2DD4BF)** es solo para fondos decorativos, badges y gradientes
- **Contraste AA/AAA:** verificar siempre el contraste de texto
- **Paleta oficial:** Teal/verde azulado (Variante 2)

### Puntos de Ruptura (mobile-first)
| Nombre | Ancho mínimo | Contenedor máximo |
|--------|-------------|-------------------|
| Base   | 0px         | 100% (16px padding) |
| sm     | 640px       | 100% (32px padding) |
| md     | 1024px      | 1120px            |
| lg     | 1280px      | 1200px            |

### Tipografía
- **Títulos:** Neco (fuente local, `@font-face`)
- **Cuerpo:** Switzer (fuente local, `@font-face`)
- **Acento:** Clash Display (fuente local, `@font-face`)

| Token    | Mobile | Desktop | Peso | Line-height | Uso                     |
|----------|--------|---------|------|-------------|-------------------------|
| display  | 32px   | 56px    | 700  | 1.1         | Hero H1                 |
| h1       | 28px   | 40px    | 600  | 1.15        | Títulos de sección      |
| h2       | 22px   | 28px    | 600  | 1.2         | Subtítulos de sección   |
| h3       | 18px   | 20px    | 500  | 1.3         | Títulos de card         |
| body-lg  | 17px   | 18px    | 400  | 1.6         | Intro/lead              |
| body     | 15px   | 16px    | 400  | 1.6         | Texto general           |
| small    | 13px   | 13px    | 400  | 1.5         | Labels, captions, footer|

### Radios de Borde
| Token       | Valor  | Uso                          |
|-------------|--------|------------------------------|
| radius-sm   | 8px    | Inputs, botones              |
| radius-md   | 16px   | Cards                        |
| radius-lg   | 24px   | Imágenes hero, contenedores  |
| radius-full | 999px  | Badges, pills, avatar        |

### Sombras
| Token     | Valor                          | Uso                              |
|-----------|--------------------------------|----------------------------------|
| shadow-sm | `0 1px 2px rgba(10,46,48,0.06)` | Inputs, botones en reposo       |
| shadow-md | `0 4px 12px rgba(10,46,48,0.08)` | Cards en reposo                |
| shadow-lg | `0 12px 32px rgba(10,46,48,0.12)` | Cards hover, dropdowns, modal |

### Tiempos de Animación
- **Micro-interacciones:** 150-200ms (ease-out)
- **Transiciones de página:** 300ms (ease-in-out)
- **Animaciones de entrada:** 600ms (ease-out con stagger)
- **Hover de cards:** 250ms (ease-out)

## Buenas Prácticas

1. **Mobile-first siempre:** Escribir primero estilos base (mobile) y luego breakpoints sm, md, lg
2. **Accesibilidad:** HTML semántico, `alt` en imágenes, `aria-*` donde corresponda, foco visible
3. **Componentes tipados:** Todo componente en `.tsx` con props tipadas explícitamente (sin `any`)
4. **Evitar AI slop:** No usar colores decorativos como texto principal, evitar sombras innecesarias, mantener consistencia visual

## Checklist de Calidad de UI

- [ ] ¿Los componentes usan tokens del Design System (colores, tipografía, espaciado, radios, sombras)?
- [ ] ¿El diseño es mobile-first y responde en sm, md, lg?
- [ ] ¿Cumple contraste de accesibilidad (texto oscuro sobre fondos claros)?
- [ ] ¿Los componentes están tipados y sin `any`?
- [ ] ¿Los enlaces externos usan `rel="noopener noreferrer"`?
