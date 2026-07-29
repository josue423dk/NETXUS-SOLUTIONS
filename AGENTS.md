# AGENTS.md — MONRU UX (Web MVP)

> Este archivo define el contexto, reglas y convenciones que cualquier agente de IA (Claude Code, Cursor, Copilot, etc.) debe seguir al trabajar en este repositorio.
> Fuente de verdad del Design System: `monru-ux-design-system.md` (v1).

---

## 1. Sobre el proyecto

**MONRU UX** es una consultora de desarrollo de software enfocada en soluciones digitales de alto rendimiento. El sitio web debe transmitir esa identidad: código de calidad, UX cuidada y eficiencia técnica.

- **Stack Frontend:** Vite 8 + React 19 + TypeScript 6 + Tailwind CSS v4
- **Stack Backend:** Express 4 + Mongoose 8
- **Estilos:** Tailwind CSS v4 con tokens via `@theme` en `frontend/src/styles/index.css`
- **Paleta oficial:** Variante 2 — Teal / verde azulado
- **Fuentes:** Neco (títulos), Switzer (cuerpo), Clash Display (acento) — todas locales via `@font-face`

---

## 2. Reglas generales para el agente

1. **Nunca hardcodear colores, tipografías, espaciados o radios.** Siempre usar los tokens definidos en `tailwind.config.ts` (ver sección 4).
2. **Mobile-first siempre.** Escribir primero los estilos base (mobile) y luego los breakpoints `sm`, `md`, `lg`.
3. **Accesibilidad no es opcional:** respetar contraste AA/AAA, usar HTML semántico, `alt` en imágenes, `aria-*` donde corresponda, foco visible en elementos interactivos.
4. **Componentes tipados:** todo componente en `.tsx` con props tipadas explícitamente (sin `any`).
5. **Nombrado de componentes alineado a Figma/React** (ver sección 5): `Navbar`, `Footer`, `ButtonPrimary`, `ButtonSecondary`, `ServiceCard`, `PortfolioCard`, `ContactForm`, `HeroSection`.
6. **No introducir nuevas dependencias** sin justificarlo (preferir soluciones nativas de React/Tailwind).
7. Antes de dar una tarea por terminada, verificar que compile (`npm run build`) y que no haya errores de lint/tipos.
8. **Lazy loading obligatorio:** Todas las rutas y secciones deben usar `React.lazy` + `Suspense` para code splitting.
9. **Separación de datos:** La data estática (servicios, portfolio, pricing, etc.) va en `src/data/`, no hardcodeada en componentes.
10. **Manejo de errores:** Todo componente debe tener fallback de error. El `ErrorBoundary` global envuelve la app.

---

## 3. Estructura de carpetas (Monorepo)

```
/
├─ frontend/               # Vite 8 + React 19 + TypeScript 6 + Tailwind v4
│  └─ src/
│     ├─ assets/           # imágenes, íconos, fuentes locales
│     ├─ components/
│     │  ├─ ui/            # componentes atómicos (ButtonPrimary, Logo, SectionHeader, ContactForm, HashLink, ErrorBoundary, AccordionItem, Spinner, ThemeToggle)
│     │  ├─ layout/        # Layout, Navbar, Footer
│     │  └─ sections/      # Hero, ServiceCard, PortfolioCard, TrabajosGrid, PricingSection, PricingCard, TeamCard, FloatingRobot, PageTransitionWrapper, PersistentBackground
│     ├─ pages/            # vistas (Inicio, Cotizacion, QuienesSomos, Integrantes, PreguntasFrecuentes)
│     ├─ hooks/            # custom hooks (useScrollReveal, useTheme, useActiveSection, useScrollPageTransition)
│     ├─ data/             # data estática (navegación, servicios, portfolio, pricing, equipo, FAQ)
│     ├─ lib/              # utils, helpers, api client
│     ├─ styles/           # estilos globales (@theme, animaciones, fuentes)
│     └─ types/            # tipos e interfaces compartidas
├─ backend/                # Express 4 + Mongoose 8
│  └─ src/
│     ├─ config/           # db.js, env.js
│     ├─ controllers/      # projectController.js
│     ├─ models/           # Project.js
│     ├─ routes/           # projectRoutes.js
│     ├─ services/         # projectService.js
│     ├─ middleware/        # validate.js, errorHandler.js
│     └─ server.js         # entry point
├─ AGENTS.md
└─ .gitignore
```

