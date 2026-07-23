# Skills de Agente de IA - Netxus Solutions

Este archivo lista las skills de agente de IA instaladas para OpenCode en este proyecto.

## Skills Instaladas

### Diseño y UI
| Skill                  | Archivo                                         | Descripción                                              |
|------------------------|-------------------------------------------------|----------------------------------------------------------|
| `frontend-design`      | `.opencode/skills/frontend-design.md`           | Principios de diseño UI: espaciado, color, responsive    |
| `web-artifacts-builder`| `.opencode/skills/web-artifacts-builder.md`     | Construcción de artifacts HTML con React + Tailwind      |
| `shadcn-ui`            | `.opencode/skills/shadcn-ui.md`                 | Conocimiento profundo de shadcn/ui components            |
| `brand-guidelines`     | `.opencode/skills/brand-guidelines.md`        | Tokens de marca (paleta, tipografía) cargados en sesión  |

### Desarrollo
| Skill                    | Archivo                                         | Descripción                                              |
|--------------------------|-------------------------------------------------|----------------------------------------------------------|
| `code-review-and-quality`| `.opencode/skills/code-review-and-quality.md`   | Revisión de código en 5 ejes (correctness, readability)  |

### Automatización
| Skill                  | Archivo                                         | Descripción                                              |
|------------------------|-------------------------------------------------|----------------------------------------------------------|
| `dependency-updater`   | `.opencode/skills/dependency-updater.md`        | Actualización segura de dependencias sin romper          |

## Uso

Las skills se activan automáticamente cuando el agente detecta que la tarea encaja. Para invocar una skill explícitamente, menciona su nombre en tu instrucción.

## Estructura

```
.opencode/
└─ skills/
   ├─ frontend-design.md
   ├─ web-artifacts-builder.md
   ├─ shadcn-ui.md
   ├─ brand-guidelines.md
   ├─ code-review-and-quality.md
   └─ dependency-updater.md
```
