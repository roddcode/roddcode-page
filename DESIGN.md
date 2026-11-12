# roddcode — criterio visual del portafolio

La web presenta a Alejandro Alvarado y permite examinar su trabajo. La identidad visual queda aprobada como definitiva por el usuario: Geist, papel cálido, tinta y azul, con la familia nocturna neutral y los matices de contraste descritos aquí. Las referencias posteriores orientan únicamente composiciones y componentes; no reabren la paleta ni la tipografía. Las previews rechazadas se retiraron; no existe una elección pendiente entre A/B.

## Qué conservar y qué cambiar

| Procedencia | Decisión |
|---|---|
| Identidad propia | Conservar Geist, el papel cálido, azul, superficies oscuras puntuales, retrato real y tipografía de lectura clara |
| Topografía existente | Conservar en OG y reutilizar como textura sutil en hero y contacto; máximo dos usos en home |
| Brainfish | Adaptar jerarquía, aire entre secciones, contraste de superficies y cercanía entre explicación y evidencia |
| Estructura anterior | Llevar profundidad a los casos y trayectoria a About; retirar la demo del hero/home |
| Recursos descartados | Métricas decorativas, testimonios inventados, dashboards ficticios presentados como capturas, robots de stock y afirmaciones absolutas de fiabilidad |

La referencia comercial no decide el contenido ni obliga a copiar su serif, acento lima o composición. La instrucción actual del usuario prevalece sobre este documento; una implementación discrepante no se convierte automáticamente en requisito.

## Tokens

La definición ejecutable vive en `src/app/globals.css`. No añadir colores por componente.

| Uso | Token / valor |
|---|---|
| Fondo / superficie elevada | `paper` #f7f5f0 / `paper-raised` #fdfbf6 |
| Texto principal / cuerpo / secundario | `ink` #15171a / `ink-3` #4e5157 / `ink-4` #6b6e74 / metadatos esenciales `meta` #60646b |
| Líneas / banda suave | `line` #e4e0d6 / `line-soft` #efebe2 |
| Acciones / acciones sobre oscuro | `accent` #1f4e8c / `accent-night` #5b9bff |
| Superficie oscura / texto / secundario | `night` #12161c / `night-ink` #e8eaf0 / `night-muted` #b1b8c2 |
| Estado funcional | Escalas `pass` y `fail`; siempre acompañadas de texto |

`ink-5` se reserva a elementos gráficos, no a texto necesario. Mantener al menos 4.5:1 en texto normal y 3:1 en texto grande y límites esenciales de controles. Los primarios sobre papel usan azul con texto claro y foco azul exterior; los enlaces sobre noche usan `accent-night`.

## Superficies

Dos niveles por tema. El cambio de superficie separa las bandas de la home; las líneas quedan como apoyo local, no como separador principal.

| Nivel | Claro | Oscuro | Uso |
|---|---|---|---|
| `--surface-0` | #F7F5F0 | #12161C | Header, Selected work, Contact, Footer |
| `--surface-1` | #FDFBF6 | #19212B | Hero, Open source, About, Writing |

Las bandas ocupan el ancho del viewport; `Container` conserva el máximo de 1240 px y el gutter. La topografía se reutiliza solo en Hero y Contact. No se añaden sombras, degradados ni bordes globales para separar secciones.

## Tipografía, ancho y ritmo

- Geist para títulos, texto y controles. Geist Mono solo para fragmentos de código y sintaxis que lo requiera.
- Hero: `clamp(46px, 6vw, 86px)` en escritorio y `clamp(40px, 8vw, 60px)` en móvil, interlínea 1.04. Rol visible, nombre y explicación próxima.
- Títulos de sección: 31–45 px; texto de casos: 17 px, interlínea 1.7; Writing: 17 px, interlínea 1.72; metadatos: 12–14 px. El tamaño no sustituye contenido.
- `Container` es el único dueño del ancho exterior: 1240 px y gutter existente. El índice de Writing usa el ancho de Container; los artículos usan una columna centrada de 760 px y prosa de 68ch; los casos conservan su columna con índice lateral.
- Separación de secciones: `--section-gap`, 56–112 px. Separación de columnas: 48–96 px según función; en móvil, 26 px y una sola columna.
- Acciones con radio de 2 px; capturas con radio de 8 px; el mockup NDC utiliza 26 px y recortes laterales para representar un billete. Esta excepción pertenece al recurso ilustrativo. Sin sombras para fingir capas de producto.
- No numerar proyectos como si fueran una secuencia. Sí numerar pasos de un flujo cuando el orden importa.

