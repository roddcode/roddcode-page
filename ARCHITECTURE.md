# Arquitectura de roddcode-page

Portafolio Next.js App Router con contenido local tipado y MDX. La home y los interiores comparten navegación, identidad y metadatos. El sitio describe productos; no contiene sus backends.

| Área | Fuente y responsabilidad |
|---|---|
| Identidad | `src/content/portfolio/identity.ts`; hero, footer, metadatos, JSON-LD y OG |
| Proyectos | `src/content/portfolio/projects.ts`; hechos comunes, traducciones ES/EN, publicación, destacados y relaciones |
| Narrativas | `src/content/work/{es,en}/*.mdx`; secciones propias de cada caso |
| Render de casos | `src/lib/work.tsx`; valida contra el registro publicado, lee MDX local y genera anchors e índice a partir de h2 |
| Librerías y persona | `src/content/portfolio/packages.ts` y `about.ts` |
| Vistas | `src/components/portfolio/`; shell, home, casos, open source, About y demo |
| Imágenes de proyectos | `ProjectArt` comparte capturas anonimizadas de `public/work` y el mockup estático `NdcPreview`; los originales se conservan fuera de public |
| Rutas | `[locale]`, `work`, `work/[slug]`, `open-source`, `about`; generadas desde el registro |
| Writing | MDX y URLs originales preservados; relación con casos mediante `relatedPosts`; `kind` opcional sin filtros vacíos |
| Idioma | Proxy y next-intl; ES sin prefijo, EN en `/en`; `/api/locale` conserva un retorno local validado |
| Lectura y legales | `PageShell` comparte header/footer; `/writing`, `/privacidad`, `/seguridad` |
| Distribución | Sitemap incluye únicamente casos publicados; OG, RSS y redirects de CV existentes |

## Extensión

Añadir un registro ES/EN y sus dos narrativas. `draft` impide rutas públicas y entradas en índices/sitemap. `featured` selecciona la home. `availability` describe el producto o encargo. Highlights y relaciones son opcionales; `ProjectHighlights` permite reutilizar el extracto del registro en MDX sin duplicar su cifra. Las ilustraciones conocidas tienen fallback genérico para futuros casos.

El loader compila exclusivamente archivos del repositorio, nunca MDX suministrado por visitantes. Solo expone componentes de contenido controlados. El header cliente importa identidad y paths sin arrastrar el acceso al sistema de archivos.

## Interacción y transición

La demo solo se monta en SoffIA: aceptación, conflicto, replay y reset con estado sintético local. `LegacyLinks` mantiene los anchors históricos de la home. Los escritos mantienen su contenido y reciben enlaces contextuales a casos, además del rol compartido del autor.

El contenido anterior de `src/content/home` y sus componentes se conserva como material de transición, pero ya no alimenta la home pública. `/design-preview` conserva trabajo previo no aprobado y está excluido de indexación. No se añaden CMS, base de datos ni dependencias para esta estructura.

El sistema visual sigue documentado en [DESIGN.md](DESIGN.md), sujeto a la referencia pendiente del usuario. Los assets con información de terceros no se montan sin saneamiento.
