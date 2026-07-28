---
name: monru-design-tokens
description: Tokens de diseño oficiales de MONRU UX - Fuente de verdad adaptada de AGENTS.md sección 4
category: design
tags: [tokens, design-system, brand, colors, typography, spacing]
---

# MONRU UX Design Tokens

> **Este archivo es una adaptación de `AGENTS.md` sección 4.** Siempre verificar `AGENTS.md` como fuente de verdad principal.

---

## Paleta de Colores

### Tema Claro (light) — `data-theme="light"`

| Token | Hex | Uso |
|---|---|---|
| `primary-900` | `#0A2E30` | Texto principal, navbar, footer |
| `primary-700` | `#0F4C4C` | Botón primario, links, iconos activos |
| `primary-500` | `#1C7C7E` | Hover/pressed sobre elementos 700 |
| `accent-400` | `#2DD4BF` | Fondos de badges, gradiente hero, glow decorativo |
| `neutral-900` | `#16211F` | Texto principal alternativo |
| `neutral-700` | `#435151` | Texto secundario / párrafos largos |
| `neutral-500` | `#77898A` | Texto terciario, placeholders |
| `neutral-300` | `#C7D3D3` | Bordes, separadores |
| `neutral-100` | `#ECF1F1` | Fondos alternos de sección |
| `neutral-50` | `#F7FAFA` | Fondo de página |
| `success` | `#1E8E5A` | Confirmación de formulario |
| `warning` | `#92620A` | Validaciones, avisos |
| `error` | `#B3261E` | Errores de formulario |

### Tema Oscuro (dark) — `data-theme="dark"`

| Token | Hex | Uso |
|---|---|---|
| `primary-900` | `#FF6B00` | Texto principal, navbar, footer |
| `primary-700` | `#D45800` | Botón primario, links, iconos activos |
| `primary-500` | `#FF8C00` | Hover/pressed sobre elementos 700 |
| `accent-400` | `#FF8C00` | Fondos de badges, gradiente hero, glow decorativo |
| `neutral-900` | `#FFFFFF` | Texto principal alternativo |
| `neutral-700` | `#B0B7C3` | Texto secundario / párrafos largos |
| `neutral-500` | `#666666` | Texto terciario, placeholders |
| `neutral-300` | `#333333` | Bordes, separadores |
| `neutral-100` | `#1A1A1A` | Fondos alternos de sección |
| `neutral-50` | `#000000` | Fondo de página |
| `success` | `#4CAF50` | Confirmación de formulario |
| `warning` | `#FF9800` | Validaciones, avisos |
| `error` | `#EF5350` | Errores de formulario |

---

## Tokens de Logo y Toggle

### Tema Claro

| Token | Valor | Uso |
|---|---|---|
| `--logo-gradient` | `linear-gradient(180deg, #0F4C4C, #1C7C7E, #2DD4BF)` | Icono X del logo |
| `--logo-wordmark` | `#0A2E30` | Texto "MONR" y "UX" |
| `--logo-x-gradient` | `linear-gradient(90deg, #1C7C7E, #2DD4BF)` | Letra "U" del logo |
| `--toggle-bg-dark` | `#0A2E30` | Fondo toggle en modo oscuro |
| `--toggle-bg-light` | `#1C7C7E` | Fondo toggle en modo claro |
| `--toggle-icon` | `#0F4C4C` | Icono del toggle |

### Tema Oscuro

| Token | Valor | Uso |
|---|---|---|
| `--logo-gradient` | `linear-gradient(180deg, #FFD200, #FF8C00, #E8231A)` | Icono X del logo |
| `--logo-wordmark` | `#FFFFFF` | Texto "MONR" y "UX" |
| `--logo-x-gradient` | `linear-gradient(90deg, #FFD200, #FF8C00, #E8231A)` | Letra "U" del logo |
| `--toggle-bg-dark` | `#FF6B00` | Fondo toggle en modo oscuro |
| `--toggle-bg-light` | `#FF8C00` | Fondo toggle en modo claro |
| `--toggle-icon` | `#D45800` | Icono del toggle |

---

## Regla de Accesibilidad (Obligatoria)

- **Tema claro:** Texto sobre fondo blanco o `neutral-50` debe usar `primary-700` o más oscuro, o `neutral-700`/`neutral-900`. `accent-400` es solo decorativo/fondo.
- **Tema oscuro:** Texto sobre fondo `neutral-50` (#000000) debe usar `neutral-900` (#FFFFFF) o `neutral-700` (#B0B7C3).

---

## Tipografía

- **Títulos:** Neco (fuente local, `@font-face` en `index.css`)
- **Cuerpo:** Switzer (fuente local, `@font-face` en `index.css`)
- **Acento:** Clash Display (fuente local, `@font-face` en `index.css`)
- Token `--font-heading` controla títulos, cards, accordion, footer.
- Token `--font-body` controla cuerpo, labels, botones.
- Token `--font-accent` controla overlines, tags, badges.

| Token | Mobile | Desktop | Peso | Line-height | Uso |
|---|---|---|---|---|---|
| `display` | 32px | 56px | 700 | 1.1 | Hero H1 |
| `h1` | 28px | 40px | 600 | 1.15 | Títulos de sección |
| `h2` | 22px | 28px | 600 | 1.2 | Subtítulos de sección |
| `h3` | 18px | 20px | 500 | 1.3 | Títulos de card |
| `body-lg` | 17px | 18px | 400 | 1.6 | Intro/lead |
| `body` | 15px | 16px | 400 | 1.6 | Texto general |
| `small` | 13px | 13px | 400 | 1.5 | Labels, captions, footer |

---

## Espaciado (grid de 8px)

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128` px

- Padding botones: `12px 24px`
- Padding cards: `24px` mobile / `32px` desktop
- Gap entre elementos: `16–24px`
- Separación entre secciones: `64px` mobile / `96–128px` desktop

---

## Radios

| Token | Valor | Uso |
|---|---|---|
| `radius-sm` | 8px | Inputs, botones |
| `radius-md` | 16px | Cards |
| `radius-lg` | 24px | Imágenes hero, contenedores grandes |
| `radius-full` | 999px | Badges, pills, avatar |

---

## Sombras

| Token | Valor | Uso |
|---|---|---|
| `shadow-sm` | `0 1px 2px rgba(10,46,48,0.06)` | Inputs, botones en reposo |
| `shadow-md` | `0 4px 12px rgba(10,46,48,0.08)` | Cards en reposo |
| `shadow-lg` | `0 12px 32px rgba(10,46,48,0.12)` | Cards en hover, dropdowns, modal |

---

## Breakpoints (mobile-first)

| Nombre | Ancho mínimo | Contenedor máx. |
|---|---|---|
| Base | 0px | 100% (padding lateral 16px) |
| `sm` | 640px | 100% (padding lateral 32px) |
| `md` | 1024px | 1120px |
| `lg` | 1280px | 1200px |

---

## Referencia

- **Fuente de verdad:** `AGENTS.md` sección 4
- **Archivo de Tailwind:** `frontend/tailwind.config.ts`
- **CSS tokens:** `frontend/src/styles/index.css`