## Composiciones y responsabilidades

- **Hero actual:** identidad y titular acordados, texto, proyectos y CV. Topografía propia con máscara, sin retrato grande ni mockup. Menor separación antes de los proyectos.
- **Tema global:** Botón sol/luna de 44×44 px en la navegación: alterna claro/oscuro con clic, Enter o Espacio. Sigue el sistema hasta la primera elección manual, que persiste entre visitas. Transición de iconos de 200 ms y reduced motion sin animación. Todas las rutas comparten los tokens; Open source, About y Writing comparten `surface-1`; Contacto y footer comparten `surface-0`, sin transición cromática entre ambos. Contacto conserva textura y mayor escala tipográfica.
- **Contacto interactivo:** conserva la animación ambiental y el relieve que sigue al puntero. Al hacer click, un anillo de color recorre las curvas existentes y un relieve ligero las desplaza; no rehace la topografía. El anillo se expande a 1,8 unidades/s con banda gaussiana y decae durante 4,5 s. El botón principal también dispara el anillo al recibir hover o foco. `prefers-reduced-motion` deja la topografía estática y anula el anillo.
- **Contraste topográfico claro:** ThemeContour ajusta localmente las opacidades a 0,07/0,135 en hero y 0,14/0,24 en contacto, con el azul existente #1f4e8c. Contacto claro usa canvas a 0,85 y máscara de 25 % a 100 %; la noche y los presets usados por OG conservan sus valores.
- **Previews anteriores:** experimentos conservados, rechazados como dirección; no extenderlos al sitio.
- **Trabajos:** capturas anonimizadas de SoffIA y METEOR y diagrama explicativo de integración/migración NDC en home, índice y cabecera del caso. Sin leyendas visibles bajo las imágenes; la procedencia se conserva en textos accesibles. El ticket ficticio pertenece al flujo NDC dentro del caso, acompañado de explicación contextual. La composición general y del hero se evaluará con referencias, manteniendo la identidad aprobada.
- **Casos:** cabecera, alcance y rol, índice de lectura, columna de contenido y evidencia. Arquitectura como reconstrucción explicativa, sin afirmar que es una captura del producto.
- **Soffia:** demostración explícitamente sintética, ejecutada solo en navegador; reserva válida, rechazo y replay. Su leyenda delimita lo que no prueba.
- **Código abierto:** dos entradas compactas en la home con nombre, versión, descripción y enlace directo al repositorio. La documentación técnica vive junto al código; sin página independiente ni enlace propio en la navegación.
- **About/Writing:** el resumen personal conserva la frase sobre física y muestra formación, tecnologías y tres experiencias del registro compartido. Writing usa cabecera y filas de ancho completo, con metadatos/título/flecha en escritorio y filas apiladas en móvil. Open source, About y Writing conservan surface-1 con un ritmo más compacto y composiciones distintas.

## Implementación, móvil y motion

Cada componente de `src/components/portfolio/` tiene su CSS Module; `shared.module.css` conserva los estilos comunes, reutilizados con composición CSS; Tailwind conserva las páginas MDX/legales y las primitivas existentes. No se añade un framework de animación ni una dependencia visual. La iluminación de Contact vive en el shader WebGL existente: modifica el color y la opacidad de las líneas, sin una capa de color superpuesta.

Navegación común sticky; por debajo de 760 px se utiliza un disclosure nativo, con cierre por Escape y foco de regreso. Enlaces ES/EN conservan la ruta. Controles móviles de navegación de 44×44 px; no ocultar destinos para hacer espacio.

