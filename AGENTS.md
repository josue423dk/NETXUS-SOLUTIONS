# AGENTS.md — MONRU UX (Web MVP)

> Este archivo define el contexto, reglas y convenciones que cualquier agente de IA (Claude Code, Cursor, Copilot, etc.) debe seguir al trabajar en este repositorio.
> Fuente de verdad del Design System: `monru-ux-design-system.md` (v1).

---

## 1. Sobre el proyecto

**MONRU UX** es una consultora de desarrollo de software enfocada en soluciones digitales de alto rendimiento. El sitio web debe transmitir esa identidad: código de calidad, UX cuidada y eficiencia técnica.

- **Stack:** Vite + React + TypeScript
- **Estilos:** Tailwind CSS (con tokens del Design System mapeados en `tailwind.config.ts`)
- **Paleta oficial:** Variante 2 — Teal / verde azulado

---

## 2. Reglas generales para el agente

1. **Nunca hardcodear colores, tipografías, espaciados o radios.** Siempre usar los tokens definidos en `tailwind.config.ts` (ver sección 4).
2. **Mobile-first siempre.** Escribir primero los estilos base (mobile) y luego los breakpoints `sm`, `md`, `lg`.
3. **Accesibilidad no es opcional:** respetar contraste AA/AAA, usar HTML semántico, `alt` en imágenes, `aria-*` donde corresponda, foco visible en elementos interactivos.
4. **Componentes tipados:** todo componente en `.tsx` con props tipadas explícitamente (sin `any`).
5. **Nombrado de componentes alineado a Figma/React** (ver sección 5): `Navbar`, `Footer`, `ButtonPrimary`, `ButtonSecondary`, `ServiceCard`, `PortfolioCard`, `ContactForm`, `HeroSection`.
6. **No introducir nuevas dependencias** sin justificarlo (preferir soluciones nativas de React/Tailwind).
7. Antes de dar una tarea por terminada, verificar que compile (`npm run build`) y que no haya errores de lint/tipos.

---

## 3. Estructura de carpetas (Monorepo)

```
/
├─ frontend/               # Vite + React + TypeScript
│  └─ src/
│     ├─ assets/           # imágenes, íconos, fuentes locales
│     ├─ components/
│     │  ├─ ui/            # componentes atómicos (ButtonPrimary, Badge, Input...)
│     │  ├─ layout/        # Navbar, Footer
│     │  └─ sections/      # HeroSection, ServiceCard, PortfolioCard, ContactForm
│     ├─ pages/            # vistas (Inicio, Servicios, Portafolio, Contacto)
│     ├─ hooks/            # custom hooks
│     ├─ lib/              # utils, helpers, validaciones de formularios
│     ├─ styles/           # estilos globales (@theme, animaciones, fuentes)
│     └─ types/            # tipos e interfaces compartidas
├─ backend/                # Express + Mongoose
│  └─ src/
│     ├─ config/           # conexión a BD (db.js)
│     ├─ controllers/      # lógica de rutas
│     ├─ models/           # schemas de Mongoose
│     ├─ routes/           # definición de rutas
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
| `neutral-900` | `#16211F` | Texto principal alternativo |
| `neutral-700` | `#435151` | Texto secundario / párrafos largos |
| `neutral-500` | `#77898A` | Texto terciario, placeholders |
| `neutral-300` | `#C7D3D3` | Bordes, separadores |
| `neutral-100` | `#ECF1F1` | Fondos alternos de sección |
| `neutral-50`  | `#F7FAFA` | Fondo de página |
| `success` | `#1E8E5A` | Confirmación de formulario |
| `warning` | `#92620A` | Validaciones, avisos |
| `error` | `#B3261E` | Errores de formulario |

### Tema oscuro (dark) — `data-theme="dark"`

| Token | Hex | Uso |
|---|---|---|
| `primary-900` | `#FF6B00` | Texto principal, navbar, footer |
| `primary-700` | `#E8351A` | Botón primario, links, iconos activos |
| `primary-500` | `#FF8C00` | Hover/pressed sobre elementos 700 |
| `accent-400` | `#FFB800` | Fondos de badges, gradiente hero, glow decorativo |
| `neutral-900` | `#FFFFFF` | Texto principal alternativo |
| `neutral-700` | `#B0B7C3` | Texto secundario / párrafos largos |
| `neutral-500` | `#666666` | Texto terciario, placeholders |
| `neutral-300` | `#333333` | Bordes, separadores |
| `neutral-100` | `#1A1A1A` | Fondos alternos de sección |
| `neutral-50`  | `#000000` | Fondo de página |
| `success` | `#4CAF50` | Confirmación de formulario |
| `warning` | `#FF9800` | Validaciones, avisos |
| `error` | `#EF5350` | Errores de formulario |

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

---

## 5. Componentes esperados

| Componente | Descripción |
|---|---|
| `Navbar` | Navegación principal, fija/sticky |
| `Footer` | Pie de página con links y datos de contacto |
| `ButtonPrimary` / `ButtonSecondary` | Botones según jerarquía visual |
| `ServiceCard` | Card para sección Servicios |
| `PortfolioCard` | Card para sección Portafolio |
| `ContactForm` | Formulario con estados: default, loading, success, error |
| `HeroSection` | Sección hero de Inicio |

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
