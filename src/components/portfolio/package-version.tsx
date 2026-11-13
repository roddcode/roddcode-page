import type { Locale, Package } from "@/content/portfolio";
import { getNpmVersion } from "@/lib/npm";
import s from "./component-teaser.module.css";

export function PackageVersionPlaceholder() {
  return <span className={s.version} aria-hidden="true" />;
}

export async function PackageVersion({
  name,
  locale,
}: { name: Package["name"]; locale: Locale }) {
  const version = await getNpmVersion(name);
  if (!version) return <PackageVersionPlaceholder />;
  return (
    <span
      className={s.version}
      aria-label={
        locale === "es"
          ? `Versión publicada de ${name}: ${version}`
          : `Published version of ${name}: ${version}`
      }
    >
      v{version}
    </span>
  );
}
