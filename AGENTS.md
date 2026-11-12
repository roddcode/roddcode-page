# Trabajar en roddcode-page

Portafolio profesional ES/EN. Lee `ARCHITECTURE.md` para la implementación y `DESIGN.md` para el sistema visual. Comandos en `README.md`.

- Usa pnpm. Preserva escritos, CV, idiomas y cambios ajenos.
- Hero ilustrativo de portafolio; el mockup de reservas va en el caso de Soffia. Las primeras previews con demo en el hero fueron rechazadas. No extender su dirección visual como si estuviera aprobada.
- No inventar métricas, incidentes, equipo, consumidores ni disponibilidad actual. No publicar datos de terceros ni nombres B2B restringidos. Si falta evidencia, describir solo lo defendible; no trasladar preguntas abiertas como afirmaciones al sitio.
- Conservar una fuente de contenido compartido; no duplicar hechos entre home, índices y detalles.
- Reutilizar `components/ui/Button` y `Tooltip` para controles y acciones. Variantes, foco y motion viven en esa base; los CSS Modules organizan las vistas. Conservar enlaces nativos mediante `asChild` y no introducir otra familia de controles por componente.
- Revisar el sitio en navegador, escritorio/móvil, teclado y reduced motion. Tests y build no acreditan por sí solos calidad visual.
- No hacer push/deploy ni aplicar cambios a perfiles externos sin la autorización correspondiente del usuario. No contactar terceros.
- La instrucción actual del usuario prevalece sobre descripciones históricas de layout y defaults de skills.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
