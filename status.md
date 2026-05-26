# Status — roddcode / Core OS

> Proyecto: Portfolio personal + Agencia de desarrollo web
> Fecha: 23 May 2026
> Autor: Alejandro Alvarado

---

## A. RODDCODE.COM — EL PORTFOLIO (FINAL)

### 1. QUÉ ES

Landing page personal de Alejandro Alvarado. No es un CV online, no es un blog (aunque tiene escritura). Es una **página de argumentación**: establece quién es, qué construye, cómo piensa, y por qué un CTO o recruiter debería tomarse 30 minutos para conocerlo.

### 2. PÚBLICO

Dos lectores en la misma página:

| Perfil | Qué busca | Qué lee |
|--------|-----------|---------|
| Recruiter LATAM | Edad, experiencia, empresas conocidas, CV | Hero eyebrow, About, Background, Handshake |
| CTO / Tech Lead international | Arquitectura, decisiones técnicas, código | SoffIA case study, Philosophy, TrustLayer, essays |

La página está diseñada para que el recruiter decida "lo paso" en <90 segundos, y el CTO encuentre profundidad técnica si baja.

### 3. STACK TÉCNICO

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Lenguaje:** TypeScript strict, `noUncheckedIndexedAccess`
- **Estilos:** Tailwind CSS v4, CSS personalizado en `globals.css`
- **Tipografía:** EB Garamond (headings) + Geist Sans (body) + Geist Mono (metadata)
- **CMS:** MDX local (3 essays en `src/content/writing/`)
- **Despliegue:** Vercel, estático generado (SSG)
- **Performance:** Lighthouse 97/100/100/100 (mobile Slow 4G)

### 4. SISTEMA DE DISEÑO

```
--background: oklch(0.12 0 0)        # Fondo casi negro
--foreground: oklch(0.95 0 0)         # Texto principal casi blanco
--muted: oklch(0.17 0 0)              # Fondo secundario
--muted-foreground: oklch(0.72 0 0)   # Labels, metadatos
--secondary-foreground: oklch(0.75 0 0)  # Cuerpo de texto
--tertiary: oklch(0.5 0 0)            # Decorativo (guiones, contadores)
--primary: oklch(0.6 0.15 45)         # Acento bronce/naranja
--border: oklch(0.2 0 0)              # Bordes
--radius-sm: 2px                       # Esquinas quirúrgicas
```

**Principio:** No hay grises genéricos. Cada nivel de texto tiene un propósito de información distinto, no solo estético. El acento bronce (primary) se usa exclusivamente para señalar — métricas, CTAs, datos importantes. No para decorar.

### 5. ESTRUCTURA (10 SECCIONES)

| # | Sección | Propósito | Para quién |
|---|---------|-----------|------------|
| 1 | Header | Nav + ubicación + LinkedIn | Ambos |
| 2 | Hero | Claim principal + eyebrow recruiter + CTAs | Recruiter |
| 3 | LiveMetrics | Señal de calidad: LCP/CLS/TBT/LH | Tech Lead |
| 4 | About | Snapshot: edad, experiencia, inglés, CV | Recruiter |
| 5 | Background | Timeline laboral, 4 roles con ownership | Ambos |
| 6 | CaseStudySoffia | Arquitectura FSM, código real, métricas | Tech Lead |
| 7 | CaseStudyMeteor | CRM enterprise, ROI, Movistar | Recruiter |
| 8 | Philosophy | Cómo piensa: 3 principios + essays | Tech Lead |
| 9 | TrustLayer | Testimonio real (Dra. Jomara), GitHub, Tooling | Ambos |
| 10 | Handshake | CTAs finales: CV, email, calendly | Recruiter |

### 6. DECISIONES DE TASTE (LAS QUE DEFINEN LA PÁGINA)

**Color:**
- LiveMetrics es la idea original del sitio — mostrar las métricas de performance del propio portfolio. Nadie más lo hace.
- El acento naranja se redujo a señal pura: métricas, CTAs, datos "After" en tablas. No se usa para decorar (contadores 01/02/03/04 van en tertiary).
- Callouts importantes usan border-primary/60 (SoffIA ARCHITECTURAL PRINCIPLE, TrustLayer SYSTEM FACT). Un solo acento por callout — no label + border duplicados.

**Tipografía:**
- EB Garamond para h1/h2 (serif editorial, autoridad, artesanía)
- Geist Sans para body (neutral, desaparece, deja leer)
- Geist Mono para metadata, labels, código (precisión)
- Writing index h1 sin font-bold (hereda el weight 500 del sistema global)

**Ritmo:**
- py-24 como unidad base de sección (≈6rem)
- Excepciones: Hero (py-32/py-40), About (py-16 comprimido)
- grid-cols-[120px_1fr] para estructura de timeline/label en left columna

**Lo que se mató:**
- Arsenal (redundante con case studies, frases únicas absorbidas en Background)
- OpenSource como sección separada (fusionado en TrustLayer como "Tooling")
- image-placeholder.tsx (nunca se usó)
- types.ts (archivo vacío con comentario placeholder)
- architecture-diagram.tsx (muerto)
- LinkedIn recommendations (no existen aún)
- `content-visibility: auto` del Hero (para no retrasar LCP)
- Animación de carga diferida en el h1 (animation-delay eliminado)

### 7. LO QUE LA PÁGINA COMUNICA (EL ARGUMENTO COMPLETO)

1. **"Soy joven pero no inexperto."** 21 años, 2.5 años de experiencia, primer sistema profesional a los 18. Enmarcado como densidad, no disculpa.

2. **"Construyo sistemas que funcionan."** Los LiveMetrics son la prueba inmediata. No pide que confíes — demuestra. LCP 0.8s, CLS 0, LH 99.

3. **"Sé de IA en producción."** SoffIA no es un chatbot tutorial. Tiene FSM con inyección dinámica de tools, Loop Shield anti-bucles cognitivos, cost tracking (~$0.001/booking), PostgreSQL con SKIP LOCKED para concurrencia real.

4. **"Sé de enterprise."** METEOR en Movistar, .NET + Vue.js, remplazó InConcert, $1K/mo eliminado, 53% reducción de proceso.

5. **"Tengo principios, no stack del mes."** Los 3 essays de Philosophy conectan con decisiones técnicas del portfolio. No es decoración.

6. **"Estoy evaluando oportunidades, no necesitando trabajo."** El Handshake dice "Initiate connection", no "Hire me." El CV es descargable pero no es el centro. "Evaluating" en vez de "Looking for."

### 8. AUDITORÍA DE TASTE (CLAUDE — VEREDICTO FINAL)

**Enero 2026 (antes):** "Taste en desarrollo, no taste maduro. 13 secciones, acento en demasiados lugares, falta de edición."

**Mayo 2026 (después):** "Taste ejecutado con criterio. La diferencia entre este portfolio y taste maduro no es código — es tiempo y volumen de iteraciones."

**Últimos 3 fixes aplicados:**
- Writing h1: `font-bold` eliminado (rompía sistema tipográfico global)
- Contadores 01/02/03/04: `text-primary` → `text-tertiary` (decoración, no señal)
- ARCHITECTURAL PRINCIPLE label: `text-primary` → `text-muted-foreground` (el border-left ya es señal suficiente)
- System Fact callout: `border-border` → `border-primary/60` (se perdía señal)

**Lo que falta (no es código):**
- Repos open source con más código y READMEs reales
- Recomendación atribuida en LinkedIn
- Más essays escritos con el tiempo

---

## B. CORE OS — LA VISIÓN (SOTA)

### 1. QUÉ ES

Agencia de desarrollo web que construye sistemas digitales **que convierten visitantes en clientes de WhatsApp** para emprendedores peruanos/LATAM.

No vende "páginas web bonitas." Vende "tu negocio en internet, listo para vender en 7 días."

### 2. ESTRATEGIA DE MERCADO (EL CABALLO DE TROYA)

**Problema original:** SoffIA (agente autónomo de IA) es imposible de vender directo a clínicas dental/estética. El mercado rechazó el producto porque requiere educación previa. Intentar vender IA a un dueño de clínica es venderle "cómo funciona el motor" cuando solo quiere "que el carro avance."

**Solución:** Usar el desarrollo web como caballo de Troya.

1. **Vendes la web** — Fácil de vender, concepto conocido, bajo riesgo para el cliente.
2. **Generas tráfico** — Tu web empuja leads a su WhatsApp.
3. **Detectas el cuello de botella** — El cliente recibe más mensajes de los que puede responder.
4. **Upseleas SoffIA** — "Estás perdiendo leads porque no respondes a tiempo. Instalo mi sistema que responde por ti 24/7. Una semana gratis."

**Por qué funciona:** Cuando vendiste IA directo, el cliente no sabía que tenía un problema de conversión (o no quería admitirlo). Cuando tú controlas su web, tú sabes exactamente cuántos leads está perdiendo — y puedes probarlo con datos.

### 3. PÚBLICO OBJETIVO

Emprendedores peruanos y LATAM con negocios establecidos pero sin presencia digital profesional:

| Perfil | Ejemplo | Presupuesto | Dolor principal |
|--------|---------|-------------|-----------------|
| Servicios profesionales | Clínica, consultora, estudio jurídico | S/ 1,990 – 4,990 | No aparecen en Google, web de Wix que no convierte |
| Retail / E-commerce | Boutique, tienda de barrio, marca de alimentos | S/ 3,990 – 9,990 | Venden por Instagram, no tienen tienda online que cobre |
| Talleres / oficios | Mecánico, constructor, técnico | S/ 990 – 1,990 | Sin página web, solo WhatsApp y boca a boca |

### 4. POSICIONAMIENTO (EL MENSAJE)

**Titular:** "Tu negocio en internet, listo para vender en 7 días."

**Subtítulo:** "Diseñamos páginas web, tiendas y embudos enfocados 100% en conseguirte más clientes por WhatsApp. Sin jerga técnica, sin complicaciones."

**Diferenciación real:**
- **Velocidad:** 7 días hábiles vs. 2-3 meses de agencias tradicionales
- **WhatsApp como centro:** No es "integrado" — es el eje del sistema
- **Garantía:** Sin riesgos — "Si no estás satisfecho en 7 días, te devolvemos tu dinero"

### 5. STACK TÉCNICO (SISTEMA DE AGENCIA)

**Para páginas web (el producto principal):**
- **Next.js 16** (App Router, SSG/ISR) — base compartida para todos los proyectos
- **Tailwind CSS v4 + sistema de tokens** — 5 variables por cliente:
  - `--primary`: color de marca del cliente
  - `--primary-foreground`: blanco o negro, calculado para contraste
  - `--radius`: 0 (serio/tecnológico) | 0.25rem (comercial) | 1rem (juguetón)
  - `--font-sans`: Inter (neutro) | Roboto (comercial) | Plus Jakarta Sans (moderno)
  - `--font-heading`: misma que sans, o Merriweather (servicios formales)
- **CMS Headless:** Sanity o Strapi — el cliente edita textos, precios, imágenes. Nunca código.
- **Hosting:** Vercel (deploy automático desde CMS)

**Para e-commerce:**
- NO en código puro. WooCommerce (WordPress) o Shopify según presupuesto y necesidades del cliente.
- El frontend puede ser headless (Next.js) si el presupuesto lo justifica, pero para la mayoría un WooCommerce con template optimizado es más rentable y mantenible.
- Razón: el e-commerce requiere catálogo de productos, inventario, pasarela de pago, envíos, facturación. Son features que no se justifica construir desde cero para cada cliente.

**Backend común (el Caballo de Troya técnico):**
- Endpoint de WhatsApp unificado (vía Evolution API)
- Webhook de telemetría que mide: mensajes recibidos, respondidos, ignorados, tiempo de respuesta
- Panel interno (solo para Core OS) que alerta cuando un cliente está saturado (30+ leads/hora sin respuesta)
- SoffIA como módulo enchufable: cada web ya tiene el componente de WhatsApp que habla con nuestro backend. Cuando se activa SoffIA, es un flag de `false` a `true`. No hay integración nueva.

### 6. ARQUITECTURA DE BLOQUES

No se diseñan páginas — se ensamblan bloques.

