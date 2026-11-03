"use client";

/**
 * ContourField — fondo de isolíneas topográficas para el hero.
 *
 * Matemática del campo: domain warping sobre ruido simplex 2D.
 * La función `snoise` es la de Ashima Arts / Ian McEwan / Stefan Gustavson
 * (github.com/ashima/webgl-noise), licencia MIT — libre de usar y distribuir
 * conservando este aviso.
 *
 * Composición: warp de dos campos que deforma la altura, dos octavas
 * (0.74 / 0.26). Isolíneas por distancia al nivel, normalizadas por fwidth.
 * Paleta, densidad, escala y máscara sacadas de la referencia.
 *
 * El desvanecido del centro no lo hace el shader: es `mask-image`.
 */

import { useEffect, useRef } from "react";

/* ---------------------------------------------------------------- paletas */

export type ContourPalette = {
  ink: string;
  accent: string;
  opacity: [number, number];
  levels: number;
  scale: number;
  breathe: number;
  seed: number;
};

export const PALETTES = {
  /** Paridad con la referencia, ajustada al papel cálido: tinta cálida, índice cobre. */
  paper: {
    ink: "#24262a",
    accent: "#4a6b96",
    opacity: [0.045, 0.09],
    levels: 6.5,
    scale: 300,
    breathe: 0.1,
    seed: 0,
  },
  /** Estricto con DESIGN.md: cero tinte en las curvas índice. */
  paperNeutral: {
    ink: "#24262a",
    accent: "#4e5157",
    opacity: [0.045, 0.09],
    levels: 6.5,
    scale: 300,
    breathe: 0.1,
    seed: 0,
  },
  /** Más tenue, para heros con mucho texto. */
  paperAiry: {
    ink: "#24262a",
    accent: "#55759f",
    opacity: [0.032, 0.065],
    levels: 6.0,
    scale: 330,
    breathe: 0.08,
    seed: 2.3,
  },
  /** Alias histórico. */
  paperSoft: {
    ink: "#24262a",
    accent: "#55759f",
    opacity: [0.032, 0.065],
    levels: 6.0,
    scale: 330,
    breathe: 0.08,
    seed: 2.3,
  },
  /** Noche. Intensidad calibrada para el CTA: el campo tiene que verse. */
  night: {
    ink: "#e8eae5",
    accent: "#93b7f0",
    opacity: [0.085, 0.17],
    levels: 6.5,
    scale: 330,
    breathe: 0.1,
    seed: 3.7,
  },
} satisfies Record<string, ContourPalette>;

export type ContourPaletteName = keyof typeof PALETTES;

/* ---------------------------------------------------------------- máscaras */

export const MASKS = {
  /**
   * La del hero de la referencia: 35% arriba (protege el titular),
   * 60% al 30%, plena entre 55% y 88%, y se apaga al final.
   */
  hero: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.6) 30%, #000 55%, #000 88%, rgba(0,0,0,0) 100%)",
  /** Funde hacia los bordes (la usan en el CTA). */
  ellipse:
    "radial-gradient(ellipse 62% 58% at 50% 50%, #000 25%, rgba(0,0,0,0.4) 62%, transparent 100%)",
  bottom: "linear-gradient(180deg, #000 0%, #000 62%, transparent 100%)",
} as const;

export type ContourMaskName = keyof typeof MASKS;

/* ------------------------------------------------------------------ shader */