**Convención de archivos:** `PascalCase.tsx` para componentes, `camelCase.ts` para hooks/utils.

---

## 4. Design System → Tailwind tokens

Los CSS tokens se definen en `frontend/src/styles/index.css` vía `@theme` de Tailwind v4. Los valores se intercambian según el atributo `data-theme` en `<html>`.

### Tema claro (light) — `data-theme="light"` (predeterminado)

| Token | Hex | Uso |
|---|---|---|
| `primary-900` | `#0A2E30` | Texto principal, navbar, footer |
| `primary-700` | `#0F4C4C` | Botón primario, links, iconos activos |
| `primary-500` | `#1C7C7E` | Hover/pressed sobre elementos 700 |
| `accent-400` | `#2DD4BF` | Fondos de badges, gradiente hero, glow decorativo |
| `neutral-900` | `#1E2828` | Texto principal alternativo |
| `neutral-700` | `#505559` | Texto secundario / párrafos largos |
| `neutral-500` | `#7A8585` | Texto terciario, placeholders |
| `neutral-300` | `#C8D0D0` | Bordes, separadores |
| `neutral-100` | `#EDF0F0` | Fondos alternos de sección |
| `neutral-50`  | `#F8F9F9` | Fondo de página |
| `success` | `#1E8E5A` | Confirmación de formulario |
| `warning` | `#92620A` | Validaciones, avisos |
| `error` | `#B3261E` | Errores de formulario |

### Tema oscuro (dark) — `data-theme="dark"`

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
| `neutral-50`  | `#000000` | Fondo de página |
| `success` | `#4CAF50` | Confirmación de formulario |
| `warning` | `#FF9800` | Validaciones, avisos |
| `error` | `#EF5350` | Errores de formulario |

### Tokens de logo y toggle — Tema claro

| Token | Valor | Uso |
|---|---|---|
| `--logo-gradient` | `linear-gradient(180deg, #0F4C4C, #1C7C7E, #2DD4BF)` | Icono X del logo |
| `--logo-wordmark` | `#0A2E30` | Texto "MONR" y "UX" |
| `--logo-x-gradient` | `linear-gradient(90deg, #1C7C7E, #2DD4BF)` | Letra "U" del logo |
| `--toggle-bg-dark` | `#0A2E30` | Fondo toggle en modo oscuro |
| `--toggle-bg-light` | `#1C7C7E` | Fondo toggle en modo claro |
| `--toggle-icon` | `#0F4C4C` | Icono del toggle |

### Tokens de logo y toggle — Tema oscuro

| Token | Valor | Uso |
|---|---|---|
| `--logo-gradient` | `linear-gradient(180deg, #FFD200, #FF8C00, #E8231A)` | Icono X del logo |
| `--logo-wordmark` | `#FFFFFF` | Texto "MONR" y "UX" |
| `--logo-x-gradient` | `linear-gradient(90deg, #FFD200, #FF8C00, #E8231A)` | Letra "U" del logo |
| `--toggle-bg-dark` | `#FF6B00` | Fondo toggle en modo oscuro |
| `--toggle-bg-light` | `#FF8C00` | Fondo toggle en modo claro |
| `--toggle-icon` | `#D45800` | Icono del toggle |

