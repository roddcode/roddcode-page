import { readdirSync } from "node:fs";
import { join } from "node:path";

export type LogoIndex = {
  companies: Record<string, string>;
};

const IMAGE = /\.(svg|png|webp|avif|jpe?g|jfif)$/i;

function index(dir: string): Record<string, string> {
  try {
    return Object.fromEntries(
      readdirSync(join(process.cwd(), "public", dir))
        .filter((file) => IMAGE.test(file))
        .map((file) => [file.replace(/\.[^.]+$/, ""), file]),
    );
  } catch {
    return {};
  }
}

export function logoIndex(): LogoIndex {
  return {
    companies: index(join("logos", "companies")),
  };
}
