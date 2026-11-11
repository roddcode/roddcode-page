# Arquitectura de roddcode-page

Refactor en curso. Las rutas y vistas multipágina están implementadas; el contenido ES/EN se prepara y revisa en un worktree aislado. La home anterior sigue activa hasta la elección visual, con dos heroes corregidos disponibles en `/design-preview`.

## Sistema actual

| Área | Implementación y responsabilidad |
|---|---|
| Aplicación | Next.js App Router, React, TypeScript; scripts y versiones en `package.json` |
| Idiomas | `src/proxy.ts` y `src/i18n/`; español sin prefijo e inglés en `/en`; cookie mediante `/api/locale` |
| Home | `src/app/[locale]/page.tsx` compone `Home`, `SystemsStacked`, `OpenSource` y `Experience` |
| Interacción anterior | `src/components/home/home.tsx` aún monta en la home anterior; se retirará al integrar la nueva |
| Portafolio | `src/components/portfolio/` separa chrome, hero, ilustraciones, vistas de casos y demo de reservas |
| Rutas nuevas | `[locale]/work`, `work/[slug]`, `open-source` y `about`; Writing conserva su ruta canónica y añade alias con prefijo |
| Contenido nuevo | `src/content/portfolio/`, contrato tipado para identidad, proyectos, componentes y About; dataset completo en preparación |
| Escritura | MDX en `src/content/writing/`; índice y artículos bajo `(writing)` con rutas `/writing` |
| Páginas legales | `(content)` usa `PageShell`; rutas `/privacidad` y `/seguridad` |
| Sistema visual | `DESIGN.md`, tokens en `globals.css`, `Container`/`Section`, CSS Modules y Tailwind |
| Distribución | Sitemap, robots, RSS, imágenes OG y redirects de CV/URLs históricas |

La nueva demostración de Soffia usa datos sintéticos y estado local para aceptación, rechazo y replay. Su leyenda delimita la simulación: no hay modelo, API, concurrencia, persistencia ni transacción real. El sitio no contiene el backend de los productos descritos.

## Transición y límites de integración

- Las rutas aceptadas en [PROJECT_SPEC.md](PROJECT_SPEC.md) comparten `PortfolioShell`; Writing y legales reutilizan Header/Footer mediante `PageShell`.
- `api/locale` acepta un retorno local y verifica origen para mantener el caso al cambiar idioma. `lib/paths.ts` es compartible con cliente; `lib/portfolio.ts` concentra metadatos y validación de locale en servidor.
- El mockup solo monta en Soffia. Los escenarios anteriores de vuelo/CRM no se trasladan como evidencia de consumidores de librerías.
- Home, índice y detalle leerán el mismo registro de cada proyecto. La home nueva está preparada como `PortfolioHome`; su integración espera elección del hero.
- Metadatos, JSON-LD y OG usan la identidad del contenido nuevo. Sitemap incorpora las rutas y sus alternativas; la preview queda noindex.
- Conservar MDX, primitivas de layout, CV y enlaces públicos útiles. No añadir un CMS, una base de datos o un framework de animación por este refactor.

## Límites y fuentes

El vault aporta historia; el repo y los canales reales acreditan estado actual. Las fuentes privadas no se copian al bundle público. Assets existentes con nombres, teléfonos o documentos visibles no se montan sin saneamiento.

`DESIGN.md` define las decisiones visuales aceptadas; el código muestra lo implementado. Una discrepancia se registra y corrige, sin convertir automáticamente el código anterior en requisito.