```
Navbars (3):
- E-commerce: con carrito + búsqueda
- Landing: con CTA grande
- Corporativo: con dropdowns

Heroes (4):
- Split texto/imagen
- Centrado (webinars, servicios)
- E-commerce con producto destacado
- Video de fondo (confianza)

Señales de confianza (3):
- Carrusel de logos de clientes
- Grid de testimonios (con foto real del cliente)
- Sellos de pago seguro (Visa, MC, PagoEfectivo)

Features (3):
- Grid 3 columnas con iconos
- Zig-zag (imagen izq / texto der, y viceversa)
- Numeración (proceso paso a paso)

Pricing (2):
- 3 columnas con plan destacado en medio
- Tabla comparativa de features

CTA final (2):
- Botón de WhatsApp flotante (SIEMPRE presente, toda página)
- Formulario de contacto

Footer (2):
- Simple (links + redes)
- Gordo (links SEO, políticas, RUC visible)
```

### 7. PRECIOS (EN SOLES PERUANOS)

Tres niveles, precios visibles (sin "cotice aquí"):

| Plan | Qué incluye | Precio |
|------|-------------|--------|
| **Básico** | Landing page 1 página, WhatsApp integrado, formulario, SEO básico, hosting 1 año | S/ 1,990 |
| **Profesional** | Web multi-página (5 páginas), blog, integración redes, panel de edición (CMS), hosting 1 año | S/ 4,990 |
| **E-commerce** | Tienda online completa (hasta 50 productos), carrito, pasarela de pago, dashboard de ventas, hosting 1 año | S/ 9,990 |

Pago: 50% al inicio, 50% contra entrega. Garantía de 7 días: si no funciona técnicamente, devolución del 100%.

### 8. EL FLUJO DEL CABALLO DE TROYA (DÍA A DÍA)

**Día 1-7:** Cliente compra web. Se entrega en 7 días hábiles.

**Día 8-30:** La web genera tráfico. El botón de WhatsApp empieza a sonar. El cliente responde manualmente — al principio bien, luego empieza a saturarse.

**Día 30:** Nuestro panel de telemetría detecta que el cliente tiene 25+ mensajes sin responder en horario no laboral. Recibimos alerta automática.

**Día 31:** Llamada de seguimiento (no venta, seguimiento).
"Oye [cliente], he visto en las métricas que tu web está trayendo harta gente, pero hay muchos mensajes de WhatsApp que entran después de las 8pm y se quedan sin respuesta. Estás perdiendo ventas ahí. Te propongo algo: te instalo un sistema que responde automáticamente los mensajes de WhatsApp en 5 segundos, programa citas, y te deja la venta lista. Lo tienes una semana gratis para que veas cuántas ventas recuperas. Si no te gusta, lo apagamos y seguimos igual."

**Día 38:** El cliente ha recuperado ventas. Se queda con SoffIA. Upsell exitoso.

### 9. LO QUE NO SE HACE

- **No se vende tecnología.** No se menciona Next.js, React, Tailwind, Vercel, serverless, FSM, LLM, AI, agente autónomo.
- **No se educa al mercado.** Si el cliente no sabe que necesita algo, no se lo explicas — resuelves su problema sin nombrarlo.
- **No se construye e-commerce en código puro.** WooCommerce o Shopify. Construir un carrito de compras + pasarela de pago + inventario + envíos desde cero para cada cliente no escala.
- **No se compite en diseño.** Se compite en velocidad de entrega, confianza y resultados de negocio.

### 10. TASTE PARA LA PÁGINA DE CORE OS

El portfolio roddcode.com es minimalismo editorial (oscuro, serif, bronce, espacios generosos). Core OS es **lo opuesto** — y está bien.

| Propiedad | roddcode.com | Core OS |
|-----------|-------------|---------|
| Fondo | Oscuro (oklch 0.12) | Claro (blanco / gris muy claro) |
| Color principal | Bronce (oklch 0.6 0.15 45) | Azul corporativo o similar |
| Tipografía | EB Garamond + Geist | Inter / Roboto |
| Sensación | Editorial, técnico, selectivo | Comercial, confiable, accesible |
| Público | CTOs gringos + recruiters | Emprendedores peruanos |
| Llamado a acción | "Initiate Handshake" | "Habla con nosotros" / "Cotiza ahora" |

No es un downgrade. Es adecuación al mercado. Al emprendedor peruano no le importa tu taste — le importa que su negocio se vea profesional y venda más.

### 11. PRÓXIMOS PASOS

1. Definir si la página de Core OS se construye en roddcode.com/ruta o dominio separado
2. Armar landing de Core OS con los 6 bloques base (Hero → Problema → Solución → Precios → Testimonios → CTA)
3. Elegir CMS headless (Sanity vs Strapi)
4. Construir el panel de telemetría interno (webhook + dashboard)
5. Definir la guía de estilos de Core OS (colores, tipografía, componentes base)
6. Probar con 1-2 clientes manualmente antes de automatizar
7. Construir la biblioteca de bloques reutilizables
8. Documentar el flujo de upsell SoffIA + preparar scripts de seguimiento

---

## C. ACTIVOS REALES: CASOS DE ESTUDIO EN ESPAÑA

### Cliente: Cristóbal — Almería, España

**Relación:** Lo consiguió un socio. El socio le hizo las páginas en system.io (quedó horrible). Cristóbal pidió migrar a Next.js. El desarrollador anterior (el mismo Alejandro, hace meses) copió el diseño de system.io sin mejorarlo. Ahora se refactoriza gratis a cambio de dos case studies reales.

**Negocios:**
- `autoglassbox.com` — Cristalería de automóvil (reparación/sustitución de lunas, tintado, pulido de faros) en Almería
- `laminaspro.com` — Láminas solares, decorativas y de protección para hogar/oficina

**Estado actual de laminaspro.com (inspeccionado vía HTML):**
- Migrado a Next.js + shadcn/ui (Button, Dialog, DialogContent, Image)
- Geist Sans default (sin carácter, parece starter template)
- Acento `#b4934c` (dorado) sobresaturado: títulos, iconos, backgrounds, divisores
- Hero con video mp4 + botón WhatsApp "Solicita un estudio privado >"
- Sección value prop: "Ilumina tu espacio" + 3 bullets planos (Sin calor excesivo / Sin miradas indiscretas / Sin daños solares) — débil, no engancha
- Separador gris `h-8 bg-gray-200` entre secciones (cutre)
- 3 features con iconos SVG + métricas grandes (95% / 91% / +99%) sobre bg image
- Grid de servicios con imágenes webp + modal de contacto (shadcn Dialog)
- Sección interactiva de opacidad: usuario selecciona 0%/70%/50%/15%/5%, cambia imagen de fondo
- Footer con Google Maps iframe + teléfono + email
- Botón flotante WhatsApp verde (icono de FontAwesome)

**Estado actual de autoglassbox.com:**
- Pendiente de inspección visual completa (asumo mismo patrón: Next.js, diseño heredado de system.io)

---

## D. SIMULACIÓN: LOS PRIMEROS 10 CLIENTES (CON 0 REPUTACIÓN)

### Premisa

Nadie te conoce. No tienes inbound, no tienes marketing, no tienes casos de éxito publicables. Tus primeros clientes no son "ideal customer profiles" — son las personas que ya confían en ti (familia, ex-compañeros, contactos de trabajos anteriores), o personas que no pueden pagar una agencia establecida y encontraron tu perfil en LinkedIn/Instagram.

Cada cliente está simulado con nombre ficticio, situación realista para Perú, y el dolor real de trabajar con él. No hay sugar-coating.

---

### CLIENTE 1: «El favor familiar» — Tía con boutique de ropa

| Campo | Valor |
|-------|-------|
| **Quién** | Tía Rosa, 52 años. Boutique de ropa de mujer en Gamarra (La Victoria). 10 años en el negocio. Vende por Instagram y WhatsApp. |
| **Cómo llegó** | Le pediste el favor. "Tía, estoy empezando mi agencia de páginas web, ¿te hago tu página para que tenga un case study?" |
| **Qué pidió** | "Quiero una tienda online como Ripley, donde la gente pueda comprar con tarjeta, elegir talla, color, y que yo pueda subir mis nuevas colecciones." |
| **Qué necesita** | Catálogo visual en web + todo el checkout hacia WhatsApp. Sus clientas son mujeres de 30-55 que le compran porque la conocen. Van a preguntar talla, tela, "¿me queda?" antes de comprar. Un checkout de tarjeta va a tener 80% abandono. |
| **Presupuesto real** | Cero. Es un favor. Pagó S/ 0. "Te ayudo con la comida cuando vengas." |
| **Stack usado** | Next.js + Sanity (gratis en desarrollo). Catálogo visual con botón de "Consultar por WhatsApp" que arma mensaje con foto del producto + talla seleccionada. |
| **Cómo fue** | Te cambió los colores 4 veces. Te pidió añadir "mis hijos" en una sección. La foto que te pasó era 0.3px en WhatsApp reenviada 12 veces. Le explicas que Sanity es para editar — nunca entró. Terminaste actualizando tú los precios cada vez que cambiaban. |
| **Dolor no esperado** | "Tía, edítalo desde Sanity." — "No entiendo eso, hazlo tú." Terminaste haciendo updates manuales de precios por 3 meses hasta que te cansaste. No podías cobrarle. |
| **Upsell SoffIA** | No aplica. No tuvo suficiente tráfico para saturarse. Su negocio es walk-in y referidos. |
| **Neto para ti** | Portfolio piece. Aprendiste que "darle control al cliente" es más fácil decirlo que lograrlo. También aprendiste que Sanity mobile no es viable para dueñas de negocio. |
| **Lección** | Si no pagó, no tiene incentivo para aprender tu sistema. Amigos y familia = gratis duele más de lo que ayuda. Hacerlo igual si es tu primer portfolio piece, pero con fecha de término fija. |

---

### CLIENTE 2: «El ex-compañero freelance» — Diseñador UX que se independizó

| Campo | Valor |
|-------|-------|
| **Quién** | Carlos, 28 años. UX Designer. Trabajó contigo en VML. Renunció hace 6 meses y ahora hace freelance para startups. |
| **Cómo llegó** | Le escribiste por LinkedIn: "Oye, estoy armando mi agencia web, ¿necesitas página?" |
| **Qué pidió** | "Quiero un portafolio donde mostrar 5 case studies, con imágenes grandes, que cargue rápido, y que tenga un blog." |
| **Qué necesita** | Una landing de servicios, no un portafolio tradicional. Él no busca empleo — busca clientes. Su portafolio es irrelevante si nadie lo ve. Necesita: Hero que venda, señales de confianza, CTA a calendly. |
| **Presupuesto real** | S/ 1,200. Te dijo "amigo, dame precio." Le cobraste S/ 1,500. Aceptó. Pagó a los 45 días. |
| **Stack usado** | Next.js + Sanity (portfolio multi-página). 5 case studies, blog integrado, metadata para SEO. |
| **Cómo fue** | Fácil técnicamente. Pero la comunicación fue intermitente — él tiene clientes, no prioriza su web. Te mandaba respuestas 5 días después. El proyecto tomó 3 semanas de calendario, 5 días de trabajo real. |
| **Dolor no esperado** | Te pidió 3 iteraciones de diseño porque "no se sentía él." Cada iteración era cambiar fonts y colores que él mismo eligió. No sabía lo que quería hasta que lo veía. |
| **Stack que debiste usar** | El mismo. Para servicios profesionales, Next.js + Sanity es perfecto. |
| **Upsell SoffIA** | No aplica (no tiene WhatsApp de ventas). Pero te refirió a... |
| **Neto para ti** | S/ 1,500. Primer cliente que paga. Primer caso de estudio publicable (sin NDA). Portfolio piece legítimo. |
| **Lección** | Ex-compañeros = pagan menos que un desconocido, pero pagan. Y te refieren. El tiempo de comunicación es el bottleneck, no el código. |

---

### CLIENTE 3: «La clínica que rechazó SoffIA» — Vuelves con el caballo de Troya

