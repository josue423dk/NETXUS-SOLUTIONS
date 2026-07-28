# Skills de Agente de IA - MONRU UX

Este archivo lista las skills de agente de IA instaladas para OpenCode en este proyecto.

## Estructura de Skills

### Skills Específicas (`.opencode/skills/`) — Autoritativas

Estas skills contienen los tokens y reglas específicas de MONRU UX. **Siempre tienen precedencia** sobre las skills genéricas.

#### Diseño y UI
| Skill | Archivo | Descripción |
|-------|---------|-------------|
| `frontend-design` | `.opencode/skills/frontend-design.md` | Principios de diseño UI: espaciado, color, responsive |
| `web-artifacts-builder` | `.opencode/skills/web-artifacts-builder.md` | Construcción de artifacts HTML con React + Tailwind |
| `shadcn-ui` | `.opencode/skills/shadcn-ui.md` | Conocimiento profundo de shadcn/ui components |
| `brand-guidelines` | `.opencode/skills/brand-guidelines.md` | Tokens de marca (paleta, tipografía) cargados en sesión |
| `monru-design-tokens` | `.opencode/skills/monru-design-tokens.md` | Tokens de diseño oficiales (adaptados de AGENTS.md) |

#### Desarrollo
| Skill | Archivo | Descripción |
|-------|---------|-------------|
| `code-review-and-quality` | `.opencode/skills/code-review-and-quality.md` | Revisión de código en 5 ejes (correctness, readability) |

#### Automatización
| Skill | Archivo | Descripción |
|-------|---------|-------------|
| `dependency-updater` | `.opencode/skills/dependency-updater.md` | Actualización segura de dependencias sin romper |

---

### Skills Genéricas (`.agents/skills/`) — Solo Inspiración

Estas skills son protocolos de diseño reutilizables y **no aplican directamente** a los tokens de MONRU UX. Se usan para metodología y referencia.

> **Importante:** Algunas skills contienen valores de color, tipografía o espaciado que **NO son compatibles** con el Design System de MONRU UX. Siempre usar los tokens definidos en `AGENTS.md` sección 4.

| Skill | Categoría | Compatibilidad | Notas |
|-------|-----------|---------------|-------|
| `design-taste-frontend` | Metodología | ✅ Alta | Anti-slop methodology, adaptable |
| `brandkit` | Imágenes | ✅ Alta | Image generation para brand boards |
| `full-output-enforcement` | Utilidad | ✅ Alta | Output enforcement |
| `gpt-taste` | Metodología | ✅ Alta | GPT design taste |
| `image-to-code` | Utilidad | ✅ Alta | Convertir imágenes a código |
| `imagegen-frontend-mobile` | Imágenes | ✅ Alta | Mobile frontend image generation |
| `imagegen-frontend-web` | Imágenes | ✅ Alta | Web frontend image generation |
| `redesign-existing-projects` | Metodología | ✅ Alta | Rediseño de proyectos existentes |
| `stitch-design-taste` | Metodología | ✅ Alta | Stitch design taste |
| `minimalist-ui` | Estilo | ⚠️ Media | MONRU usa paleta Teal, no monochrome |
| `high-end-visual-design` | Estilo | ⚠️ Media | Referencia estética, no aplicar tokens |
| `industrial-brutalist-ui` | Estilo | ❌ Incompatible | Incompatible con MONRU UX |

---

## Regla de Precedencia

Cuando existan instrucciones contradictorias entre skills:

1. **`AGENTS.md`** siempre tiene máxima autoridad (fuente de verdad)
2. **`.opencode/skills/`** tiene precedencia sobre `.agents/skills/` (específico vs. genérico)
3. **`.agents/skills/`** solo se usa como referencia metodológica cuando no hay conflicto

---

## Uso

Las skills se activan automáticamente cuando el agente detecta que la tarea encaja. Para invocar una skill explícitamente, menciona su nombre en tu instrucción.
