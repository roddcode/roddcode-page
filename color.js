const parseHex = (h) => {
  const r = parseInt(h.slice(1,3), 16)/255;
  const g = parseInt(h.slice(3,5), 16)/255;
  const b = parseInt(h.slice(5,7), 16)/255;
  return [r,g,b];
};
const linearize = (c) => c <= 0.04045 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4);
const srgbToOklab = ([r, g, b]) => {
  const l = 0.4122214708 * linearize(r) + 0.5363325363 * linearize(g) + 0.0514459929 * linearize(b);
  const m = 0.2119034982 * linearize(r) + 0.6806995451 * linearize(g) + 0.1073969566 * linearize(b);
  const s = 0.0883024619 * linearize(r) + 0.2817188376 * linearize(g) + 0.6299787005 * linearize(b);
  const l_ = Math.cbrt(l); const m_ = Math.cbrt(m); const s_ = Math.cbrt(s);
  return [
    0.2104542553*l_ + 0.793617785*m_ - 0.0040720468*s_,
    1.9779984951*l_ - 2.428592205*m_ + 0.4505937099*s_,
    0.0259040371*l_ + 0.7827717662*m_ - 0.808675766*s_
  ];
};
const oklabToOklch = ([L, a, b]) => {
  const C = Math.hypot(a,b);
  let h = Math.atan2(b,a) * (180/Math.PI);
  if (h < 0) h += 360;
  return [L, C, h];
};
const colors = {
  background: '#0a0a09',
  foreground: '#f1f1f0',
  muted: '#161615',
  mutedForeground: '#71716f',
  primary: '#c2410c',
  border: '#1c1c1b'
};
Object.entries(colors).forEach(([name, hex]) => {
  const [L, C, H] = oklabToOklch(srgbToOklab(parseHex(hex)));
  console.log(`${name} (${hex}): oklch(${L.toFixed(4)} ${C.toFixed(4)} ${isNaN(H) ? 0 : H.toFixed(2)})`);
});