| Campo | Valor |
|-------|-------|
| **Quién** | Dr. Miguel, 45 años. Director de Clínica Dental "Sonrisa Perfecta" en San Isidro. Le ofreciste SoffIA hace 3 meses, te dijo "no, está muy caro, no lo necesito." |
| **Cómo llegó** | Le enviaste un WhatsApp: "Doctor, estuve pensando en lo que me dijo. Ahora estoy haciendo páginas web para clínicas. Una landing profesional, con WhatsApp integrado, que le consiga pacientes. ¿Le interesa ver una propuesta?" |
| **Qué pidió** | "Quiero una web bonita con todos mis servicios, antes y después, y un sistema de reservas online." |
| **Qué necesita** | Una landing de promociones + WhatsApp. Las pacientes de clínica dental NO reservan en un calendario sin hablar antes. Preguntan precio, dolor, financiamiento, horarios. El calendario es humo. |
| **Presupuesto real** | S/ 3,500. Negociaste de S/ 4,990 a S/ 3,500 porque "es la primera vez que trabajan juntos." Pagó 50% adelantado, 50% contra entrega. |
| **Stack usado** | Next.js + Sanity. Landing 1 página: Hero con promo del mes, servicios con precio, antes/después (fotos reales censuradas que ya tenían del intento de SoffIA), CTA masivo a WhatsApp, Google Maps embebido. |
| **Cómo fue** | Fluido. Ya tenías confianza con él. No pidió cambios de diseño porque "tú eres el experto." Aprobó a la primera. El proyecto tomó 4 días. |
| **Dolor no esperado** | Quería que también manejes sus Google Ads y Facebook Ads. "Ya que estás, ¿no?" Tuviste que decir que no. |
| **Upsell SoffIA** | **Este es el blanco perfecto.** Web + WhatsApp funcionando. En 2-3 meses, cuando tenga flujo constante de leads por WhatsApp, le dices: "Doctor, he visto que recibe mensajes después de hora. ¿Quiere probar gratis el sistema que responde automáticamente?" |
| **Neto para ti** | S/ 3,500. Cliente recurrente potencial. Caso de estudio para clínicas. |
| **Lección** | Las puertas que cerró SoffIA se reabren cuando vuelves con una oferta más fácil. El caballo de Troya funciona exactamente como lo planeaste. |

---

### CLIENTE 4: «El amigo del cole con un emprendimiento» — Helados artesanales

| Campo | Valor |
|-------|-------|
| **Quién** | Jhon, 22 años. Amigo del colegio. Emprendió "Helados Don Jhon" hace 1 año. Vende por Instagram y delivery. |
| **Cómo llegó** | Lo viste en Instagram vendiendo helados. Le enviaste DM: "Bro, he visto tus helados, bacán. ¿Tienes página web o solo Instagram?" |
| **Qué pidió** | "Quiero una página donde la gente vea los sabores, precios, y pueda pedir." |
| **Qué necesita** | Menú digital con fotos + pedido por WhatsApp. Cada sabor con foto, precio, descripción. El usuario arma su pedido y se envía a WhatsApp del negocio. |
| **Presupuesto real** | S/ 800. Te dijo "estoy empezando, no tengo mucho." Le dijiste que sí porque es amigo y quieres el case study. Pagó S/ 500 al inicio, S/ 300 al final. |
| **Stack usado** | PWA con Next.js. Sin CMS (muy caro para S/ 800). Los sabores y precios los cambias tú cuando él te avisa. |
| **Cómo fue** | El proyecto más fácil técnicamente. Pero el lazy loading de las fotos de helados era un desastre porque las fotos eran todas desde su celular sin buena luz. Le pediste fotos profesionales — nunca las hizo. "Así nomás, total se ve el helado." |
| **Dolor no esperado** | "Oye, ¿puedes también hacerle los diseños para Instagram?" — No es servicio web, pero te tomó 2 horas hacerle 5 templates de Canva. No le cobraste. |
| **Stack que debiste usar** | Para S/ 800 no vale la pena poner CMS. Un JSON estático + CI/CD que actualiza cuando pusheas cambios es más rápido. |
| **Upsell SoffIA** | Tráfico bajo (<10 pedidos/día). No se satura. Upsell no viable aún. |
| **Neto para ti** | S/ 800. Bajo. Pero es contenido para redes: "Hice la web de un emprendedor peruano." |
| **Lección** | Amigos pagan poco pero te dan contenido. El problema de fotos de producto es constante en Perú — el 90% de emprendedores no tiene fotos profesionales. Necesitas ofrecer sesión de fotos con celular (o aliarte con alguien que lo haga). |

---

### CLIENTE 5: «El referido del ex-compañero» — Startup de repuestos

