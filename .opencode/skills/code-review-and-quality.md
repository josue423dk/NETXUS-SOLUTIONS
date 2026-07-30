---
name: code-review-and-quality
description: Revision de codigo en 5 ejes: correccion, legibilidad, arquitectura, seguridad, rendimiento
category: development
tags: [code-review, quality, security, performance, architecture]
---

# Code Review and Quality Skill

Esta skill ejecuta una revision de codigo en cinco ejes antes de mergear cualquier cambio: correccion, legibilidad, arquitectura, seguridad y rendimiento.

## Los 5 Ejes de Revision

### 1. Correccion (Correctness)
- ¿El codigo hace lo que se supone que debe hacer?
- ¿Los tests pasan y cubren los casos edge?
- ¿Se manejan correctamente los errores?
- ¿No hay bugs logicos o de off-by-one?

### 2. Legibilidad (Readability)
- ¿El codigo es facil de entender?
- ¿Los nombres de variables y funciones son descriptivos?
- ¿El codigo sigue las convenciones del proyecto?
- ¿Los comentarios explican el "por que" no el "que"?

### 3. Arquitectura (Architecture)
- ¿El codigo sigue los patrones establecidos?
- ¿Hay separacion de preocupaciones adecuada?
- ¿Las dependencias son correctas (no dependencias circulares)?
- ¿El codigo es testeable y modificable?

### 4. Seguridad (Security)
- ¿No hay inyeccion de SQL, XSS, o vulnerabilidades comunes?
- ¿Los inputs del usuario estan validados y sanitizados?
- ¿No se exponen secretos o credenciales en el codigo?
- ¿Se usan encabezados de seguridad adecuados?

### 5. Rendimiento (Performance)
- ¿El codigo es eficiente en tiempo y memoria?
- ¿No hay operaciones innecesarias en loops?
- ¿Se cachean resultados costosos?
- ¿Las consultas a base de datos son eficientes?

## Plantilla de Salida

### Veredicto
- **APPROVE** - El cambio esta listo para mergear
- **REQUEST CHANGES** - Se necesitan modificaciones antes de mergear

### Issues por Severidad
- **Critical:** Deben ser corregidos antes de mergear
- **High:** Fuertemente recomendados antes de mergear
- **Medium:** Considerar corregir
- **Low:** Sugerencias menores

### What's Done Well
- Reconocer lo que esta bien hecho en el cambio

## Checklist de Seguridad

- [ ] No hay `dangerouslySetInnerHTML` sin sanitizacion
- [ ] Todos los enlaces externos usan `rel="noopener noreferrer"`
- [ ] No hay secretos hardcodeados en el codigo
- [ ] Los inputs del usuario estan validados (cliente y servidor)
- [ ] Se implementan medidas contra CSRF en formularios
- [ ] No se exponen stack traces en produccion
- [ ] Las dependencias no tienen vulnerabilidades conocidas

## Checklist de Rendimiento

- [ ] No hay operaciones costosas en loops
- [ ] Se usan React.memo, useMemo, useCallback donde es apropiado
- [ ] Las imagenes tienen formatos modernos (WebP) y lazy loading
- [ ] No hay memoria fugitiva (cleanup en useEffect)
- [ ] Las consultas a APIs estan optimizadas

## Checklist de Arquitectura

- [ ] Los componentes siguen la estructura: ui/, layout/, sections/
- [ ] Los hooks estan en hooks/ y son reutilizables
- [ ] Las utilidades estan en lib/
- [ ] Los tipos estan en types/
- [ ] No hay dependencias circulares
- [ ] El codigo sigue el principio de responsabilidad unica

## Proceso de Revision

1. **Analizar el diff:** Entender que cambios se estan proponiendo
2. **Verificar tests:** Asegurar que los tests pasan y cubren los cambios
3. **Revisar los 5 ejes:** Aplicar la plantilla de revision
4. **Generar feedback:** Usar la plantilla de salida
5. **Follow-up:** Asegurar que los cambios solicitados se hayan hecho
