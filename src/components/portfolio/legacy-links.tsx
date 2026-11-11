"use client";

import type { Locale } from "@/content/portfolio/types";
import { pathFor } from "@/lib/paths";
import { useEffect } from "react";

export function LegacyLinks({ locale }: { locale: Locale }) {
  useEffect(() => {
    const follow = () => {
      if (window.location.hash === "#gate-panel") {
        window.location.replace(
          `${pathFor(locale, "/work/soffia")}#gate-panel`,
        );
      }
      if (window.location.hash === "#casos") {
        document.getElementById("systems")?.scrollIntoView();
      }
    };
    follow();
    window.addEventListener("hashchange", follow);
    return () => window.removeEventListener("hashchange", follow);
  }, [locale]);
  return null;
}
