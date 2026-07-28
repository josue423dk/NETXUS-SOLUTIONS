---
name: brand-guidelines
description: Carga los tokens de tu marca (paleta, tipografia, do/dont) en cada sesion
category: design
tags: [branding, tokens, design-system, colors, typography]
---

# Brand Guidelines Skill

Esta skill carga los tokens de la marca MONRU UX en cada sesion, asegurando consistencia visual en todo el codigo generado.

## Paleta Oficial (Variante 2 - Teal/verde azulado)

### Tema Claro (light) - data-theme="light" (predeterminado)

| Token         | Hex      | Uso                                    |
|---------------|----------|----------------------------------------|
| primary-900   | #0A2E30  | Texto principal, navbar, footer        |
| primary-700   | #0F4C4C  | Boton primario, links, iconos activos  |
| primary-500   | #1C7C7E  | Hover/pressed sobre elementos 700      |
| accent-400    | #2DD4BF  | Fondos de badges, gradiente hero, glow |
| neutral-900   | #16211F  | Texto principal alternativo            |
| neutral-700   | #435151  | Texto secundario / parrafos largos     |
| neutral-500   | #77898A  | Texto terciario, placeholders          |
| neutral-300   | #C7D3D3  | Bordes, separadores                    |
| neutral-100   | #ECF1F1  | Fondos alternos de seccion             |
| neutral-50    | #F7FAFA  | Fondo de pagina                        |
| success       | #1E8E5A  | Confirmacion de formulario             |
| warning       | #92620A  | Validaciones, avisos                   |
| error         | #B3261E  | Errores de formulario                  |

### Tema Oscuro (dark) - data-theme="dark"

| Token         | Hex      | Uso                                    |
|---------------|----------|----------------------------------------|
| primary-900   | #FF6B00  | Texto principal, navbar, footer        |
| primary-700   | #D45800  | Boton primario, links, iconos activos  |
| primary-500   | #FF8C00  | Hover/pressed sobre elementos 700      |
| accent-400    | #FF8C00  | Fondos de badges, gradiente hero, glow |
| neutral-900   | #FFFFFF  | Texto principal alternativo            |
| neutral-700   | #B0B7C3  | Texto secundario / parrafos largos     |
| neutral-500   | #666666  | Texto terciario, placeholders          |
| neutral-300   | #333333  | Bordes, separadores                    |
| neutral-100   | #1A1A1A  | Fondos alternos de seccion             |
| neutral-50    | #000000  | Fondo de pagina                        |
| success       | #4CAF50  | Confirmacion de formulario             |
| warning       | #FF9800  | Validaciones, avisos                   |
| error         | #EF5350  | Errores de formulario                  |

## Regla de Accesibilidad (obligatoria)

- **Tema claro:** Texto sobre fondo blanco o neutral-50 debe usar primary-700 o mas oscuro, o neutral-700/neutral-900. accent-400 es solo decorativo/fondo.
- **Tema oscuro:** Texto sobre fondo neutral-50 (#000000) debe usar neutral-900 (#FFFFFF) o neutral-700 (#B0B7C3).

## Tipografia

- **Titulos:** Space Grotesk (variable font)
- **Cuerpo:** Inter (variable font)
- Ambas cargadas via Google Fonts

| Token    | Mobile | Desktop | Peso | Line-height | Uso                     |
|----------|--------|---------|------|-------------|-------------------------|
| display  | 32px   | 56px    | 700  | 1.1         | Hero H1                 |
| h1       | 28px   | 40px    | 600  | 1.15        | Titulos de seccion      |
| h2       | 22px   | 28px    | 600  | 1.2         | Subtitulos de seccion   |
| h3       | 18px   | 20px    | 500  | 1.3         | Titulos de card         |
| body-lg  | 17px   | 18px    | 400  | 1.6         | Intro/lead              |
| body     | 15px   | 16px    | 400  | 1.6         | Texto general           |
| small    | 13px   | 13px    | 400  | 1.5         | Labels, captions, footer|

## Espaciado (grid de 8px)

4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px

- Padding botones: 12px 24px
- Padding cards: 24px mobile / 32px desktop
- Gap entre elementos: 16-24px
- Separacion entre secciones: 64px mobile / 96-128px desktop

## Radios

| Token       | Valor  | Uso                          |
|-------------|--------|------------------------------|
| radius-sm   | 8px    | Inputs, botones              |
| radius-md   | 16px   | Cards                        |
| radius-lg   | 24px   | Imagenes hero, contenedores  |
| radius-full | 999px  | Badges, pills, avatar        |

## Do's y Don'ts

### Do
- Usar siempre tokens del Design System para colores, tipografia, espaciado
- Verificar contraste de accesibilidad (AA/AAA)
- Usar HTML semantico y aria-* donde corresponda
- Mantener consistencia visual entre componentes

### Don't
- Nunca hardcodear colores, tipografias, espaciados o radios
- No usar accent-400 como color de texto principal
- No introducir nuevas dependencias sin justificarlo
- No usar dangerouslySetInnerHTML sin sanitizacion
