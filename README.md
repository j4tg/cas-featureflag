# Agenda Backend API

## Comandos

**./run.sh install**

Realiza una instalación limpia del proyecto.

ver: https://docs.npmjs.com/cli/v8/commands/npm-ci

**./run.sh server**

Inicia el servidor en modo de desarrollo y lee las variables desde `.env` y `.env.local`.

Para cambiar el ambiente, ejecuta `./run.sh server dev` y leera las variables desde `.env` y `.env.dev`

**./run.sh test**

Ejecuta pruebas automatizadas con `jest` y genera el reporte de `coverage` por defecto.

Cualquier argumento adicional se pasa directamente a `jest`, ejemplo: `./run.sh test <path>/file.test.js`

---

links:

- https://stackoverflow.com/questions/72611627/what-is-clean-architecture-in-net