| Campo | Valor |
|-------|-------|
| **Quién** | Manuel, 35 años. Dueño de "Repuestos Rápidos EIRL". Vende repuestos de autos a talleres mecánicos. Operación B2B. |
| **Cómo llegó** | Carlos (Cliente #2) le recomendó. "Mi amigo hace páginas web, está bacán." |
| **Qué pidió** | "Necesito una página donde los talleres vean mi catálogo de repuestos con precios, stock, y puedan pedir." |
| **Qué necesita** | Catálogo B2B con precios visibles + cotización por WhatsApp. Los talleres compran por lote, no por unidad. Quieren ver precio, preguntar disponibilidad, y pedir. No necesitan carrito — necesitan una "lista de deseos" que se envía como mensaje de WhatsApp estructurado. También necesita stock actualizado. |
| **Presupuesto real** | S/ 4,500. Negociaste de S/ 5,990. Pagó 50/50 sin problema. |
| **Stack usado** | Next.js + Sanity (catálogo de productos con precios). El CMS para que él actualice stock y precios. WhatsApp integrado para cotizaciones. |
| **Cómo fue** | Cliente serio. Sabía lo que quería. Pagó a tiempo. Pero tenía un Excel con 300 repuestos y los precios estaban desactualizados. Te tomó 2 días limpiar datos y normalizarlos. |
| **Dolor no esperado** | El stock en su cabeza no coincidía con el stock real. Vendía algo que ya no tenía y quedaba mal. No es problema tuyo, pero el cliente te culpa a ti ("tu página dice que hay"). Tuviste que ponerle un disclaimer: "Sujeto a disponibilidad. Confirmar stock antes de comprar." |
| **Upsell SoffIA** | Potencial. Si el volumen de cotizaciones crece, querrá automatizar respuestas de WhatsApp. Pero es B2B — las cotizaciones son personalizadas. SoffIA no resuelve cotizaciones B2B complejas fácilmente. |
| **Neto para ti** | S/ 4,500. Mejor proyecto hasta ahora. S/ 4,500 por ~8 días de trabajo. |
| **Lección** | Clientes B2B pagan mejor y son más serios. Pero la limpieza de datos del cliente es siempre tu problema aunque no debería serlo. El referral de Carlos fue clave — un cliente satisfecho te trae otro mejor. |

---

### CLIENTE 6: «El abogado de LinkedIn» — Prospección en frío

| Campo | Valor |
|-------|-------|
| **Quién** | Dr. Ricardo, 40 años. Abogado independiente especializado en derecho laboral. Tiene un estudio pequeño con 2 asociados. |
| **Cómo llegó** | Le enviaste un mensaje en LinkedIn: "Hola Dr. Ricardo, vi su perfil. ¿Tienen página web? Trabajo con estudios jurídicos ayudándoles a conseguir clientes por internet." De 100 mensajes enviados, él fue el único que respondió. |
| **Qué pidió** | "Quiero una página web institucional: Inicio, Quiénes Somos, Servicios, Blog de jurisprudencia, Contacto." |
| **Qué necesita** | Funnel de captura de leads. Los abogados laborales viven de casos nuevos. Necesita un Hero que hable del dolor correcto ("¿Te despidieron injustificadamente? Te ayudamos a pelear tu indemnización."), un formulario que pre-califique al cliente (tipo de caso, monto, fecha), y que derive a WhatsApp para cerrar. |
| **Presupuesto real** | S/ 2,500. Dijo "estoy empezando mi práctica independiente." Aceptaste porque querías probar cold outreach. |
| **Stack usado** | Next.js + Sanity. Landing de 1 página con formulario de pre-calificación que deriva a WhatsApp. Blog de jurisprudencia (para SEO, contenido que él mismo escribe). |
| **Cómo fue** | El cliente más lento del mundo. Te respondía cada 4-5 días. "Es que estoy en juicios." El proyecto tomó 1 mes de calendario, 3 días de trabajo real. |
| **Dolor no esperado** | Quería escribir los textos él mismo. "Es que soy abogado, tengo que cuidar las palabras exactas." Te mandó párrafos de 500 palabras para el Hero. Tuviste que convencerlo de reducir a 15 palabras. Fue una lucha. |
| **Upsell SoffIA** | Buen potencial. Abogados reciben muchos leads que no califican ("¿Cuánto cuesta una demanda?" sin dar detalles). SoffIA puede pre-calificar: tipo de caso, monto, distrito, si ya tiene abogado. Solo pasa los leads calificados al Dr. Ricardo. |
| **Neto para ti** | S/ 2,500. El esfuerzo de venta fue alto (100 mensajes → 1 cliente). La relación esfuerzo/ganancia es baja si haces cold outreach masivo. |
| **Lección** | Cold outreach en LinkedIn: ratio de conversión ~1% para agencias web en Perú. No escala. El costo de adquisición es alto. Mejor invertir ese tiempo en que los clientes existentes te refieran. El abogado es buen candidato para SoffIA pero el proceso de venta fue desgastante. |

---

### CLIENTE 7: «El conocido de la familia» — Taller mecánico

| Campo | Valor |
|-------|-------|
| **Quién** | Don Óscar, 55 años. Dueño de "Taller Óscar" en San Martín de Porres. Mecánica general. 25 años en el rubro. Sin página web, sin Instagram. Todo es walk-in y referidos. |
| **Cómo llegó** | Tu mamá le comentó: "Mi hijo hace páginas web." Él dijo: "Ah sí, necesito una." |
| **Qué pidió** | "Quiero una página para que la gente me encuentre en Google cuando busca 'taller mecánico cerca a mí'." |
| **Qué necesita** | Google My Business optimizado + landing page simple. Su página web real es su Google My Business. Lo que necesita no es una web compleja, es: GMB completo (horarios, fotos de trabajos reales, reseñas), y una landing de 1 página con sus servicios, ubicación, y botón de WhatsApp. El SEO local (GMB) le va a dar más clientes que la web. |
| **Presupuesto real** | S/ 1,200. "Es todo lo que puedo pagar." Aceptaste. |
| **Stack usado** | Next.js, 1 página. Sin CMS (para S/ 1,200 no vale la pena). Texto estático, fotos, Google Maps, WhatsApp. Lo principal fue configurar su GMB con fotos de trabajos reales (le tomaste fotos con tu celular). |
| **Cómo fue** | Lo más valioso no fue la web — fue que le configuraste el GMB. Le llegaron 3 llamadas en la primera semana de personas que lo encontraron en Google Maps. Te llamó emocionado: "¡Está funcionando!" |
| **Dolor no esperado** | No tiene correo electrónico. Todo lo maneja por WhatsApp. Tuviste que crearle un Gmail. No entiende conceptos como "servidor," "dominio," "hosting." Para él, la web existe "en el internet." |
| **Stack que debiste usar** | Una landing de Carrd o similar hubiera sido suficiente. Next.js es overkill para este perfil. Pero no tenías una herramienta más simple en tu stack. |
| **Upsell SoffIA** | No. Su negocio es walk-in. La web y GMB le traen llamadas, no mensajes de WhatsApp masivos. Nunca se va a saturar. |
| **Neto para ti** | S/ 1,200. Pero aprendiste una lección invaluable: el SEO local (GMB) es más importante que la web para negocios de barrio. Y que no todos los negocios necesitan Next.js. |
| **Lección** | No todo cliente califica para tu stack principal. Para negocios ultra-locales, una landing simple + GMB es suficiente. Y a veces la web es el accesorio, no el producto. |

---

### CLIENTE 8: «El referido del amigo de la universidad» — Consultora de RH

| Campo | Valor |
|-------|-------|
| **Quién** | Andrea, 29 años. Fundadora de "TalentoPro", consultora de recursos humanos para PYMEs. 3 años en el mercado. |
| **Cómo llegó** | Un amigo de la universidad (que no te compró nada) te refirió. "Mi amigo hace páginas web." |
| **Qué pidió** | "Quiero una web profesional donde las PYMEs vean mis servicios de selección de personal, capacitación, y planillas." |
| **Qué necesita** | Lo mismo que el abogado: un funnel. Pero ella vende servicios B2B a PYMEs. Sus clientes son dueños de negocio que necesitan externalizar RH. El Hero debe hablar de su dolor: "Deja de perder tiempo en selección de personal." Y un formulario de diagnóstico gratuito que pre-califique y derive a WhatsApp. |
| **Presupuesto real** | S/ 3,500. Negociaste de S/ 4,990. Pagó 50/50. |
| **Stack usado** | Next.js + Sanity. Landing + 3 páginas de servicios + blog + página "Para empresas." |
| **Cómo fue** | La cliente más profesional hasta ahora. Tenía brief, logo, fotos, colores de marca definidos. Sabía lo que quería. Aprobó diseño a la primera. Proyecto tomó 5 días. |
| **Dolor no esperado** | Quería integrar un chatbot. No SoffIA — un chatbot simple de preguntas frecuentes. "Para que responda automáticamente cuando la gente pregunta precios." Tuviste que construirle un chatbot básico o decirle que no. Esto abre la puerta a SoffIA. |
| **Upsell SoffIA** | **ALTO.** Ella ya quiere automatizar respuestas. Si le instalas SoffIA como "el chatbot que responde automáticamente y además agenda entrevistas," es un upsell natural. Además sus clientes son PYMEs — exactamente el perfil que SoffIA puede atender (responder consultas de planillas, beneficios, etc.). |
| **Neto para ti** | S/ 3,500. Cliente con potencial de upsell real. Además es B2B — puede referirte a otras consultoras, sus mismas clientes PYME. |
| **Lección** | Clientes que ya entienden el valor de la automatización son los mejores candidatos para SoffIA. Andrea no necesita que le expliques por qué la IA es útil — ella ya lo pidió. Encuentra a más Andreas y menos Don Óscares. |

---

### CLIENTE 9: «El primo lejano con tienda de gadgets» — E-commerce de accesorios

| Campo | Valor |
|-------|-------|
| **Quién** | José, 25 años. Primo lejano. Vende accesorios de celular (cases, cargadores, audífonos) por Instagram. Vive en Los Olivos. |
| **Cómo llegó** | Te vio en una reunión familiar. "Primo, ¿tú haces páginas web? Ayúdame con la mía." |
| **Qué pidió** | "Quiero una tienda online con carrito de compras, pagos con tarjeta, y delivery tracking." |
| **Qué necesita** | En teoría sí necesita e-commerce real (50+ SKUs, precios variables, 20-30 pedidos/día). Pero su margen es bajo (S/ 10-20 por accesorio). Un Shopify con pasarela de pago le come la ganancia. Necesita WooCommerce con Culqi o Niubiz para pagos en soles sin comisión fija de Shopify. |
| **Presupuesto real** | S/ 1,000. "Es lo que tengo." Es familia, te da vergüenza negociar. |
| **Stack usado** | WooCommerce + tema optimized + hosting en Perú (Wanka o类似). Culqi para pagos con tarjeta. Yape para transferencias. |
| **Cómo fue** | El proyecto más doloroso. WooCommerce + plugins + pasarela de pago + configuración de envío. Todo tomó 2 semanas porque Perú Post no tiene API y el cálculo de envío era manual. Terminaste poniendo "Recoge en tienda" y "Delivery S/ 10 fijo." |
| **Dolor no esperado** | La configuración de Culqi fue un infierno. Documentación desactualizada, SDKs que no funcionaban. Y cuando funcionó, José no entendía por qué no podía recibir Yape directo en la web. "¿Por qué la gente no puede pagar con Yape aquí?" — "Porque Yape no tiene API para comercios, primo." — "Pero todo el mundo usa Yape." |
| **Upsell SoffIA** | Potencial medio. Cuando tenga volumen, SoffIA puede responder preguntas post-venta ("¿dónde está mi pedido?", "¿cambio de producto?"). |
| **Neto para ti** | S/ 1,000. Pero perdiste 2 semanas. Aprendiste que WooCommerce + Perú es doloroso, y que los e-commerce pequeños tienen problemas que no son técnicos (logística real, pasarelas locales, cultura de pago). |
| **Lección** | Familia con e-commerce = paga poco y requiere soporte infinito. WooCommerce en Perú es viable pero tienes que tener la integración de Culqi/Niubiz ya resuelta como módulo reutilizable, no descubrirla cada vez. Si vas a hacer e-commerce en Perú, ten una plantilla de WooCommerce + Culqi + envío fijo lista. |

---

### CLIENTE 10: «El gimnasio del barrio» — Prospección caminando la calle

| Campo | Valor |
|-------|-------|
| **Quién** | "Jhony Fit." Dueño de un pequeño gimnasio en tu distrito. 30 años. Máquinas básicas, clientes del barrio. Sin web, sin Instagram profesional. |
| **Cómo llegó** | Pasaste por el front, viste que no tenía web. Entraste y le dijiste: "Oye, soy del barrio, hago páginas web. ¿Has pensado tener una para tu gym?" |
| **Qué pidió** | "Una página donde la gente vea los planes, fotos del local, y pueda contactarme." |
| **Qué necesita** | Fotos del espacio (las tomas tú con tu celular), planes de membresía visibles, un Google My Business optimizado (la gente busca "gimnasio cerca de mí"), y CTA masivo a WhatsApp para "Agenda tu clase gratis." |
| **Presupuesto real** | S/ 600. "Es lo que puedo, hermano." |
| **Stack usado** | One-page HTML estática (no necesitaba más). Subida a Netlify gratis. Dominio .pe que él ya tenía. |
| **Cómo fue** | Rápido. 1 día de trabajo. Le tomaste fotos al local con tu celular, le pusiste buena luz. Configuraste su GMB. Él feliz. |
| **Dolor no esperado** | "¿Y quién va a actualizar los precios?" — "Tú." — "Pero yo no sé." Terminaste dejando los precios en texto y cada vez que cambiaba te mandaba WhatsApp. |
| **Stack que debiste usar** | Una web estática estuvo bien. Para S/ 600 no puedes poner CMS. Pero tal vez una página de Carrd o incluso una landing de Linktree PRO hubiera sido más barato y fácil. No necesitabas Next.js. |
| **Upsell SoffIA** | No aplica. Cliente de barrio, walk-in, sin volumen de WhatsApp. |
| **Neto para ti** | S/ 600. Bajo, pero fue en efectivo, al contado, sin factura, sin complicaciones. Y el local está en tu barrio — te conviene tenerlo contento como referencia local. |
| **Lección** | Prospección física (caminando la calle) funciona pero solo para negocios ultra-locales sin presupuesto. La ganancia es baja. Pero construyes presencia local que puede referirte. Para estos clientes, una herramienta tipo Carrd o template estático es más rentable que tu stack principal. |

---

### TABLA RESUMEN: LECCIONES ACUMULADAS

| # | Cliente | Canal | Ingreso | Días reales | Satisfacción | Upsell IA? |
|---|---------|-------|---------|-------------|--------------|------------|
| 1 | Tía boutique | Familiar | S/ 0 | 6 | Baja | No |
| 2 | Ex-compañero UX | Warm LinkedIn | S/ 1,500 | 5 | Alta | No |
| 3 | Clínica (ex-SoffIA) | WhatsApp warm | S/ 3,500 | 4 | Alta | **SÍ** ✅ |
| 4 | Amigo helados | DM Instagram | S/ 800 | 3 | Media | No |
| 5 | Repuestos B2B | Referido #2 | S/ 4,500 | 8 | Alta | Potencial |
| 6 | Abogado | Cold LinkedIn | S/ 2,500 | 3 | Media | **SÍ** ✅ |
| 7 | Taller mecánico | Familiar | S/ 1,200 | 2 | Alta | No |
| 8 | Consultora RH | Referido uni | S/ 3,500 | 5 | Alta | **SÍ** ✅ |
| 9 | Primo gadgets | Familiar | S/ 1,000 | 14 | Baja | Potencial |
| 10 | Gimnasio barrio | Puerta fría | S/ 600 | 1 | Alta | No |
| | **TOTAL** | | **S/ 19,100** | **51 días** | | **3/10** |

### PATRONES QUE EMERGEN

**Canales que funcionan:**
1. **Referidos de clientes pagados** (#5, #8) → mejor ratio tiempo/ingreso
2. **Warm WhatsApp a contactos existentes** (#3) → el caballo de Troya funciona
3. **Familiares directos** (#7) → pagan poco pero son fáciles
4. **Cold LinkedIn** (#6) → 1% conversión, no escala solo

**Canales que no funcionan:**
- **Amigos cercanos** (#1, #4) → pagan poco/no pagan, exigen más
- **Familia lejana con e-commerce** (#9) → el peor ratio esfuerzo/ingreso
- **Puerta fría** (#10) → ingreso muy bajo, pero construye presencia local

**El stack cambia por cliente, no al revés:**
- Servicios profesionales (#3, #6, #8) → Next.js + Sanity. El stack principal funciona.
- B2B producto (#5) → Next.js + Sanity. Funciona.
- E-commerce real (#9) → WooCommerce + Culqi. Doloroso pero necesario.
- Ultra-local (#7, #10) → HTML estática o Carrd. Next.js es overkill.
- Amigos (#4) → JSON estático. CMS es pérdida de tiempo.

**Quién compra SoffIA después (orden de probabilidad):**
1. **Cliente 8 (Consultora RH)** — Ya pidió chatbot. Compra en <30 días si le muestras.
2. **Cliente 3 (Clínica)** — Caballo de Troya perfecto. Compra en 2-3 meses cuando vea saturación.
3. **Cliente 6 (Abogado)** — Pre-calificación de leads. Compra en 3-4 meses.
4. **Cliente 5 (Repuestos B2B)** — Cotizaciones automáticas. Compra solo si el volumen justifica.
5. **Cliente 9 (Primo gadgets)** — Post-venta automática. Compra solo si escala a 50+ pedidos/día.

**Para que el modelo funcione necesitas:**
- **Bloque de WooCommerce + Culqi listo** (evitar el infierno del Cliente 9 cada vez)
- **Template de página estática** para ultra-locales (no gastar Next.js en S/ 600)
- **Script de seguimiento** para Clientes 3, 6, 8, 5 — llamar a los 30 días con métricas de saturación
- **Decisión sobre e-commerce:** WooCommerce para <100 SKUs, Shopify para 100+, Next.js solo si es catálogo-WhatsApp (sin carrito real)

---

### Prompt genérico de auditoría (reutilizable)

```
Necesito una radiografía COMPLETA y despiadada de este repositorio. NO edites nada todavía — solo investigación y análisis en profundidad.

Contexto: [Describe el proyecto, quién es el dueño, propósito, audiencia, stack si se conoce, en qué fase está]

Lee ABSOLUTAMENTE TODOS los archivos del proyecto. Luego responde en este formato, sin omitir nada:

---

## 1. RADIOGRAFÍA GENERAL

- ¿Qué es este proyecto? (Descripción en 1-2 oraciones)
- ¿Quién es el dueño/cliente?
- ¿Qué stack tecnológico usa exactamente? (librerías, framework, herramientas, versiones)
- ¿Está desplegado? ¿Dónde?
- ¿Tiene CI/CD? ¿Tests?
- ¿Estado actual: MVP, beta, producción, abandonado?
- ¿Hay archivos muertos, imports sin usar, dependencias sin instalar?
- ¿El README/documentación refleja la realidad del proyecto?

## 2. TASTE AUDIT (diseño visual)

Analiza CADA SECCIÓN visible de la página y para cada una:

- **¿Qué transmite ahora?** (Honestamente, sin piedad)
- **¿Qué debería transmitir?** (Según el objetivo de negocio)
- **¿Qué elementos sobran?** (Colores, texto, imágenes, animaciones, decoración, whitespace, separadores)
- **¿Qué elementos faltan?** (Tesitura, jerarquía, ritmo, contraste, personalidad)
- **¿El acento cromático está bien usado o sobresaturado?**
- **¿La página tiene personalidad o parece plantilla?** (¿Podría ser de cualquier negocio genérico?)
- **Jerarquía visual: ¿el ojo del usuario tiene un camino claro o se pierde?**
- **Mobile: ¿la experiencia es buena o hay fugas visuales en pantalla chica?**

Califica taste general del 1 al 10.

## 3. COPY AUDIT

Analiza TEXTO POR TEXTO:
- Hero headline, subtitle, CTA
- Value proposition sections
- Features copy
- Service/product descriptions
- CTA buttons (cada uno)
- Testimonios / proof social
- Footer
- Cualquier microcopy (placeholders, tooltips, errores)

Para cada texto:
- **¿Es persuasivo? ¿O es descriptivo/relleno?**
- **¿Habla del dolor/necesidad del cliente o de las características del producto?**
- **¿Qué debería decir en vez de lo que dice?** (Una alternativa concreta)
- **¿Hay jerga técnica que el cliente no entiende?**
- **¿Hay un tono de voz consistente o cambia entre secciones?**
- **¿Los CTAs son activos ("Quiero mi presupuesto") o pasivos ("Más información")?**

Califica copy general del 1 al 10.

## 4. OBJETIVO DE LA PÁGINA

- **¿Cuál es el objetivo real de esta página?** (vender, informar, capturar leads, mostrar portfolio, educar)
- **¿El diseño/copy actual cumplen ese objetivo? ¿Dónde falla exactamente?**
- **Flujo de conversión: ¿El usuario sabe exactamente qué hacer en cada paso?**
- **Jerarquía: ¿lo más importante está primero y es lo más visible?**
- **Fricción: ¿Hay algo que detenga al usuario antes de convertir? (formularios largos, pasos de más, carga lenta, CTAs confusos)**
- **Desde que el usuario abre la página hasta que convierte (whatsapp/compra/contacto): ¿cuántos pasos/segundos debería tomar? ¿Cuántos toma ahora?**

Califica alineación objetivo/ejecución del 1 al 10.

## 5. LO QUE TRANSMITE SOBRE EL DUEÑO/NEGOCIO

- **¿Qué dice esta página sobre la persona o empresa detrás?**
- **¿Parece un negocio confiable? ¿Premium? ¿Chico? ¿Amateur? ¿Establecido?**
- **Si llega un cliente ideal, ¿le compra o se va? ¿Por qué?**
- **¿Hay personalidad / historia / cara humana o es una página anónima?**
- **Diferenciación: si el cliente compara con 3 competidores, ¿por qué elegiría este?**

## 6. CÓDIGO Y ESTRUCTURA

- **Arquitectura: ¿está bien organizado o es un monolito sin estructura?**
- **Componentes: ¿hay componentes reutilizables o lógica duplicada?**
- **Responsive: ¿funciona en mobile/tablet/desktop sin fugas?**
- **Rendimiento: LCP, CLS, imágenes sin optimizar, fuentes, JS bundle, server/client components**
- **Seguridad: ¿API keys hardcodeadas? ¿Variables de entorno mal usadas? ¿Errores de tipo ignorados?**
- **Buenas prácticas: ¿sigue las convenciones del framework? ¿TypeScript estricto? ¿manejo de errores?**
- **Código muerto: componentes sin usar, imports huérfanos, archivos que ya no sirven**
- **shadcn/ui u otras librerías de UI: ¿se usan correctamente, están mal usadas, o definidas pero sin usar?**
- **Config: ¿next.config, tsconfig, tailwind config están limpios o tienen parches temporales?**

## 7. LO QUE LA PÁGINA COMUNICA AHORA (RESUMEN 1 PÁRRAFO)

En una sola oración o párrafo corto: ¿qué dice esta página sobre la empresa a un visitante que llega por primera vez? Sé brutalmente honesto.

## 8. DIAGNÓSTICO: QUÉ CAMBIAR (PRIORIZADO)

Lista numerada de cambios ordenada por impacto/costo.

### 🔴 URGENTE (Alto impacto, bajo esfuerzo, o riesgo crítico)
- Cosas que rompen la página, impiden la conversión, o son riesgo de seguridad.

### 🟡 ALTA PRIORIDAD (Mejora significativa, esfuerzo medio)
- Copy, jerarquía, proof social, personalidad, CTA.

### 🟢 MEDIA PRIORIDAD (Mejora incremental)
- Refactor, componentes, responsive fino, accesibilidad.

### 🔵 BAJA PRIORIDAD / A FUTURO
- SEO, analytics, optimización de assets, documentación.

## 9. MÉTRICAS POR SECCIÓN

Al final de cada sección, pon una calificación 1-10 con una línea de justificación. Ejemplo:
"Copy: 3/10. El hero no existe. Los CTAs son pasivos. No hay proof social. El copy describe productos en vez de atacar dolores."

---

Importante: quiero SOLO diagnóstico, sin propuestas de solución ni código todavía. Esto es la radiografía antes de la cirugía.
```

Guárdalo donde quieras. El secreto de este prompt es que:
1. Obliga a leer **todo** el proyecto (no solo la página de inicio)
2. Separa taste, copy, objetivo, negocio, código — dimensiones distintas que un dev solo no considera
3. Pide calificaciones numéricas (fuerza a comparar y priorizar)
4. Prohíbe proponer soluciones (evita que la IA se adelante y mezcle diagnóstico con ejecución)

---

## E. CORE OS — DEFINICIÓN COMPLETA

### 1. QUÉ VENDER (EL PRODUCTO REAL)

**No vendes "páginas web."** Vendes **un sistema digital que consigue clientes.**

La página web es el vehículo. El valor real es: el cliente peruano promedio aparece en Google, causa buena impresión, y recibe mensajes de WhatsApp de personas que quieren comprarle. Eso es lo que paga. No paga por React, paga por "más clientes sin moverme."

**Diferenciación real contra el mercado peruano:**

| El mercado hace... | Core OS hace... |
|---|---|
| WordPress lento + Elementor | Next.js, carga <1s en 4G peruano |
| "Cotice aquí" sin precios | Precios en soles visibles |
| Entrega en 2-3 meses | Entrega en 7 días hábiles |
| Teclado técnico: "CMS headless, SSG, serverless" | "Subes fotos desde tu celular" |
| Te cobra extra por cada cambio | CMS incluido, editas tú |
| No te dan el código | Código fuente incluido |
| Sin garantía | 7 días: si no funciona, devolución |
| Sin seguimiento | 30 días de soporte WhatsApp + llamada al mes 1 |

**El diferencial real que puedes delegar a IA:**

Construye un **sistema de design tokens + bloques + scaffolding** donde la IA pueda, con inputs mínimos del cliente (fotos, textos, logo, color), genera el 70% de la página sin que toques código. Tú haces el 30% restante: ajustes de taste, revisión, deploy, la llamada con el cliente.

### 2. QUÉ INCLUYE CADA PACK (DETALLE QUIRÚRGICO)

#### Plan Básico — S/ 1,990 (descuento lanzamiento: S/ 990, primeros 5)

```
Incluye:
- Landing page 1 página (scroll simple)
- Hero con headline + subtitle + CTA a WhatsApp
- Sección de servicios/productos (hasta 6 items)
- Sección "Sobre nosotros" (texto + foto)
- Testimonios o casos (hasta 3)
- Footer con: teléfono, WhatsApp, email, Google Maps, horario
- Botón flotante de WhatsApp con pre-mensaje personalizado
- SEO básico (title, meta description, Open Graph)
- Hosting 1 año en Vercel incluido
- Dominio .pe 1 año incluido
- Certificado SSL (automático con Vercel)
- Formulario de contacto (opcional, redirige a email)
- Analítica básica (opcional, Google Analytics o Plausible)
- Código fuente en repositorio privado (el cliente lo tiene)
- Soporte WhatsApp 30 días post-entrega
- 1 ronda de cambios post-entrega

No incluye:
- CMS / panel de edición (el contenido se actualiza a pedido, S/ 50/cambio)
- Blog
- Múltiples páginas
- E-commerce / carrito de compras
- Pasarela de pago
- Integración con APIs externas
- Diseño gráfico / logo / identidad visual (se trabaja con lo que el cliente tiene)
- Fotografía profesional (se usa lo que el cliente envía, con guía de cómo tomarlas)
```

#### Plan Profesional — S/ 4,990

```
Incluye todo lo del Básico, más:

- Web de hasta 5 páginas (Inicio, Servicios, Blog, Sobre nosotros, Contacto)
- CMS headless (Sanity) — el cliente edita textos, precios, imágenes desde su celular
- Blog funcional con categorías (el cliente escribe desde Sanity)
- SEO avanzado (schema markup LocalBusiness, sitemap XML, meta tags por página)
- Integración redes sociales (links a Instagram, Facebook, LinkedIn en vivo)
- 2 rondas de cambios post-entrega
- Capacitación 1 hora vía WhatsApp para usar el CMS
```js
const clientes = [
  { nombre: "Clínica Castro y Herrera", tipo: "Dental", resultado: "4 citas en semana 1", ubicacion: "Lima" }
]
```

#### Plan E-commerce — S/ 9,990

```
Incluye todo lo del Profesional, más:

- Catálogo de productos (hasta 100 SKUs) con fotos, precios, descripciones, variantes
- Carrito de compras funcional
- Pasarela de pago: Culqi o Niubiz (tarjeta débito/crédito en soles)
- Checkout optimizado para Perú (Yape/Plin como opción de pago, contraentrega disponible)
- Gestión de stock (el cliente actualiza desde CMS)
- Dashboard de ventas básico (pedidos recibidos, pendientes, completados)
- Notificaciones automáticas al WhatsApp del dueño cuando llega un pedido nuevo
- Integración con delivery (mensajería coordinada por WhatsApp, o API de tercero si aplica)
- 3 rondas de cambios post-entrega
```

### 3. STACK TÉCNICO (DEFINITIVO)

| Capa | Tecnología | Por qué |
|---|---|---|
| Framework | Next.js 16 (App Router) | SSG/ISR, performance, ecosistema |
| Lenguaje | TypeScript strict | Calidad, mantenibilidad |
| Estilos | Tailwind CSS v4 + design tokens por cliente | Velocidad de desarrollo, consistencia |
| CMS | Sanity (headless) | Solo en Plan Profesional+ |
| Hosting | Vercel (free tier o Pro) | Deploy automático, SSL, CDN global |
| Fuentes | Inter (body), seleccionable por cliente (heading) | Seria, profesional, legible en español |
| Pasarela de pago | Culqi (Perú) | Acepta Visa, MC, Yape, PagoEfectivo |
| WhatsApp | Enlace directo con pre-mensaje | Sin depender de API de WhatsApp (cuesta) |
| Analítica | Plausible (opcional) | Simple, sin GDPR issues, sin cookie banner |
| Dominio | .pe (NIC.pe) | El peruano confía más en .pe |
| SEO | next-seo + schema markup manual | Sin depender de plugins |
| Monitoreo | Vercel Analytics (gratis) | Saber cuánta gente visita |
| Email | Resend (transaccional, si aplica) | Solo para formulario de contacto |

### 4. SISTEMA DE DESIGN TOKENS (5 VARIABLES POR CLIENTE)

En lugar de diseñar desde cero cada página, defines **5 tokens CSS** por cliente. La IA puede generar estos tokens automáticamente desde una foto del logo del cliente o su color de marca.

```css
/* Cada cliente recibe estos 5 valores */
--primary: #0066cc;          /* Color de marca del cliente */
--primary-foreground: white; /* Texto sobre fondo primary */
--radius: 0.25rem;          /* 0 = serio, 0.25 = comercial, 1 = juguetón */
--font-sans: "Inter", sans-serif;
--font-heading: "Inter", sans-serif;  /* o Merriweather para servicios formales */
```

**Variantes de blocks (cada uno con 2-3 layouts):**

| Bloque | Variante A | Variante B | Variante C |
|---|---|---|---|
| **Hero** | Split texto/imagen | Centrado con CTA grande | Video/imagen fondo + overlay |
| **Navbar** | Simple + CTA | Con dropdowns | E-commerce con carrito |
| **Features** | Grid 3 columnas | Zig-zag imagen/texto | Numeración (pasos) |
| **Pricing** | 3 columnas, plan destacado | Tabla comparativa | Una tarjeta (único plan) |
| **Trust** | Logos clientes | Testimonios grid | Estadísticas grandes |
| **Footer** | Simple: links + redes | Gordo: mapa + contacto + links SEO | Mínimo: solo datos |
| **CTA Section** | WhatsApp grande centrado | Formulario + WhatsApp | Botón flotante permanente |
| **About** | Texto + foto del dueño | Timeline del negocio | Video del local |

### 5. QUÉ PUEDE HACER LA IA (AUTOMATIZACIÓN)

El objetivo es que la IA pueda generar el 70% del proyecto sin que toques código. Tú solo supervisas, ajustas taste, despliegas, y hablas con el cliente.

| Tarea | Quién la hace ahora | Quién la hará | Herramienta |
|---|---|---|---|
| Extraer color de marca + contraste | Tú, manual | IA | script que analiza logo del cliente |
| Asignar variante de block según rubro | Tú, intuition | IA | prompt con rubro + contexto |
| Generar estructura de página (7 bloques) | Tú, desde cero | IA | prompt + context + template repo |
| Escribir hero headline + subtitle | Tú | IA | datos del cliente + rubro + dolor |
| Traducir features técnicos a beneficios | Tú | IA | "Bloquea 91% UV" → "tu casa más fresca" |
| Generar SEO meta tags por página | Tú | IA | estructura de página + rubro |
| Redactar respuestas FAQ para el cliente | Tú | IA | rubro + objeciones comunes |
| Generar testimonios sintéticos (placeholder) | N/A | IA | hasta que tenga reales |
| Extraer colores de una foto del local | Tú, eyedropper | IA | script de análisis de imagen |
| Adaptar web a mobile | Tú, manual | IA | las variants ya son responsive |
| Crear schema LocalBusiness | Tú | IA | datos del cliente + RUC |
| Configurar Vercel + dominio | Tú | IA | script de CLI automatizado |
| Email de seguimiento al mes | No se hace | IA | trigger automático a los 30 días |
| Detectar saturación de WhatsApp (upsell) | No se hace | IA | webhook analiza volumen de clics vs. respuestas |

**El sistema que necesitas construir para que esto funcione:**

```
core-os/
├── templates/              # Scaffold para cada tipo de proyecto
│   ├── landing/            # Plan Básico
│   ├── professional/       # Plan Profesional
│   └── ecommerce/          # Plan E-commerce
├── blocks/                 # Componentes reutilizables con variantes
│   ├── hero/
│   ├── navbar/
│   ├── features/
│   ├── pricing/
│   ├── trust/
│   ├── cta/
│   └── footer/
├── design-tokens/          # Script que genera CSS variables from inputs
├── lib/                    # Utilidades compartidas
├── ai-prompts/             # Prompts guardados para cada tarea
│   ├── generate-copy.md
│   ├── assign-blocks.md
│   ├── extract-tokens.md
│   └── seo-metadata.md
└── telemetry/              # Webhook que mide saturación de WhatsApp
```

### 6. ONBOARDING (DE CLIENTE A SITIO ENTREGADO)

**Día 1 — Discovery call (15 min por WhatsApp)**

Preguntas estructuradas que hace el cliente o tú:
```
1. ¿Cómo se llama tu negocio?
2. ¿Qué vendes? (producto/servicio)
3. ¿A quién le vendes?
4. ¿Qué problema resuelves?
5. ¿Qué te hace diferente?
6. ¿Tienes logo? ¿Colores de marca?
7. ¿Tienes fotos de tu local/productos/trabajo?
8. ¿Tienes Instagram/Facebook/TikTok?
9. ¿Cuánto tiempo tienes en el rubro?
10. ¿Cuál es tu principal dolor ahora mismo?
```

**Día 1-2 — Recepción de assets**

El cliente envía fotos, textos, logo. Si no tiene fotos buenas, le das una guía de 3 pasos:
- "Con tu celular, con luz natural (ventana), fondo limpio, toma 5 fotos de tu local/trabajo/producto. Sin flash, sin filtros."

**Día 2-3 — Generación (IA + tú)**

- IA genera estructura de página, copy, SEO, tokens de color
- Tú ajustas: taste, jerarquía, flow, CTA
- Despliegas en preview URL (vercel.app o subdominio tuyo)

**Día 3-4 — Revisión con cliente**

- Le envías link de preview por WhatsApp
- Él pide cambios (hasta 1 ronda en Básico, 2 en Profesional)
- Tú ajustas, re-despliegas

**Día 5-7 — Ajustes + Deploy final**

- Cambios de la revisión aplicados
- Dominio .pe configurado (si aplica)
- CMS configurado y capacitación (si aplica)
- Deploy a producción

**Día 7 — Entrega**

- Link final enviado al cliente
- Repositorio privado transferido (si aplica)
- Factura enviada (50% restante)

**Día 30 — Seguimiento (upsell)**

- Llamada: "¿Cómo va la web? ¿Está trayendo clientes?"
- Si hay tráfico pero no responde WhatsApp a tiempo → puerta para SoffIA
- Si no hay tráfico → revisar GMB, redes, SEO

### 7. LO QUE NO HACES (NO NEGOCIABLE)

| No hago | Por qué |
|---|---|
| Apps mobile o desktop | No es mi stack, no escala, no me pagan lo suficiente |
| ERP / CRM / sistemas administrativos | Requiere mantenimiento continuo, soporte infinito |
| E-commerce en código puro | WooCommerce o Shopify wrapper. Construir carrito + inventario + pasarela desde cero no escala |
| Diseño gráfico (logo, identidad visual, manual de marca) | No soy diseñador gráfico. Trabajo con lo que el cliente ya tiene o contrata aparte |
| Fotografía profesional | Doy guía de cómo tomar buenas fotos con celular, no voy a sesiones |
| Community management / contenido redes | No es servicio web. No mezclar |
| SEO milagroso (posicionar en 1 semana) | SEO básico sí. Engañar al cliente con "primera página de Google" no |
| Páginas por debajo de S/ 990 fuera de promoción | El precio piso es S/ 990 (promo lanzamiento). Después S/ 1,990 |
| Páginas en WordPress a pedido | No construyo en WordPress. Si el cliente insiste, lo derivo a otro. Mi stack es Next.js |
| Trabajo sin 50% adelantado | Sin adelanto no arranco. En Perú la gente desaparece |
| Trabajo con contenido incompleto | Si el cliente no entrega fotos/textos en 7 días, el proyecto se pausa y el plazo corre |

### 8. MODELO POST-VENTA

| Concepto | Primer año | A partir del año 2 |
|---|---|---|
| Hosting (Vercel) | Incluido en el plan | S/ 30/mes o el cliente paga directo |
| Dominio .pe | Incluido | S/ 99/año (NIC.pe), el cliente renueva |
| Soporte WhatsApp | 30 días incluido | S/ 50/mes (respuesta en <24h) |
| Cambios de contenido | S/ 50/cambio (Básico), gratis (Profesional+ vía CMS) | S/ 50/cambio o plan de mantenimiento S/ 99/mes |
| CMS (Sanity) | Incluido en Profesional+ | El plan free de Sanity es gratis para proyectos chicos |
| SSL | Siempre gratis (Vercel) | Siempre gratis |

**Plan de mantenimiento recurrente (opcional):**
- S/ 99/mes: soporte WhatsApp prioritario, cambios ilimitados de contenido, monitoreo de uptime, backups semanales

### 9. ESTRATEGIA DE PRECIOS (VERSIÓN FINAL)

| Periodo | Básico | Profesional | E-commerce |
|---|---|---|---|
| Precio de lista | S/ 1,990 | S/ 4,990 | S/ 9,990 |
| Lanzamiento (primeros 5) | S/ 990 | S/ 2,990 | S/ 5,990 |
| Amigo/familiar | S/ 800 - 1,200 | No aplica | No aplica |

**Pago:** 50% al inicio, 50% contra entrega. Yape, Plin, transferencia bancaria.

**Garantía:** 7 días. Si la página no funciona técnicamente (errores, caídas, no carga en móvil), devolución del 100%.

### 10. LO QUE FALTA CONSTRUIR PARA QUE EL SISTEMA FUNCIONE

| Qué | Prioridad | Tiempo estimado |
|---|---|---|
| Template repo con scaffold (pnpm create:client) | 🔴 Urgente | 1 día |
| Design tokens system por cliente | 🔴 Urgente | 1 día |
| 6 blocks con variantes (Hero, Navbar, Features, Pricing, Trust, CTA, Footer) | 🔴 Urgente | 3 días |
| WhatsApp pre-mensaje por sección | 🔴 Urgente | 2 horas |
| Script de extracción de color desde logo | 🟡 Alta | 4 horas |
| CSP + SEO por cliente automatizado | 🟡 Alta | 1 día |
| Guía de onboarding para clientes (assets, fotos) | 🟡 Alta | 2 horas |
| AI prompts para generación de copy + estructura | 🟡 Alta | 1 día |
| Webhook de telemetría (para upsell SoffIA) | 🟢 Media | 2 días |
| Panel interno de clientes (estado, métricas) | 🔵 Baja | 3 días |
| Landing de Core OS (la página que ve el cliente) | 🟡 Alta | 2 días |
| Plausible analytics setup por proyecto | 🔵 Baja | 2 horas |
| Planilla de costo/hora real por proyecto | 🟡 Alta | 1 hora |

---

## F. MODELO DE INGRESOS REAL (FLUJO DE CAJA POR CLIENTE)

### 1. ESQUEMA DE PAGO POR CLIENTE

| Momento | Monto | Forma de pago |
|---|---|---|
| 50% adelantado (Día 0) | Básico: S/ 995 / Pro: S/ 2,495 / E-comm: S/ 4,995 | Yape / Plin / Transferencia |
| 50% contra entrega (Día 7) | Básico: S/ 995 / Pro: S/ 2,495 / E-comm: S/ 4,995 | Yape / Plin / Transferencia |

### 2. COSTOS REALES POR PROYECTO

| Concepto | Básico | Profesional | E-commerce |
|---|---|---|---|
| Dominio .pe 1 año (NIC.pe) | S/ 99 | S/ 99 | S/ 99 |
| Vercel hosting 1 año (free tier, 0 si cumple) | S/ 0 | S/ 0 | S/ 0 |
| Sanity CMS 1 año (free tier) | — | S/ 0 | S/ 0 |
| Culqi pasarela (setup) | — | — | S/ 0 (solo comisión por transacción) |
| Tiempo de desarrollo (días reales) | 2-3 días | 4-5 días | 7-10 días |
| **Tu margen bruto** | **S/ 1,891** | **S/ 4,891** | **S/ 9,891** |

Nota: El margen es alto porque tu costo real es tiempo, no insumos. El dominio S/ 99 es tu único desembolso directo.

### 3. INGRESOS RECURRENTES (POST-VENTA, OPCIONALES, NO INCLUIDOS EN EL PACK)

#### Plan de mantenimiento — S/ 99/mes

```
Incluye:
- Soporte WhatsApp prioritario (respuesta <4h hábiles)
- Cambios ilimitados de contenido (textos, precios, fotos, horarios)
- Monitoreo de uptime (alerta si la página cae)
- Backups semanales del CMS y código
- Actualizaciones de seguridad (dependencias, parches)
- Renovación de dominio gestionada (te avisamos, tú pagas)
- 1 llamada de revisión trimestral (30 min, métricas + recomendaciones)

No incluye:
- Nuevas secciones o funcionalidades (se cotizan aparte)
- Integración con APIs nuevas
- Campañas de marketing o SEO
```

#### Cambios sueltos (sin plan de mantenimiento) — S/ 50/cambio

```
- Cambio de texto, precio o foto: S/ 50
- Nueva sección en página existente: S/ 150
- Nueva página: S/ 300
```

#### Renovación de dominio (anual, el cliente paga directo)

| Costo real | Cobras tú (si gestionas) |
|---|---|
| S/ 99/año (NIC.pe) | S/ 99 sin markup, o S/ 120 si gestionas |

Eventualmente puedes comprar dominios al por mayor por S/ 60-70 y vender a S/ 99 — tu ganancia ahí es pequeña pero la gestión es lo que el cliente paga.

#### Migración contenido cliente (cuando el cliente se va del plan y quiere editar solo)

Si el cliente se sale del plan de mantenimiento pero tiene CMS (Sanity, plan Profesional+):
- Sanity sigue funcionando gratis para proyectos chicos
- El cliente puede editar contenido sin ti
- Tú dejas de ganar S/ 99/mes, pero no tienes costo de servidor

### 4. SIMULACIÓN DE FLUJO DE CAJA (PRIMEROS 6 MESES)

| Mes | Nuevos clientes | Ingreso setup | Mantenimiento recurrente | Total mes | Acumulado |
|---|---|---|---|---|---|
| Mes 1 | 1 Básico (S/ 1,990) | S/ 1,990 | — | **S/ 1,990** | S/ 1,990 |
| Mes 2 | 1 Básico + 1 Profesional | S/ 6,980 | S/ 99 | **S/ 7,079** | S/ 9,069 |
| Mes 3 | 2 Básicos | S/ 3,980 | S/ 198 | **S/ 4,178** | S/ 13,247 |
| Mes 4 | 1 E-commerce | S/ 9,990 | S/ 297 | **S/ 10,287** | S/ 23,534 |
| Mes 5 | 1 Profesional + 1 Básico | S/ 6,980 | S/ 396 | **S/ 7,376** | S/ 30,910 |
| Mes 6 | 2 Básicos | S/ 3,980 | S/ 495 | **S/ 4,475** | S/ 35,385 |

**Total 6 meses:** ~S/ 35,385 brutos
**Realista (descuentos, mora, clientes que no pagan):** ~S/ 25,000
**Menos costos (dominios S/ 99 x estimado):** ~S/ 24,000 en 6 meses

Esto asume que consigues 1-2 clientes por mes sin presupuesto de marketing. Con referidos y buen trabajo, es alcanzable.

---

## G. LOS 10 CLIENTES MÁS COMUNES (PERFILES REALES)

### Cómo leer esta sección

Para cada perfil:
- **Quién es exactamente** (nombre ficticio, edad, rubro, ubicación, ingresos)
- **Qué sabe de tecnología** (nivel real, no lo que dice)
- **Qué no sabe** (lo que no saben y afecta el proyecto)
- **Qué espera de ti** (su fantasía del servicio)
- **Qué le vas a dar realmente** (tu delivery honesto)
- **Qué objeciones va a poner**
- **Dónde duele post-entrega**
- **Cuánto vale realmente para él** (no cuánto dice, cuánto puede y está dispuesto a soltar)
- **Qué plan calza**
- **Riesgo de impago / problemas**
- **Potencial de upsell SoffIA**

---

### CLIENTE 1: «La boutique de Gamarra» — Ropa por Instagram

| Campo | Detalle |
|---|---|
| **Quién** | Carla, 28 años. Vende ropa de mujer por Instagram (10K seguidores). Alquila un pequeño local en Gamarra. Factura ~S/ 4,000-6,000/mes. |
| **Qué sabe** | Usa Instagram, WhatsApp Business, Yape, Plin. Sabe que existe "la página web" pero nunca ha tenido una. Piensa que Instagram es suficiente. |
| **Qué no sabe** | No sabe qué es un dominio, hosting, SEO, responsive. Piensa que "hacer una página web" es darle like a un template. Cree que una web cuesta S/ 300 porque su primo se la ofrece. |
| **Qué espera** | "Quiero una tienda como Saga Falabella donde la gente pueda comprar con tarjeta y elegir talla, como en Ripley." |
| **Qué le das** | Catálogo web con fotos de sus productos + botón de WhatsApp que arma mensaje con producto y talla seleccionada. NO carrito de compras (su volumen no lo justifica). Le explicas que en Perú la gente compra por chat, no por checkout. |
| **Objeciones** | "¿S/ 1,990? Mi prima me cobra S/ 300 en WordPress." — Le refutas con garantía, código fuente, velocidad, que su prima no le va a responder en 6 meses. |
| **Post-entrega** | Te va a pedir cambiar precios 2 veces por semana. Sin CMS, cada cambio son S/ 50. Se va a quejar. |
| **Valor real para ella** | S/ 800-1,200 como máximo real. No es cliente de S/ 1,990 aunque el precio de lista sea ese. |
| **Plan que compra** | Básico con descuento de lanzamiento (S/ 990) — y aun así va a regatear. |
| **Riesgo** | Impago parcial. "Te pago la otra mitad la próxima semana." Puede desaparecer. Pide adelanto más bajo. |
| **Upsell SoffIA** | Bajo. Su volumen de ventas es bajo, ella misma responde DMs. No se satura. |

---

### CLIENTE 2: «El doctor con clínica establecida» — Servicios de salud

| Campo | Detalle |
|---|---|
| **Quién** | Dr. Luis, 45 años. Dueño de una clínica dental con 2 consultorios en San Miguel. 15 años de experiencia. Factura ~S/ 15,000-25,000/mes. Tiene 3 empleados. |
| **Qué sabe** | Usa WhatsApp Business, tiene Instagram (sin actividad), le suena "página web." Su hijo o sobrino le configuró un link de WhatsApp en Instagram. |
| **Qué no sabe** | No sabe qué diferencia hay entre Wix y un desarrollo real. Piensa que una web es un folleto digital. No sabe qué es SEO, pero "quiere salir en Google." |
| **Qué espera** | "Quiero una página bonita con mis servicios, antes y después, precios, y un botón para agendar citas." |
| **Qué le das** | Landing de promociones + WhatsApp como centro. Hero con la promo del mes, antes/después reales, CTA a WhatsApp. Sin calendario de reservas (en Perú la paciente pregunta 5 cosas antes de agendar). Si insiste en calendario, le explicas que el 80% de las reservas automáticas se caen. |
| **Objeciones** | "¿Tan caro?" — Pero tiene plata. Solo necesita justificación. El testimonio de la Dra. Jomara cierra este cliente. |
| **Post-entrega** | Querrá también que le manejes Google Ads o Facebook Ads. Tienes que decir que no o derivar a un aliado. |
| **Valor real** | S/ 3,000-4,990. Tiene presupuesto, el problema es la confianza. |
| **Plan que compra** | Profesional (CMS, blog, SEO, más páginas). |
| **Riesgo** | Bajo. Paga a tiempo, emite factura, quiere boleta para su contador. |
| **Upsell SoffIA** | **ALTO.** Caballo de Troya perfecto. A los 30 días, cuando vea que la web genera consultas pero no puede responderlas todas, entra SoffIA. |

---

### CLIENTE 3: «El mecánico que solo usa WhatsApp» — Taller automotriz

| Campo | Detalle |
|---|---|
| **Quién** | Don Miguel, 52 años. Taller mecánico en SMP. 20 años en el rubro. Sin Instagram, sin Facebook. Todo walk-in y referidos. Factura ~S/ 3,000-5,000/mes. |
| **Qué sabe** | Usa WhatsApp para pedir repuestos y coordinar con clientes. No sabe qué es una página web. Su "presencia digital" es que alguien le puso un Google My Business hace años que nunca revisó. |
| **Qué no sabe** | No sabe qué es un dominio, hosting, correo electrónico (no tiene). Cree que "internet" es Instagram y WhatsApp. |
| **Qué espera** | "Quiero una página para que la gente me encuentre en Google Maps." — No sabe pedir más que eso. |
| **Qué le das** | Google My Business optimizado (fotos reales de su taller, horarios, reseñas) + landing de 1 página con servicios, ubicación, WhatsApp. El GMB es lo que realmente le dará clientes, la web es complemento. Sin CMS. |
| **Objeciones** | "¿S/ 1,990 por una página? Yo con eso compro herramientas." — No entiende el valor. Es el perfil más difícil de vender. |
| **Post-entrega** | No va a tocar la web nunca. Si cambia horario o precio, te llama. Sin CMS, cada cambio cuesta S/ 50 — pero te va a pedir que se lo hagas gratis "porque es rápido." |
| **Valor real** | S/ 600-1,000. No es cliente de S/ 1,990. Solo si logras mostrarle el retorno ("3 clientes nuevos en la primera semana por GMB"). |
| **Plan que compra** | Básico (descuento lanzamiento S/ 990) y aun así va a dudar. |
| **Riesgo** | Paga en efectivo, sin factura. Eso puede ser bueno o malo — es informal total. |
| **Upsell SoffIA** | Nulo. No tiene volumen de WhatsApp, su negocio es físico. |

---

### CLIENTE 4: «El abogado que se cree escritor» — Estudio jurídico

| Campo | Detalle |
|---|---|
| **Quién** | Dr. Ricardo, 38 años. Abogado laboral independiente. Tiene un estudio pequeño con 1 asociado. Factura ~S/ 6,000-10,000/mes. Clientes por referidos. |
| **Qué sabe** | Tiene LinkedIn, sabe que existe "el SEO," ha leído sobre marketing digital. Cree que entiende más de lo que realmente entiende. |
| **Qué no sabe** | No sabe qué hace un desarrollador web realmente. Piensa que "hacer una web" es llenar un template con su texto. |
| **Qué espera** | "Quiero una página institucional con Inicio, Quiénes Somos, Servicios, Blog de jurisprudencia, Contacto. Escribiré los textos yo (tengo 10 páginas de Word)." |
| **Qué le das** | Funnel de captura para casos laborales. Hero con el dolor correcto: "¿Te despidieron injustificadamente? Te ayudamos." Formulario de pre-calificación (tipo de caso, fecha, monto) que deriva a WhatsApp. Blog para SEO. Y batalla campal para que reduzca sus textos de 500 palabras a 15. |
| **Objeciones** | Va a querer escribir TODO él. Va a mandar párrafos de 300 palabras para el Hero. Vas a tener que editar sin que se ofenda. "Es que soy abogado, tengo que ser preciso." — Le explicas que en una web la gente no lee, escanea. |
| **Post-entrega** | Te va a pedir cambios de redacción 5 veces. Nunca va a escribir el blog (te compra el Profesional por el CMS y nunca lo usa). |
| **Valor real** | S/ 2,500-3,500. Tiene presupuesto pero es lento pagando (30-45 días). |
| **Plan que compra** | Profesional (CMS, blog, SEO). |
| **Riesgo** | Medio. Paga pero tarde. Hay que facturarle con RUC. Se demora en aprobar porque "tengo que revisar los textos." |
| **Upsell SoffIA** | **ALTO.** Los abogados reciben muchos leads que no califican ("¿cuánto cuesta?" sin dar detalles). SoffIA como pre-filtro de leads calificados es un upsell natural. |

---

### CLIENTE 5: «El que ya tuvo una página y le fue mal» — Negocio con Wix/WordPress frustrado

| Campo | Detalle |
|---|---|
| **Quién** | José, 35 años. Dueño de una tienda de accesorios de celular en Los Olivos. Ya pagó S/ 500 por una web en WordPress que le hizo un conocido — cargaba lento, nadie la veía, la abandonó. |
| **Qué sabe** | Sabe que WordPress existe y que "es lento." Sabe que lo estafaron una vez. Está escéptico con cualquier oferta web. |
| **Qué no sabe** | No sabe que su experiencia mala fue por mal desarrollo, no por el medio. Confunde "WordPress es malo" con "las páginas web no funcionan." |
| **Qué espera** | "Quiero algo que funcione de verdad. No quiero WordPress. Que sea rápido y que la gente pueda comprar." |
| **Qué le das** | Si tiene <50 SKUs: catálogo + WhatsApp cart. Si tiene 50+ SKUs: WooCommerce optimizado + Culqi. Le explicas que la tecnología no es el problema — el desarrollo mal hecho sí. El stack de Core OS (Next.js) es estructuralmente más rápido que cualquier WP con page builder. |
| **Objeciones** | "Todo esto ya me lo dijeron la vez pasada." — Tienes que demostrar con hechos: mostrarle laminaspro.com cargando en 0.8s, mostrarle tu LH 97/100/100/100. Las métricas reales callan bocas. |
| **Post-entrega** | Desconfiado al inicio, pero si entregas bien, se convierte en tu mejor referente. La desconfianza curada es más leal que la confianza ingenua. |
| **Valor real** | Depende del tamaño de su tienda. Si factura S/ 8,000-15,000/mes → Profesional. Si solo es Instagram → Básico. |
| **Plan que compra** | Básico (catálogo + WhatsApp) o Profesional (si tiene más productos). |
| **Riesgo** | Bajo-medio. Paga pero va a ser exigente en calidad. Cualquier error técnico refuerza su sesgo. |
| **Upsell SoffIA** | Medio. Post-venta automática cuando tenga volumen de pedidos. |

---

### CLIENTE 6: «La consultora que ya sabe que necesita automatización» — Servicios B2B

| Campo | Detalle |
|---|---|
| **Quién** | Andrea, 30 años. Consultora de RH para PYMEs. Factura ~S/ 10,000-18,000/mes. Tiene 2 empleados. Clientas mujeres profesionales, dueñas de negocio. |
| **Qué sabe** | Sabe qué es un CRM, ha usado Mailchimp, conoce HubSpot. Sabe que necesita automatizar procesos de venta. |
| **Qué no sabe** | No sabe las limitaciones técnicas de cada solución. Piensa que "un chatbot" es mágico y resuelve todo. |
| **Qué espera** | "Quiero una web profesional + un chatbot que responda preguntas frecuentes y agende llamadas." |
| **Qué le das** | Landing de servicios + formulario de pre-calificación + WhatsApp. El "chatbot" se lo vendes después como SoffIA, no lo incluyas en el pack web. Si insiste, le pones un chatbot simple de preguntas frecuentes con condiciones fijas (no IA). |
| **Objeciones** | "¿El chatbot está incluido?" — "No, es un sistema aparte. Te lo instalo después si ves que la web te genera más leads de los que puedes responder." — Clásico setup de upsell. |
| **Post-entrega** | Cliente ideal. Sabe lo que quiere, paga a tiempo, da referidos. |
| **Valor real** | S/ 3,500-4,990. Sin problema de presupuesto. |
| **Plan que compra** | Profesional (CMS, blog, SEO, landing). |
| **Riesgo** | Bajo. Cliente profesional que paga a tiempo y emite factura. |
| **Upsell SoffIA** | **MUY ALTO.** Ella ya pidió chatbot. SoffIA es ese chatbot pero con IA real. Se lo vendes a los 30 días cuando vea que el volumen de leads crece. |

---

### CLIENTE 7: «El emprendedor de TikTok que quiere vender» — Producto digital o físico con redes

| Campo | Detalle |
|---|---|
| **Quién** | Diego, 22 años. Vende planeadores/agendas personalizadas por TikTok (50K seguidores). Factura ~S/ 3,000-8,000/mes. Sin estructura formal. |
| **Qué sabe** | TikTok, Instagram, Canva. Sabe editar videos, entiende de marketerse y copy corto. Cree que una web le va a multiplicar las ventas. |
| **Qué no sabe** | No sabe que su tráfico viene de TikTok, no de Google. Una web sin tráfico no vende — él necesita seguir haciendo contenido y usar la web como destino final de su funnel. |
| **Qué espera** | "Quiero una tienda online bonita y que la gente pueda comprar directo con tarjeta." |
| **Qué le das** | Catálogo + WhatsApp cart o WooCommerce si tiene más de 30 SKUs. Le explicas que su web no va a vender sola — tiene que seguir empujando tráfico de TikTok a la web. Le pones analítica para que sepa cuántas visitas llegan desde sus videos. |
| **Objeciones** | "¿Por qué no me haces un carrito de compras como Shopify?" — "Porque tu margen no da para Shopify. Con catálogo + WhatsApp vendes igual." |
| **Post-entrega** | Querrá que le ayudes con sus videos o estrategia de contenido. No es tu servicio. |
| **Valor real** | S/ 1,200-1,990. Tiene ingresos variables, no siempre llega a fin de mes. |
| **Plan que compra** | Básico. |
| **Riesgo** | Medio-alto. Ingresos variables, puede atrasarse en pagos. Pregunta si aceptas Yape en cuotas. |
| **Upsell SoffIA** | Medio. Si logra escalar y recibe muchos DMs en TikTok + WhatsApp, SoffIA puede responder. Pero su canal principal es TikTok, y SoffIA no maneja TikTok. |

---

### CLIENTE 8: «El que le tiene miedo a la tecnología» — Profesional independiente mayor

| Campo | Detalle |
|---|---|
| **Quién** | Don Carlos, 58 años. Arquitecto independiente. Trabaja con constructoras. No tiene página web, no tiene Instagram. Su email lo revisa cada 3 días. Factura ~S/ 5,000-12,000/mes. |
| **Qué sabe** | Usa WhatsApp (solo chats, no business). Usa correo a duras penas. Le funciona el método tradicional (referidos, contratos por teléfono). |
| **Qué no sabe** | No sabe absolutamente nada de tecnología web. Piensa que una página web es algo que "instalas en la computadora." |js
| **Qué espera** | "Mi hijo dice que necesito una página web. Hágame una para que esté en internet." — No tiene expectativas claras porque no sabe lo que es. |
| **Qué le das** | Landing de 1 página: servicios, portafolio de proyectos (fotos de sus obras), WhatsApp. Le explicas que la web no reemplaza sus referidos — los complementa. GMB optimizado para que aparezca cuando buscan "arquitecto en [su distrito]." |
| **Objeciones** | No entiende por qué tiene que pagar por algo que "está en el aire." — "¿S/ 1,990? ¿Y qué hago con eso?" — Hay que explicarle como a un niño de 10 años: "Es como tener un local virtual donde la gente te encuentra, ve tus trabajos, y te contacta." |
| **Post-entrega** | No va a tocar la web NUNCA. Ni siquiera va a mirarla. Para él es un gasto necesario como el letrero del local. |
| **Valor real** | S/ 1,500-1,990. Tiene plata, pero no ve el valor. El que lo convence es su hijo, no tú. |
| **Plan que compra** | Básico. No necesita CMS ni blog. |
| **Riesgo** | Bajo. Paga al contado. Pero la venta es difícil porque no entiende lo que compra. |
| **Upsell SoffIA** | Nulo. No va a tener volumen de WhatsApp. |

---

### CLIENTE 9: «El que pide features imposibles» — Sueña con Amazon pero tiene presupuesto de bodega

| Campo | Detalle |
|---|---|
| **Quién** | Jhon, 27 años. Vende productos importados (perfumes, relojes, carteras) por Instagram. Quiere "ser el próximo Falabella." Factura ~S/ 2,000/mes. |
| **Qué sabe** | Ha visto videos de Shopify, sabe que existe el dropshipping, ha hecho un curso de "e-commerce desde cero." Peligroso porque cree que sabe. |
| **Qué no sabe** | No sabe lo que cuesta realmente construir un marketplace. Piensa que un carrito de compras + pasarela + envío + tracking se hace en un fin de semana. |
| **Qué espera** | "Quiero una página como Amazon: millones de productos, filtros, reviews, pago con tarjeta, Yape, delivery tracking, y app para el celular." |
| **Qué le das** | Realidad. "Con tu volumen, necesitas WooCommerce + Culqi y envío manual. Un clon de Amazon cuesta $50,000 y un equipo de 10 personas. Empezamos con esto y escalamos." Si no acepta, no es tu cliente. |
| **Objeciones** | Va a decir que otro desarrollador le ofreció todo por S/ 2,000. Le deseas suerte. Vuelve en 3 meses cuando ese desarrollador desapareció y su proyecto está a medio hacer. |
| **Post-entrega** | Siempre va a querer más features. Nunca está satisfecho. "¿Y el tracking? ¿Y las reviews? ¿Y el descuento por volumen?" — Es un cliente que nunca se acaba de contentar. Limitar el alcance desde el principio o rechazarlo. |
| **Valor real** | S/ 800-1,500. No da para más. Su negocio no factura lo suficiente. |
| **Plan que compra** | Básico o E-commerce con descuento (y aun así va a querer más). |
| **Riesgo** | **ALTO.** Insatisfecho crónico. Malas referencias. Problemas de pago. Si puedes, no tomes este cliente. Si lo tomas, contrato muy detallado con alcance fijo. |
| **Upsell SoffIA** | Bajo. Nunca va a tener suficiente volumen para justificarlo. |

---

### CLIENTE 10: «El que viene por referido de otro cliente feliz» — El mejor perfil

| Campo | Detalle |
|---|---|
| **Quién** | Cualquier perfil de los anteriores, pero llega por recomendación de un cliente al que ya le entregaste. Ejemplo: amigo de Andrea (Cliente 6), conocido de la Clínica (Cliente 2). |
| **Qué sabe** | Su amigo/compañero le dijo "este man sí cumple, entrega rápido, la web funciona." Viene con confianza pre-aprobada. |
| **Qué no sabe** | Lo mismo que su perfil base. Pero es más receptivo a tus recomendaciones porque su amigo confía en ti. |
| **Qué espera** | "Mi amigo [cliente feliz] me dijo que le hiciste su página y está contento. Yo quiero algo similar." |
| **Qué le das** | El proceso normal, pero más fluido porque la confianza está construida. El tiempo de venta se reduce de días a horas. Las objeciones son mínimas. |
| **Objeciones** | "Mi amigo pagó X, yo puedo pagar lo mismo." — Si el amigo pagó con descuento de lanzamiento, tienes que explicar que la promo terminó. Si pagó el precio completo, no hay problema. |
| **Post-entrega** | Menos soporte porque confía en ti. Si el amigo está contento, él también va a estarlo. |
| **Valor real** | El precio de lista completo. No negocia. |
| **Plan que compra** | El que necesita, no el más barato. Confía en tu recomendación. |
| **Riesgo** | Mínimo. Paga, refiere, es feliz. |
| **Upsell SoffIA** | Más probable que el promedio porque confía en ti. |

---

### TABLA RESUMEN DE PERFILES

| # | Perfil | Rubro | Presupuesto real | Plan que compra | Riesgo | Upsell IA |
|---|---|---|---|---|---|---|
| 1 | Boutique Gamarra | Retail | S/ 800-1,200 | Básico (descuento) | Alto | Bajo |
| 2 | Doctor con clínica | Salud | S/ 3,000-4,990 | Profesional | Bajo | **ALTO** ✅ |
| 3 | Mecánico tradicional | Taller | S/ 600-1,000 | Básico (descuento) | Medio | Nulo |
| 4 | Abogado independiente | Legal | S/ 2,500-3,500 | Profesional | Medio | **ALTO** ✅ |
| 5 | Estafado por WP | Retail | S/ 1,500-4,990 | Básico o Profesional | Bajo-Medio | Medio |
| 6 | Consultora RH | B2B | S/ 3,500-4,990 | Profesional | Bajo | **MUY ALTO** ✅ |
| 7 | Emprendedor TikTok | Retail | S/ 1,200-1,990 | Básico | Medio-Alto | Medio |
| 8 | Arquitecto mayor | Servicios | S/ 1,500-1,990 | Básico | Bajo | Nulo |
| 9 | Sueña con Amazon | Retail | S/ 800-1,500 | Básico o no tomarlo | **Alto** | Bajo |
| 10 | Referido feliz | Cualquiera | Precio completo | El que necesita | Mínimo | Probable |

### PATRONES QUE EMERGEN

**Quién paga bien y sin problema:**
- Dueños de negocios establecidos con empleados (Cliente 2, 6)
- Profesionales con ingresos estables (Cliente 4)
- Referidos (Cliente 10)

**Quién es pérdida de tiempo:**
- Emprendedores sin estructura (Cliente 9)
- Negocios ultra-locales sin digitalización (Cliente 3) — el GMB les sirve más que la web
- Gente que compara con "precio de amigo" insistentemente

**El upsell de SoffIA solo funciona en 3 tipos:**
1. Negocio con alto volumen de consultas entrantes (Clínica, Consultora RH)
2. Profesional que necesita filtrar leads (Abogado)
3. El referido que ya confía (Cliente 10)

**Tu cliente ideal es el que:**
- Ya tiene un negocio establecido (2+ años, empleados, facturación consistente)
- Ha tenido una mala experiencia digital antes o siente que le falta
- Entiende que la calidad cuesta (no regatea)
- Te paga a tiempo y emite factura

Ese no es el más fácil de conseguir al inicio. Pero es al que debes apuntar desde el día 1.
