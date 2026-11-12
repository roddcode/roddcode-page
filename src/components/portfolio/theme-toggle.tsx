"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styles from "./theme-toggle.module.css";

const COPY = {
  es: { toDark: "Activar modo oscuro", toLight: "Activar modo claro" },
  en: { toDark: "Switch to dark mode", toLight: "Switch to light mode" },
} as const;

export function ThemeToggle({ locale }: { locale: "es" | "en" }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const copy = COPY[locale];
  const isDark = mounted && resolvedTheme === "dark";
  const label = isDark ? copy.toLight : copy.toDark;

  function toggle() {
    const dark =
      resolvedTheme === "dark" ||
      (!resolvedTheme && document.documentElement.classList.contains("dark"));
    setTheme(dark ? "light" : "dark");
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={label}
          className="text-ink"
          onClick={toggle}
        >
          <span aria-hidden="true" className={styles.icons}>
            <Sun
              className={`${styles.icon} ${styles.sun}`}
              size={20}
              strokeWidth={1.75}
            />
            <Moon
              className={`${styles.icon} ${styles.moon}`}
              size={20}
              strokeWidth={1.75}
            />
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
