import {
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { basename, extname, join } from "node:path";
import sharp from "sharp";

const DIR = "public/logos/companies";
const IMAGE = /\.(svg|png|jpe?g|jfif|webp|avif|gif|tiff)$/i;

mkdirSync(DIR, { recursive: true });

const files = readdirSync(DIR).filter((f) => IMAGE.test(f));
if (!files.length) {
  console.log(`nada que convertir en ${DIR}`);
  process.exit(0);
}

for (const file of files) {
  const slug = basename(file, extname(file))
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const source = join(DIR, file);
  const target = join(DIR, `${slug}.webp`);

  if (file === `${slug}.webp`) {
    console.log(`${file} ya está normalizado`);
    continue;
  }

  // Se lee a memoria antes de tocar sharp: en Windows el handle abierto bloquea el borrado.
  const input = readFileSync(source);
  const buffer = await sharp(input, { density: 400 })
    .resize({
      width: 256,
      height: 256,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .webp({ quality: 88, alphaQuality: 90 })
    .toBuffer();

  // Windows es case-insensitive: escribir fuera, borrar origen, mover destino.
  const tmp = join(DIR, "__tmp.webp");
  writeFileSync(tmp, buffer);

  try {
    rmSync(source, { force: true, maxRetries: 6, retryDelay: 120 });
  } catch (error) {
    rmSync(tmp, { force: true });
    console.error(`no se pudo borrar ${source}: ${error.message}`);
    continue;
  }

  renameSync(tmp, target);
  console.log(
    `${file} -> ${slug}.webp (${(statSync(target).size / 1024).toFixed(1)} KB)`,
  );
}
