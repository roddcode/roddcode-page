import type { Locale } from "@/content/portfolio";
import { getCopy } from "@/content/portfolio/copy";
import Image from "next/image";
import s from "./portfolio.module.css";

export function Portrait({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  return (
    <figure className={s.portrait}>
      <div
        className={s.portraitDrawing}
        role="img"
        aria-label={t.illustrationAlt}
      >
        <svg
          className={s.connections}
          viewBox="0 0 560 480"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="280" cy="235" r="174" />
          <ellipse
            cx="280"
            cy="235"
            rx="244"
            ry="100"
            transform="rotate(-32 280 235)"
          />
          <path d="M82 140h74m248 235h78M280 40v55M280 375v65" />
          <circle cx="102" cy="140" r="6" />
          <circle cx="457" cy="375" r="6" />
          <circle cx="280" cy="61" r="6" />
        </svg>
        <div className={s.photoFrame}>
          <Image
            src="/alejandro.webp"
            alt=""
            width={288}
            height={288}
            sizes="(max-width: 600px) 190px, 240px"
            priority
          />
        </div>
        <span className={`${s.drawingLabel} ${s.backendLabel}`}>
          {t.illustrationBackend}
        </span>
        <span className={`${s.drawingLabel} ${s.aiLabel}`}>
          {t.illustrationAI}
        </span>
        <span className={`${s.drawingLabel} ${s.integrationLabel}`}>
          {t.illustrationIntegrations}
        </span>
        <span className={s.signature}>roddcode.</span>
      </div>
      <figcaption>{t.illustrationCaption}</figcaption>
    </figure>
  );
}
