"use client";

import {
  ContourField,
  type ContourPalette,
  PALETTES,
} from "@/components/home/contour-field/contour-field";
import { useTheme } from "next-themes";

// Local contrast adjustments: preserve the shared presets used by OG assets.
const LIGHT_HERO: ContourPalette = {
  ...PALETTES.paperAiry,
  accent: "#1f4e8c",
  opacity: [0.07, 0.135],
};
const LIGHT_CONTACT: ContourPalette = {
  ...LIGHT_HERO,
  opacity: [0.14, 0.24],
};

export function ThemeContour({
  className,
  interactive = false,
}: {
  className?: string;
  interactive?: boolean;
}) {
  const { resolvedTheme } = useTheme();
  return (
    <ContourField
      palette={
        resolvedTheme === "dark"
          ? "night"
          : interactive
            ? LIGHT_CONTACT
            : LIGHT_HERO
      }
      mask={false}
      maxDpr={1}
      className={className}
      interactive={interactive}
    />
  );
}
