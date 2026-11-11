# roddcode — criterio visual del portafolio

La web presenta a Alejandro Alvarado y permite examinar su trabajo. El contrato de producto está en [PROJECT_SPEC.md](PROJECT_SPEC.md). La dirección visual queda diferida hasta que el usuario facilite una referencia. Las previews anteriores no están aprobadas; este archivo describe recursos existentes, no una elección pendiente entre A/B. El diseño anterior se conserva localmente en `_old/DESIGN-before-portfolio-refactor.md`.

## Qué conservar y qué cambiar

| Procedencia | Decisión |
|---|---|
| Identidad propia | Conservar Geist, el papel cálido, azul, superficies oscuras puntuales, retrato real y tipografía de lectura clara |
| Topografía existente | Conservar en los assets OG; su uso futuro en el hero queda por evaluar |
| Brainfish | Adaptar jerarquía, aire entre secciones, contraste de superficies y cercanía entre explicación y evidencia |
| Estructura anterior | Llevar profundidad a los casos y trayectoria a About; retirar la demo del hero/home |
| Recursos descartados | Métricas decorativas, testimonios inventados, dashboards ficticios presentados como capturas, robots de stock y afirmaciones absolutas de fiabilidad |

La referencia comercial no decide el contenido ni obliga a copiar su serif, acento lima o composición. La instrucción actual del usuario prevalece sobre este documento; una implementación discrepante no se convierte automáticamente en requisito.

## Tokens

La definición ejecutable vive en `src/app/globals.css`. No añadir colores por componente.

| Uso | Token / valor |
|---|---|
| Fondo / superficie elevada | `paper` #f7f5f0 / `paper-raised` #fdfbf6 |
| Texto principal / cuerpo / secundario | `ink` #15171a / `ink-3` #4e5157 / `ink-4` #6b6e74 |
| Líneas / banda suave | `line` #e4e0d6 / `line-soft` #efebe2 |
| Acciones / acciones sobre oscuro | `accent` #1f4e8c / `accent-night` #5b9bff |
| Superficie oscura / texto / secundario | `night` #0f1411 / `night-ink` #e8eae5 / `night-muted` #adb4ae |
| Estado funcional | Escalas `pass` y `fail`; siempre acompañadas de texto |

`ink-5` se reserva a elementos gráficos, no a texto necesario. Mantener al menos 4.5:1 en texto normal y 3:1 en texto grande y límites esenciales de controles. Los primarios sobre papel usan azul con texto claro y foco azul exterior; los enlaces sobre noche usan `accent-night`.

## Tipografía, ancho y ritmo

- Geist para títulos, texto y controles. Geist Mono solo para fragmentos de código y sintaxis que lo requiera.
- Hero: `clamp(48px, 5.7vw, 79px)` en escritorio; entre 44 y 64 px en móvil, interlínea 1.03. Rol visible, nombre y explicación próxima.
- Títulos de sección: 31–45 px; texto de lectura de casos: 17 px, interlínea 1.8; metadatos: 12–14 px. El tamaño no sustituye contenido.
- `Container` es el único dueño del ancho exterior: 1240 px y gutter existente. Las columnas de lectura tienen un máximo aproximado de 760 px.
- Separación de secciones: `--section-gap`, 56–112 px. Separación de columnas: 48–96 px según función; en móvil, 26 px y una sola columna.
- Controles con radio de 2 px; ilustraciones/covers con radio de 8 px. Sin sombras para fingir capas de producto.
- No numerar proyectos como si fueran una secuencia. Sí numerar pasos de un flujo cuando el orden importa.

## Composiciones y responsabilidades

- **Hero actual:** identidad y titular acordados, texto, proyectos y CV. Reutiliza estilos existentes sin incorporar retrato grande ni mockup.
- **Previews anteriores:** experimentos conservados, rechazados como dirección; no extenderlos al sitio.
- **Trabajos:** capturas anonimizadas de SoffIA y METEOR, y mockup ilustrativo de NDC autorizado por el usuario. Cada recurso se reutiliza en home, índice y caso; la leyenda distingue demo, imagen editada y reconstrucción. El diseño general y el hero siguen pendientes de referencia.
- **Casos:** cabecera, alcance y rol, índice de lectura, columna de contenido y evidencia. Arquitectura como reconstrucción explicativa, sin afirmar que es una captura del producto.
- **Soffia:** demostración explícitamente sintética, ejecutada solo en navegador; reserva válida, rechazo y replay. Su leyenda delimita lo que no prueba.
- **Componentes:** contratos, ejemplos desplazables, límites, pruebas documentadas y consumidores comprobados.
- **About/Writing:** lectura y recorrido personal. Las páginas de lectura mantienen su adaptación a preferencia oscura.

## Implementación, móvil y motion

CSS Modules concentra el layout y dibujo del portafolio en `src/components/portfolio/portfolio.module.css`; Tailwind conserva las páginas MDX/legales y las primitivas existentes. No se añade un framework de animación ni una dependencia visual.

Navegación común sticky; por debajo de 760 px se utiliza un disclosure nativo, con cierre por Escape y foco de regreso. Enlaces ES/EN conservan la ruta. Controles móviles de navegación de 44×44 px; no ocultar destinos para hacer espacio.

Las ilustraciones son estáticas. Motion solo responde a acciones y dura aproximadamente 180 ms. Con `prefers-reduced-motion`, transiciones desactivadas y desplazamiento nativo sin animación. Una demostración no necesita una animación para poder entenderse.

## Revisión visual

Comparar estados equivalentes tras cargar fuentes a 1440×1000 y 390×844. Comprobar también 320 y 1024 px, teclado, foco, overflow y lectura. Los checks y capturas observados se registran en [EVALS.md](EVALS.md); la comprobación de lectura y funcionamiento no acredita aprobación estética del diseño.
