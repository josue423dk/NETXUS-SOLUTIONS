---
name: dependency-updater
description: Actualiza dependencias sin romper el proyecto, resuelve conflictos de versiones
category: automation
tags: [dependencies, npm, updates, security, audit]
---

# Dependency Updater Skill

Esta skill encuentra el equilibrio entre mantener dependencias actualizadas y no romper el proyecto. Auto-detecta package.json, requirements.txt, Cargo.toml, go.mod y otros formatos.

## Proceso de Actualizacion

### Fase 1: Deteccion
- Identificar el gestor de paquetes del proyecto (npm, yarn, pnpm)
- Leer package.json y package-lock.json
- Identificar dependencias directas vs transitivas

### Fase 2: Auditoria de Seguridad
```bash
npm audit
```
- Identificar vulnerabilidades conocidas
- Priorizar actualizaciones de seguridad (Critical, High)

### Fase 3: Actualizaciones Seguras
- **Patch updates (1.2.3 -> 1.2.4):** Aplicar automaticamente
- **Minor updates (1.2.3 -> 1.3.0):** Aplicar automaticamente
- **Major updates (1.2.3 -> 2.0.0):** Preguntar antes de aplicar

### Fase 4: Verificacion
```bash
npm run build
npm run lint
npm test
```
- Verificar que el build pasa
- Verificar que el lint pasa
- Verificar que los tests pasan

## Comandos Utiles

### Ver actualizaciones disponibles
```bash
npm outdated
```

### Actualizar dependencias
```bash
# Actualizar todas las dependencias (patch y minor)
npm update

# Actualizar una dependencia especifica
npm update <package-name>

# Actualizar a la ultima version (puede incluir major)
npm install <package-name>@latest
```

### Auditar seguridad
```bash
npm audit
npm audit fix
npm audit fix --force  # Para vulnerabilidades criticas
```

### Limpiar y reinstalar
```bash
# Eliminar node_modules y package-lock.json
rm -rf node_modules package-lock.json

# Reinstalar
npm install
```

## Estrategia de Actualizacion

### Prioridad 1: Seguridad
- Actualizar inmediatamente dependencias con vulnerabilidades Critical/High
- Usar `npm audit fix` para correcciones automaticas
- Para breaking changes, leer el changelog antes de actualizar

### Prioridad 2: Patch y Minor
- Aplicar automaticamente actualizaciones patch y minor
- Verificar build y tests despues de cada actualizacion
- Usar `npm update` para actualizaciones seguras

### Prioridad 3: Major
- Preguntar al usuario antes de aplicar
- Leer el changelog y notas de la version
- Hacer una rama separada para probar
- Actualizar gradualmente, una dependencia a la vez

## Diagnostico de Conflictos

### Conflictos de Version
- Usar `npm ls <package-name>` para ver el arbol de dependencias
- Identificar que paquetes dependen de versiones conflictivas
- Usar `resolutions` en package.json para forzar versiones

### Problemas Comunes
- **node_modules corrupto:** Limpiar y reinstalar
- **package-lock.json desactualizado:** Regenerar con `npm install`
- **Dependencias huhaladas:** Usar `npm dedupe`

## Checklist Post-Actualizacion

- [ ] El build pasa sin errores (`npm run build`)
- [ ] El lint pasa sin errores (`npm run lint`)
- [ ] Los tests pasan (`npm test`)
- [ ] No hay vulnerabilidades nuevas (`npm audit`)
- [ ] Las dependencias transitivas no tienen conflictos
- [ ] El package-lock.json esta actualizado