Las ilustraciones técnicas son estáticas. La topografía reutiliza ContourField, se inicializa cerca del viewport y pausa fuera de pantalla; con reduced motion permanece estática. Las transiciones de controles duran 160 ms y se desactivan con `prefers-reduced-motion`, junto con el desplazamiento suave.

## Revisión visual

La base de controles es shadcn adaptada a los tokens existentes: Button y Tooltip sobre Radix. Hover, pressed y foco comparten duración de 160 ms y easing cubic-bezier(0.2, 0.8, 0.2, 1); las flechas se desplazan hasta 2 px y pressed hasta 1 px. La navegación activa tiene marca además del color. Las filas editoriales responden como área enlazada. Reduced motion desactiva las transiciones y desplazamientos.

Por petición del usuario, los bloques incorporan una aparición de 460 ms y 12 px, una vez al entrar en pantalla. No se animan cabecera fija ni fondo topográfico; el contenido sigue visible sin JavaScript. Work tiene índice propio y los casos comparten una columna de lectura de unos 70ch, índice lateral activo, índice móvil desplegable y recursos relacionados con jerarquía visual.

Comparar estados equivalentes tras cargar fuentes a 1440×1000 y 390×844. Comprobar también 320 y 1024 px, teclado, foco, overflow y lectura. La comprobación de lectura y funcionamiento no acredita aprobación estética del diseño.

## Familia de tokens vigente

Los tokens genéricos iniciales mantienen compatibilidad con primitivas existentes. Las superficies del portafolio usan los tokens semánticos `surface-0/1` y paper/ink/night. No se eliminan tokens con consumidores ni se interpretan como otra identidad disponible. `meta` distingue metadatos importantes de texto incidental `ink-4`, con override propio en lectura oscura.

Noche: fondo #12161c, superficie #1b212a y línea #303946. Lectura oscura: superficie #1d2530, línea #3b4656 y banda #2b3543. Los assets OG se regeneran desde el escenario para reflejar el nuevo fondo.

### About: trayectoria completa
La presentación personal y la formación preceden a una trayectoria de ancho completo: fecha, puesto/organización y contribución con tecnologías. Las siete entradas permanecen visibles; en móvil cada fila se apila. El método cierra en tres columnas de lectura en escritorio y una en móvil. La home conserva tres entradas y enlaza directamente a las restantes con un contador derivado del registro, sin una segunda lista de hechos.

### Writing: índice y lectura
El índice comparte Container (1240 px), escala de títulos y filas enlazadas del portafolio. Fecha y tiempo de lectura usan Geist de 13 px, sin mayúsculas forzadas, etiquetas de series sin editar ni metadatos de 11 px. Artículos centrados a 760 px, texto de 17 px/1.72 y títulos adaptables de 34–52 px; en móvil se apilan metadatos y títulos sin recortes.
PostList sirve al índice y a Read next con niveles de encabezado correctos. Acciones de retorno, RSS, compartir y recursos relacionados usan Button compartido; copia de código usa Button/Tooltip con 44 px, feedback de éxito/error y acceso de teclado al scroll horizontal. El diagrama de autenticación usa tokens semánticos y se apila en móvil.
Apariciones: cabecera, filas, títulos de sección y recursos; nunca ocultar el ensayo entero. Se reinician al cambiar de URL mediante navegación cliente; reduced motion deja todo visible. La barra de lectura actualiza transform con requestAnimationFrame, sin transición ni renders de React durante scroll. Se preservan los títulos y URLs de los ensayos. Los cambios editoriales se limitan a aclarar alcances técnicos; no introducen resultados o experiencias nuevos.

## Cierre de publicación

Los alias de shadcn resuelven a los tokens del portafolio, sin una paleta de compatibilidad separada. El cambio de tema es local; los 200 ms del icono son una transición visual. Idioma conserva la cookie y la ruta mediante redirección explícita. No se añade un enlace de saltar al contenido, por decisión del usuario.

La topografía conserva su programa WebGL al alternar tema: se actualizan la paleta y el acento, sin repetir la compilación ni volver a esperar el idle inicial. La inicialización cerca del viewport y la pausa fuera de pantalla se mantienen.