const VERT = `#version 300 es
void main(){
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;

uniform vec2  uRes;
uniform float uTime;
uniform float uDpr;
uniform float uScale;
uniform vec3  uPointer;
uniform vec3  uInk;
uniform vec3  uAccent;
uniform vec2  uOpacity;
uniform float uLevels;
uniform float uBreathe;
uniform float uSeed;

out vec4 o;

// Simplex 2D — Ashima Arts / Ian McEwan / Stefan Gustavson. MIT.
vec3 permute(vec3 x){ return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x  = 2.0 * fract(p * C.www) - 1.0;
  vec3 h  = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main(){
  vec2  fc = gl_FragCoord.xy;
  float u  = uScale * uDpr;
  vec2  p  = (fc - 0.5 * uRes) / u;
  float t  = uTime * 0.03;
  float s  = uSeed;

  // warp: dos campos de ruido desplazan el dominio
  vec2 q = vec2(
    snoise(p * 0.55 + vec2(        t,       -t * 0.8) + s),
    snoise(p * 0.55 + vec2(5.2 - t * 0.6, 1.3 + t * 0.7) - s)
  );

  // altura: dos octavas, la primera ya deformada por el warp
  float h  = snoise(p * 0.36 + q * 0.42 + vec2(1.7, 9.2) + s * 0.5) * 0.74;
        h += snoise(p * 0.85 - q * 0.25 + vec2(8.3, 2.8))             * 0.26;

  h *= 1.0 + uBreathe * sin(uTime * 0.05);

  // el puntero hunde el terreno
  vec2 dp = (fc - uPointer.xy) / u;
  h -= uPointer.z * 0.34 * exp(-dot(dp, dp) * 2.2);

  // isolíneas
  float v  = h * uLevels;
  float fw = max(fwidth(v), 1e-4);
  float px = abs(fract(v - 0.5) - 0.5) / fw;
  float idx = floor(v + 0.5);

  float major = 1.0 - step(0.5, abs(mod(idx, 5.0)));
  float hw    = mix(0.5, 0.95, major) * uDpr;

  float line = 1.0 - smoothstep(hw - 0.35 * uDpr, hw + 0.8 * uDpr, px);
  line *= 1.0 - smoothstep(0.32, 0.7, fw);

  float a = min(1.0, line * mix(uOpacity.x, uOpacity.y, major));
  vec3  col = mix(uInk, uAccent, major);
  o = vec4(col * a, a);
}`;

const UNIFORMS = [
  "uRes",
  "uTime",
  "uDpr",
  "uScale",
  "uPointer",
  "uInk",
  "uAccent",
  "uOpacity",
  "uLevels",
  "uBreathe",
  "uSeed",
] as const;

/* ------------------------------------------------------------------- clase */

