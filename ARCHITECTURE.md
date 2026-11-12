# Arquitectura

Portafolio Next.js App Router con contenido local, ES/EN y ensayos en inglés. Este repositorio presenta proyectos; no contiene sus backends.

## Fuentes de contenido

| Área | Fuente |
|---|---|
| Identidad | src/content/portfolio/identity.ts |
| Casos y metadatos ES/EN | src/content/portfolio/projects.ts |
| Experiencia y formación | src/content/portfolio/about.ts |
| Librerías | src/content/portfolio/packages.ts |
| Narrativas de casos | src/content/work/{es,en}/<slug>.mdx |
| Ensayos | src/content/writing/<slug>.mdx |
| Recursos visuales | src/components/portfolio/project-media.ts |

Home, índices y cabeceras consumen el mismo registro de hechos. Los casos tienen narrativa propia; no se exige un incidente o una métrica a todos los proyectos.

## Composición

- PortfolioShell y PageShell comparten Header/Footer y límites de interacción. Container conserva ancho y gutter.
- CaseStudy compone portada, metadatos, narrativa, recursos y hasta dos casos siguientes.
- getWorkBody compila MDX local y construye IDs e índice desde los h2.
- ProjectArt consume capturas anonimizadas o diagramas; hay fallback para recursos no registrados.
- PostList, PostMeta y ArticleFooter comparten la presentación de Writing. Los artículos tienen medida de lectura propia.
- Button y Tooltip siguen la base shadcn/Radix y los tokens de DESIGN. Los alias de compatibilidad resuelven a esos mismos tokens.
- El campo topográfico es compartido por hero, contacto y generación de OG. No es parte de la home retirada.

Las vistas permanecen como Server Components salvo controles e interacciones que requieren navegador.

## Publicación y extensión

Work separa status (draft/published), featured y availability. Solo los registros publicados producen páginas e índices. La narrativa requiere ES/EN; las imágenes son opcionales. validate:content comprueba slugs, traducciones, narrativas y relaciones.

Writing aplica una misma barrera de publicación a detalle y listados. Los nombres con prefijo _ no se cargan mediante URLs públicas; draft: true excluye un artículo de detalle, índice, RSS y sitemap. Los metadatos de archivos visibles se validan explícitamente: cuerpo, título, resumen, fecha real y correspondencia de slug. Un error no se silencia.

El RSS escapa valores XML. El loader solo procesa archivos locales del repositorio. No se aceptan contenidos MDX enviados por visitantes.

## Idioma y tema

next-intl usa ES sin prefijo y EN bajo /en. El cambio explícito pasa por /api/locale, valida un retorno local, fija la cookie funcional y redirige a la misma vista traducida. Las páginas legales tienen retornos propios. Writing conserva su idioma original.

next-themes aplica clase a html y persiste la elección en roddcode-theme. Sigue el sistema hasta elegir manualmente. El tema no requiere una petición al servidor. ContourField conserva la instancia y el programa WebGL al cambiar la paleta; solo actualiza sus parámetros y redibuja. La etiqueta accesible espera al montaje para evitar diferencias de hidratación.

## Movimiento y lectura

PageReveal mejora bloques con IntersectionObserver/Web Animations y observa pathname para layouts persistentes. No oculta el ensayo completo. SSR y lectura sin JavaScript siguen visibles; reduced motion desactiva las apariciones y el foco revela un bloque pendiente.

ReadingProgress usa transform, RAF y ResizeObserver sin renders de React por scroll. CodeBlock usa Clipboard API con éxito/error y limpieza de timers. La demo SoffIA usa estado ficticio en el navegador; el ticket NDC solo ilustra el flujo de su caso.

## Distribución y mantenimiento

Sitemap y RSS usan contenido publicado. Metadatos, imágenes OG y datos estructurados acompañan las rutas. Las URLs anteriores de open source y CV tienen redirecciones; las previews rechazadas ya no se sirven.

Node.js 24 y pnpm 9.5.0. El workflow verify.yml ejecuta lint, validación de contenido, pruebas, build y tipos. Chromium cubre la suite principal; Firefox y WebKit cubren lectura, responsive y controles. Los resultados locales no certifican un despliegue remoto.
