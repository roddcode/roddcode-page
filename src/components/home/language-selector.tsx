import type { HomeContent, Locale } from "@/content/home";
import s from "./home.module.css";

type LanguageLabels = Pick<
  HomeContent["nav"],
  "language" | "spanish" | "english"
>;

function TranslateIcon() {
  return (
    <svg
      className={s.languageIcon}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 4.5h8.25m-4.125-2v2m3.6.1c-.55 3.35-2.55 5.8-6.1 7.4m1.2-5.2c.95 1.8 2.55 3.25 4.6 4.2m1.25 3.5 2.35-6.2 2.35 6.2m-3.95-1.7h3.2"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Flag({ locale }: { locale: Locale }) {
  if (locale === "es") {
    return (
      <svg className={s.languageFlag} viewBox="0 0 20 14" aria-hidden="true">
        <rect width="20" height="14" fill="#fff" />
        <path d="M0 0h6.67v14H0zM13.33 0H20v14h-6.67z" fill="#d91023" />
        <rect
          x=".3"
          y=".3"
          width="19.4"
          height="13.4"
          fill="none"
          stroke="rgba(0, 0, 0, .16)"
          strokeWidth=".6"
        />
      </svg>
    );
  }

  return (
    <svg className={s.languageFlag} viewBox="0 0 20 14" aria-hidden="true">
      <rect width="20" height="14" fill="#fff" />
      <path
        d="M0 0h20v1.08H0zM0 2.15h20v1.08H0zM0 4.31h20v1.08H0zM0 6.46h20v1.08H0zM0 8.62h20v1.08H0zM0 10.77h20v1.08H0zM0 12.92h20V14H0z"
        fill="#b22234"
      />
      <rect width="8.4" height="7.54" fill="#3c3b6e" />
      <g fill="#fff">
        <circle cx="1" cy=".8" r=".22" />
        <circle cx="2.25" cy=".8" r=".22" />
        <circle cx="3.5" cy=".8" r=".22" />
        <circle cx="4.75" cy=".8" r=".22" />
        <circle cx="6" cy=".8" r=".22" />
        <circle cx="7.25" cy=".8" r=".22" />
        <circle cx="1.6" cy="2" r=".22" />
        <circle cx="2.85" cy="2" r=".22" />
        <circle cx="4.1" cy="2" r=".22" />
        <circle cx="5.35" cy="2" r=".22" />
        <circle cx="6.6" cy="2" r=".22" />
        <circle cx="1" cy="3.2" r=".22" />
        <circle cx="2.25" cy="3.2" r=".22" />
        <circle cx="3.5" cy="3.2" r=".22" />
        <circle cx="4.75" cy="3.2" r=".22" />
        <circle cx="6" cy="3.2" r=".22" />
        <circle cx="7.25" cy="3.2" r=".22" />
        <circle cx="1.6" cy="4.4" r=".22" />
        <circle cx="2.85" cy="4.4" r=".22" />
        <circle cx="4.1" cy="4.4" r=".22" />
        <circle cx="5.35" cy="4.4" r=".22" />
        <circle cx="6.6" cy="4.4" r=".22" />
        <circle cx="1" cy="5.6" r=".22" />
        <circle cx="2.25" cy="5.6" r=".22" />
        <circle cx="3.5" cy="5.6" r=".22" />
        <circle cx="4.75" cy="5.6" r=".22" />
        <circle cx="6" cy="5.6" r=".22" />
        <circle cx="7.25" cy="5.6" r=".22" />
        <circle cx="1.6" cy="6.8" r=".22" />
        <circle cx="2.85" cy="6.8" r=".22" />
        <circle cx="4.1" cy="6.8" r=".22" />
        <circle cx="5.35" cy="6.8" r=".22" />
        <circle cx="6.6" cy="6.8" r=".22" />
      </g>
      <rect
        x=".3"
        y=".3"
        width="19.4"
        height="13.4"
        fill="none"
        stroke="rgba(0, 0, 0, .16)"
        strokeWidth=".6"
      />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg
      className={s.languageChevron}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m3 4.5 3 3 3-3"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LanguageOption({
  locale,
  label,
  href,
  current,
}: {
  locale: Locale;
  label: string;
  href: string;
  current: boolean;
}) {
  const content = (
    <>
      <Flag locale={locale} />
      <span className={s.languageOptionName}>{label}</span>
      <span className={s.languageOptionCode}>{locale.toUpperCase()}</span>
    </>
  );
  const className = `${s.languageOption} ${current ? s.languageOptionCurrent : ""}`;

  if (current) {
    return (
      <span className={className} aria-current="page">
        {content}
      </span>
    );
  }

  return (
    <a href={href} hrefLang={locale} className={className}>
      {content}
    </a>
  );
}

export function LanguageSelector({
  locale,
  labels,
}: {
  locale: Locale;
  labels: LanguageLabels;
}) {
  const currentLabel = locale === "es" ? labels.spanish : labels.english;

  return (
    <details className={s.languageSelector}>
      <summary
        className={s.languageTrigger}
        aria-label={`${labels.language}: ${currentLabel}`}
      >
        <TranslateIcon />
        <span className={s.languageCode}>{locale.toUpperCase()}</span>
        <ChevronDown />
      </summary>

      <div className={s.languageMenu}>
        <LanguageOption
          locale="es"
          label={labels.spanish}
          href="/api/locale?to=es"
          current={locale === "es"}
        />
        <LanguageOption
          locale="en"
          label={labels.english}
          href="/api/locale?to=en"
          current={locale === "en"}
        />
      </div>
    </details>
  );
}