function hexToRgb01(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = Number.parseInt(full, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

class Field {
  ok = false;
  running = false;
  visible = true;
  raf = 0;
  t0 = performance.now();
  dpr = 1;
  last = 0;
  slow = 0;
  still: boolean;
  ptr = { x: 0, y: 0, tx: 0, ty: 0, a: 0, ta: 0 };
  u = {} as Record<(typeof UNIFORMS)[number], WebGLUniformLocation | null>;
  private gl!: WebGL2RenderingContext;
  private pr!: WebGLProgram;
  private vao!: WebGLVertexArrayObject;
  private ro?: ResizeObserver;
  private io?: IntersectionObserver;

  constructor(
    private canvas: HTMLCanvasElement,
    private palette: ContourPalette,
    private maxDpr = 1.5,
  ) {
    this.still =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    let gl: WebGL2RenderingContext | null = null;
    try {
      gl = canvas.getContext("webgl2", {
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
    } catch {
      gl = null;
    }
    if (!gl) return;
    this.gl = gl;
    if (!this.build()) return;
    this.ok = true;

    for (const n of UNIFORMS) this.u[n] = gl.getUniformLocation(this.pr, n);

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas);

    this.io = new IntersectionObserver(
      (entries) => {
        const last = entries[entries.length - 1];
        if (!last) return;
        this.visible = last.isIntersecting;
        if (this.visible) this.start();
        else this.stop();
      },
      { rootMargin: "120px" },
    );
    this.io.observe(canvas);

    document.addEventListener("visibilitychange", this.onVisibility);
    window.addEventListener("pointermove", this.onPointerMove, {
      passive: true,
    });

    this.resize();
  }

  private onVisibility = () => {
    if (document.hidden) this.stop();
    else if (this.visible) this.start();
  };

  private onPointerMove = (e: PointerEvent) => {
    const r = this.canvas.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    if (x < -80 || y < -80 || x > r.width + 80 || y > r.height + 80) {
      this.ptr.ta = 0;
      return;
    }
    this.ptr.tx = x * this.dpr;
    this.ptr.ty = (r.height - y) * this.dpr;
    this.ptr.ta = 1;
    if (this.ptr.a < 0.01) {
      this.ptr.x = this.ptr.tx;
      this.ptr.y = this.ptr.ty;
    }
  };

  private build() {
    const gl = this.gl;
    const sh = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        if (process.env.NODE_ENV !== "production") {
          console.error("[ContourField] shader:", gl.getShaderInfoLog(s));
        }
        return null;
      }
      return s;
    };
    const vs = sh(gl.VERTEX_SHADER, VERT);
    const fs = sh(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return false;
    const pr = gl.createProgram();
    if (!pr) return false;
    gl.attachShader(pr, vs);
    gl.attachShader(pr, fs);
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[ContourField] link:", gl.getProgramInfoLog(pr));
      }
      return false;
    }
    this.pr = pr;
    const vao = gl.createVertexArray();
    if (!vao) return false;
    this.vao = vao;
    return true;
  }

  resize() {
    if (!this.ok) return;
    const dpr = Math.min(window.devicePixelRatio || 1, this.maxDpr);
    const w = Math.max(1, Math.round(this.canvas.clientWidth * dpr));
    const h = Math.max(1, Math.round(this.canvas.clientHeight * dpr));
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
    this.dpr = dpr;
    if (!this.running) this.draw(performance.now());
  }

  start() {
    if (!this.ok || this.running) return;
    if (this.still) {
      this.draw(performance.now());
      return;
    }
    this.running = true;
    this.slow = 0;
    this.last = 0;
    const loop = (ts: number) => {
      if (!this.running) return;
      const dt = this.last ? ts - this.last : 16;
      this.last = ts;
      this.slow = dt > 34 ? this.slow + 1 : Math.max(0, this.slow - 1);
      if (this.slow > 60) {
        this.still = true;
        this.running = false;
        this.draw(ts);
        return;
      }
      this.draw(ts);
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
  }

  draw(ts: number) {
    const { gl, u } = this;
    const time = this.still ? 26 : (ts - this.t0) / 1000;
    const p = this.ptr;
    p.x += (p.tx - p.x) * 0.075;
    p.y += (p.ty - p.y) * 0.075;
    p.a += (p.ta - p.a) * 0.045;

    const [ir, ig, ib] = hexToRgb01(this.palette.ink);
    const [ar, ag, ab] = hexToRgb01(this.palette.accent);

    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(this.pr);
    gl.bindVertexArray(this.vao);

    gl.uniform2f(u.uRes, this.canvas.width, this.canvas.height);
    gl.uniform1f(u.uTime, time);
    gl.uniform1f(u.uDpr, this.dpr);
    gl.uniform1f(u.uScale, this.palette.scale);
    gl.uniform3f(u.uPointer, p.x, p.y, this.still ? 0 : p.a);
    gl.uniform3f(u.uInk, ir, ig, ib);
    gl.uniform3f(u.uAccent, ar, ag, ab);
    gl.uniform2f(u.uOpacity, this.palette.opacity[0], this.palette.opacity[1]);
    gl.uniform1f(u.uLevels, this.palette.levels);
    gl.uniform1f(u.uBreathe, this.palette.breathe);
    gl.uniform1f(u.uSeed, this.palette.seed);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  dispose() {
    this.stop();
    this.ro?.disconnect();
    this.io?.disconnect();
    document.removeEventListener("visibilitychange", this.onVisibility);
    window.removeEventListener("pointermove", this.onPointerMove);
    if (this.ok) {
      this.gl.deleteProgram(this.pr);
      this.gl.deleteVertexArray(this.vao);
    }
  }
}

/* --------------------------------------------------------------- componente */

export type ContourFieldProps = {
  palette?: ContourPaletteName | ContourPalette;
  mask?: ContourMaskName | string | false;
  maxDpr?: number;
  className?: string;
  style?: React.CSSProperties;
};

export function ContourField({
  palette = "paper",
  mask = "hero",
  maxDpr = 1.5,
  className,
  style,
}: ContourFieldProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const settings: ContourPalette =
      typeof palette === "string" ? PALETTES[palette] : palette;

    let field: Field | null = null;
    let idleId: number | undefined;
    let timerId: ReturnType<typeof globalThis.setTimeout> | undefined;

    const cancelPending = () => {
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timerId !== undefined) globalThis.clearTimeout(timerId);
      idleId = undefined;
      timerId = undefined;
    };

    // Compile near the viewport so the footer does not create its WebGL
    // context and shaders during the hero's first render.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          cancelPending();
          return;
        }
        if (field || idleId !== undefined || timerId !== undefined) return;
        const create = () => {
          idleId = undefined;
          timerId = undefined;
          field = new Field(canvas, settings, maxDpr);
          observer.disconnect();
        };
        if (typeof window.requestIdleCallback === "function") {
          idleId = window.requestIdleCallback(create, { timeout: 1500 });
        } else {
          timerId = globalThis.setTimeout(create, 200);
        }
      },
      { rootMargin: "120px" },
    );
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      cancelPending();
      field?.dispose();
    };
  }, [palette, maxDpr]);

  const maskImage =
    mask === false ? undefined : (MASKS[mask as ContourMaskName] ?? mask);

  return (
    <canvas
      ref={ref}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
        maskImage,
        WebkitMaskImage: maskImage,
        ...style,
      }}
    />
  );
}

export default ContourField;