**Regla de accesibilidad (obligatoria):** en tema claro, texto sobre fondo blanco o `neutral-50` debe usar `primary-700` o más oscuro, o `neutral-700`/`neutral-900`. `accent-400` es solo decorativo/fondo. En tema oscuro, texto sobre fondo `neutral-50` (#000000) debe usar `neutral-900` (#FFFFFF) o `neutral-700` (#B0B7C3).

### Tipografía

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

### Espaciado (grid de 8px)

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128` px

- Padding botones: `12px 24px`
- Padding cards: `24px` mobile / `32px` desktop
- Gap entre elementos: `16–24px`
- Separación entre secciones: `64px` mobile / `96–128px` desktop

### Radios

| Token | Valor | Uso |
|---|---|---|
| `radius-sm` | 8px | Inputs, botones |
| `radius-md` | 16px | Cards |
| `radius-lg` | 24px | Imágenes hero, contenedores grandes |
| `radius-full` | 999px | Badges, pills, avatar |

### Sombras

| Token | Valor | Uso |
|---|---|---|
| `shadow-sm` | `0 1px 2px rgba(10,46,48,0.06)` | Inputs, botones en reposo |
| `shadow-md` | `0 4px 12px rgba(10,46,48,0.08)` | Cards en reposo |
| `shadow-lg` | `0 12px 32px rgba(10,46,48,0.12)` | Cards en hover, dropdowns, modal |

### Breakpoints (mobile-first)

| Nombre | Ancho mínimo | Contenedor máx. |
|---|---|---|
| Base | 0px | 100% (padding lateral 16px) |
| `sm` | 640px | 100% (padding lateral 32px) |
| `md` | 1024px | 1120px |
| `lg` | 1280px | 1200px |

### Animaciones y Transiciones

| Patrón | Implementación | Archivo |
|--------|---------------|---------|
| Scroll reveal | `IntersectionObserver` + CSS transitions | `useScrollReveal.ts` |
| Transiciones de página | Scroll-based 3D perspective slides | `useScrollPageTransition.ts` |
| Stagger cascade | CSS animation-delay por `:nth-child` | `index.css` |
| Reduced motion | `prefers-reduced-motion: reduce` | `index.css` |
| Transiciones sección | `sec-active`, `sec-inactive`, `sec-entering`, `sec-exiting` | `index.css` |

**Reglas de animación:**
- Solo animar `transform` y `opacity` (GPU-safe)
- Usar `cubic-bezier` personalizado, nunca `linear` o `ease-in-out`
- Respetar `prefers-reduced-motion`
- No usar `window.addEventListener('scroll')` — usar `IntersectionObserver`

### Performance

- **Lazy loading:** `React.lazy` + `Suspense` para rutas y secciones
- **Code splitting:** `manualChunks` en Vite para vendor (react, react-dom, react-router)
- **Font loading:** `font-display: swap` en todas las `@font-face`
- **Imágenes:** Formato WebP/AVIF cuando sea posible, `loading="lazy"` en imágenes below-the-fold
- **CSS:** Tailwind v4 tree-shaking automático

---

## 5. Componentes del proyecto

### Layout (`components/layout/`)
| Componente | Descripción |
|------------|-------------|
| `Layout` | Wrapper global con Navbar, main, Footer y transiciones de página |
| `Navbar` | Navegación principal, fija/sticky, mobile-first con hamburger menu |
| `Footer` | Pie de página con links, newsletter form (honeypot anti-spam) |

### UI (`components/ui/`)
| Componente | Descripción |
|------------|-------------|
| `ButtonPrimary` | Botón multi-variante (primary/secondary/outline/ghost) con soporte link/button |
| `ButtonSecondary` | Re-export de ButtonPrimary (mismo componente, diferente nombre de import) |
| `Logo` | SVG logo con gradientes CSS custom properties para theme switching |
| `SectionHeader` | Header reutilizable con overline/título/descripción |
| `ContactForm` | Formulario con validación Zod, estados: idle/loading/success/error |
| `HashLink` | Enlace hash con routing SPA-aware |
| `ErrorBoundary` | Error boundary class-based con logging dev-only |
| `AccordionItem` | Acordeón accesible con ARIA, keyboard navigation |
| `Spinner` | Loading spinner con `role="status"` |
| `ThemeToggle` | Toggle dark/light con localStorage, `role="switch"` |

### Sections (`components/sections/`)
| Componente | Descripción |
|------------|-------------|
| `Hero` | Sección hero de Inicio con background image y animaciones |
| `ServiceCard` | Card para sección Servicios con iconos SVG y scroll reveal |
| `PortfolioCard` | Card para sección Portafolio con imagen y descripción |
| `TrabajosGrid` | Grid de trabajos/portafolio |
| `PricingSection` | Sección de planes/pricing |
| `PricingCard` | Card individual de pricing |
| `TeamCard` | Card de miembro del equipo |
| `FloatingRobot` | Elemento decorativo flotante (aria-hidden) |
| `PageTransitionWrapper` | Wrapper para transiciones de página scroll-based |
| `PersistentBackground` | Background persistente con transiciones |

### Pages (`pages/`)
| Página | Descripción |
|--------|-------------|
| `Inicio` | Landing page principal con todas las secciones |
| `Cotizacion` | Página de cotización/presupuesto |
| `QuienesSomos` | Información de la empresa |
| `Integrantes` | Equipo/credits |
| `PreguntasFrecuentes` | FAQ con acordeón |

Cada componente en `src/components/{layout|sections|ui}/NombreComponente.tsx`, con su lógica y estilos co-ubicados (sin CSS externo salvo casos justificados).

---

## 6. Seguridad y Hacking Defensivo (Requisito Obligatorio)

Para garantizar que el MVP de MONRU UX nazca robusto y protegido contra vulnerabilidades comunes, todo código desarrollado debe contemplar las siguientes prácticas de seguridad desde su concepción:

### 1. Manejo seguro de Formularios y Entradas
- **Sanitización y Validación:** Nunca confiar en el input del usuario. Validar tanto en el cliente (React Hook Form / Zod) como simular validaciones estrictas en lógica de envío.
- **Prevención de XSS (Cross-Site Scripting):** No utilizar funciones peligrosas como `dangerouslySetInnerHTML` a menos que sea estrictamente necesario y el contenido esté completamente sanitizado.
- **Protección contra CSRF y Bot Spam:** Implementar medidas básicas en formularios de contacto (como honeypots o validaciones lógicas de campos ocultos) antes de enviar datos a APIs.

### 2. Gestión de Secretos y Configuración
- **Cero Hardcodeo de Credenciales:** Las API keys, tokens de autenticación o URLs de servicios externos **nunca** deben ir hardcodeadas en el código fuente.
- **Variables de Entorno:** Utilizar siempre variables de entorno seguras (`import.meta.env.VITE_*` en Vite) y asegurar que el archivo `.env` esté debidamente incluido en el `.gitignore`.

### 3. Buenas Prácticas Frontend
- **Cabeceras y Enlaces Seguros:** Todo enlace externo (`target="_blank"`) debe incluir obligatoriamente `rel="noopener noreferrer"` para evitar ataques de *tabnabbing*.
- **Dependencias Seguras:** Ejecutar revisiones periódicas (`npm audit`) para evitar el uso de paquetes de terceros con vulnerabilidades conocidas y evitar instalar dependencias innecesarias (Regla general: menos dependencias, menor superficie de ataque).
- **Manejo de Errores:** No exponer información sensible del sistema, stack traces o configuraciones internas en las pantallas de error o en la consola del navegador para usuarios finales.

---

## 7. Convenciones de commits

Usar **Conventional Commits**:

<tipo>(<alcance opcional>): <descripción corta en imperativo>


**Tipos permitidos:** `feat`, `fix`, `style`, `refactor`, `docs`, `test`, `chore`, `perf`

**Ejemplos:**
- `feat(navbar): agregar navbar responsive con menú mobile`
- `fix(contact-form): corregir validación de email`
- `style(hero): ajustar espaciado según design system`
- `docs(agents): actualizar reglas de tokens de color`

- Commits atómicos (un cambio lógico por commit).
- Mensajes en español, en imperativo, sin punto final.

---

## 8. Skills de Agente de IA

Este proyecto incluye skills de agente de IA en `.opencode/skills/` para OpenCode. Estas skills proporcionan contexto y capacidades especializadas para flujos de trabajo complejos.

### Skills Instaladas

| Skill                    | Categoría  | Descripción                                              |
|--------------------------|------------|----------------------------------------------------------|
| `frontend-design`        | Diseño     | Principios de diseño UI: espaciado, color, responsive    |
| `web-artifacts-builder`  | Diseño     | Construcción de artifacts HTML con React + Tailwind      |
| `shadcn-ui`              | Diseño     | Conocimiento profundo de shadcn/ui components            |
| `brand-guidelines`       | Diseño     | Tokens de marca (paleta, tipografía) cargados en sesión  |
| `code-review-and-quality`| Desarrollo | Revisión de código en 5 ejes (correctness, readability)  |
| `dependency-updater`     | Automatización | Actualización segura de dependencias sin romper       |

### Cómo Usar las Skills

Las skills se activan automáticamente cuando el agente detecta que la tarea encaja. También puedes invocarlas explícitamente:

- **Frontend:** `frontend-design` para componentes UI, `brand-guidelines` para tokens de marca
- **Code Review:** `code-review-and-quality` para revisión antes de mergear
- **Dependencies:** `dependency-updater` para actualizar paquetes de forma segura

## 9. Checklist antes de cerrar una tarea

- [ ] ¿Usé solo tokens del Design System (colores, tipografía, espacio, radios, sombras)?
- [ ] ¿El diseño es mobile-first y responde en `sm`, `md`, `lg`?
- [ ] ¿Cumple contraste de accesibilidad (texto oscuro sobre fondos claros)?
- [ ] ¿Los componentes están tipados y sin `any`?
- [ ] ¿El código implementa buenas prácticas de seguridad (prevención XSS, enlaces seguros con `noopener`, cero secretos hardcodeados)?
- [ ] ¿El build corre sin errores (`npm run build`)?
- [ ] ¿El commit sigue Conventional Commits?

---

## 10. Prioridad y Resolución de Conflictos entre Skills

Este proyecto incluye skills en dos ubicaciones:
- **`.opencode/skills/`** — Skills específicas del proyecto MONRU UX (tokens de marca, diseño específico)
- **`.agents/skills/`** — Skills genéricas de metodología de diseño (anti-slop, estilos, utilidades)

### Regla de Precedencia

Cuando existan instrucciones contradictorias entre skills:

1. **`AGENTS.md`** siempre tiene máxima autoridad (fuente de verdad)
2. **`.opencode/skills/`** tiene precedencia sobre `.agents/skills/` (específico vs. genérico)
3. **`.agents/skills/`** solo se usa como referencia metodológica cuando no hay conflicto

### Skills Genéricas (`.agents/skills/`) — Solo Inspiración

Las skills en `.agents/skills/` son protocolos de diseño reutilizables y **no aplican directamente** a los tokens de MONRU UX. Se usan para:
- Metodología anti-slop (`design-taste-frontend`)
- Generación de imágenes de marca (`brandkit`)
- Referencia de estilos (`minimalist-ui`, `high-end-visual-design`)
- Utilidades (`full-output-enforcement`, `image-to-code`, etc.)

**Nota:** Algunas skills de `.agents/` contienen valores de color, tipografía o espaciado que **NO son compatibles** con el Design System de MONRU UX. Siempre usar los tokens definidos en `AGENTS.md` sección 4.

### Skills Específicas (`.opencode/skills/`) — Autoritativas

Estas skills contienen los tokens y reglas específicas de MONRU UX. Siempre tienen precedencia sobre las skills genéricas.
