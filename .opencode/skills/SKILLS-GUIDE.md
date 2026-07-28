# Guía de Uso de Skills - MONRU UX

Esta guía explica cuándo y cómo usar cada skill del proyecto.

---

## Regla General

> **`AGENTS.md` siempre es la fuente de verdad.** Las skills son herramientas complementarias, no reemplazan los tokens del Design System.

---

## Skills Específicas (`.opencode/skills/`)

Usar estas skills para tareas específicas de MONRU UX:

| Skill | Cuándo usar | Ejemplo |
|-------|-------------|---------|
| `monru-design-tokens` | Consultar tokens de diseño oficiales | "¿Qué color es primary-700?" |
| `brand-guidelines` | Verificar paleta, tipografía, reglas de accesibilidad | "¿Cuál es el contraste correcto para texto?" |
| `frontend-design` | Principios de diseño UI, espaciado, responsive | "¿Cómo creo un componente mobile-first?" |
| `web-artifacts-builder` | Construir artifacts HTML con React + Tailwind | "Genera un hero section con las tools de MONRU" |
| `shadcn-ui` | Usar componentes shadcn/ui | "¿Cómo uso el componente Button de shadcn?" |
| `code-review-and-quality` | Revisión de código antes de commit | "Revisa este componente para bugs" |
| `dependency-updater` | Actualizar dependencias de forma segura | "Actualiza las dependencias sin romper nada" |

---

## Skills Genéricas (`.agents/skills/`)

Usar estas skills como **inspiración metodológica**, no para tokens:

### ✅ Compatibles con MONRU UX

| Skill | Cuándo usar | Nota |
|-------|-------------|------|
| `design-taste-frontend` | Metodología anti-slop, cómo evitar diseños genéricos | Seguir metodología, usar tokens MONRU |
| `brandkit` | Generar imágenes de brand boards, mockups | Solo para image generation |
| `full-output-enforcement` | Asegurar output completo y detallado | Utilidad general |
| `gpt-taste` | Referencia de diseño GPT | Inspiración |
| `image-to-code` | Convertir imágenes a código | Utilidad |
| `imagegen-frontend-mobile` | Generar imágenes para mobile | Solo image generation |
| `imagegen-frontend-web` | Generar imágenes para web | Solo image generation |
| `redesign-existing-projects` | Metodología para rediseñar proyectos existentes | Seguir metodología, usar tokens MONRU |
| `stitch-design-taste` | Stitch design taste | Inspiración |

### ⚠️ Usar con Precaución

| Skill | Cuándo usar | Restricción |
|-------|-------------|-------------|
| `minimalist-ui` | Referencia de diseño minimalista | **NO usar tokens** (monochrome vs. Teal) |
| `high-end-visual-design` | Referencia de diseño premium | **NO usar tokens** (púrpura/emerald vs. Teal) |

### ❌ No Usar en MONRU UX

| Skill | Razón |
|-------|-------|
| `industrial-brutalist-ui` | Incompatible: cero border radius, rojo Swiss, fuentes monospace |

---

## Flujo de Trabajo Recomendado

1. **Primero:** Consultar `AGENTS.md` sección 4 para tokens oficiales
2. **Segundo:** Usar skill específica de `.opencode/` si necesitas guía de diseño
3. **Tercero:** Usar skill genérica de `.agents/` solo para metodología
4. **Siempre:** Verificar que los tokens usados coincidan con `AGENTS.md`

---

## Ejemplo Práctico

**Tarea:** Crear un componente ServiceCard

1. Consultar `monru-design-tokens.md` para colores y espaciado
2. Usar `frontend-design.md` para principios de diseño
3. Usar `design-taste-frontend` para evitar AI slop (metodología)
4. **NO** usar tokens de `minimalist-ui` (incompatible con paleta Teal)

---

## Resumen de Prioridad

```
AGENTS.md > .opencode/skills/ > .agents/skills/
```

Cuando haya conflicto, siempre seguir el orden de precedencia.
