"use client";

import { ContourField } from "@/components/home/contour-field/contour-field";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { CaseContent, HomeContent, Locale } from "@/content/home";
import { SITE } from "@/lib/constants";
import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import s from "./home.module.css";
import { LanguageSelector } from "./language-selector";
import { SystemMark } from "./system-mark";

const STEP_MS = 460;

function Check() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={s.ic}>
      <path
        d="M3.5 8.4l2.8 2.8 6.2-6.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function Cross() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={s.ic}>
      <path
        d="M4.5 4.5l7 7M11.5 4.5l-7 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={s.ic}>
      <rect
        x="6"
        y="6"
        width="8"
        height="8"
        rx="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M10 6V3.5A1.5 1.5 0 0 0 8.5 2h-5A1.5 1.5 0 0 0 2 3.5v5A1.5 1.5 0 0 0 3.5 10H6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function TabIcon({ id }: { id: string }) {
  if (id === "booking")
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true" className={s.ic}>
        <rect
          x="2.5"
          y="3.5"
          width="11"
          height="10"
          rx="1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M2.5 6.5h11M5.5 2v3M10.5 2v3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
    );
  if (id === "flight")
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true" className={s.ic}>
        <path
          d="M2 9.5l12-5-3.2 8-3.1-2.2L2 9.5z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
    );
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={s.ic}>
      <ellipse
        cx="8"
        cy="4"
        rx="5.2"
        ry="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M2.8 4v8c0 1.1 2.3 2 5.2 2s5.2-.9 5.2-2V4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function Home({
  locale,
  content: t,
  systems,
  openSource,
  experience,
}: {
  locale: Locale;
  content: Pick<
    HomeContent,
    "nav" | "hero" | "panel" | "cases" | "contact" | "footer"
  >;
  systems: ReactNode;
  openSource: ReactNode;
  experience: ReactNode;
}) {
  const CASES = t.cases;

  const [index, setIndex] = useState(0);
  const [tick, setTick] = useState(0);
  const [copied, setCopied] = useState(false);
  const [navDark, setNavDark] = useState(false);

  useEffect(() => {
    const blocks = Array.from(document.querySelectorAll("[data-dark]"));
    if (!blocks.length) return;

    const check = () => {
      const y = 32;
      setNavDark(
        blocks.some((el) => {
          const r = el.getBoundingClientRect();
          return r.top <= y && r.bottom >= y;
        }),
      );
    };

    const io = new IntersectionObserver(check, {
      rootMargin: "-32px 0px -100% 0px",
      threshold: [0, 0.01, 1],
    });
    for (const el of blocks) {
      io.observe(el);
    }
    check();
    return () => io.disconnect();
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }
  const reduce = useRef(false);
  // biome-ignore lint/style/noNonNullAssertion: el diccionario siempre trae los tres casos
  const current: CaseContent = CASES[index] ?? CASES[0]!;
  const total = current.steps.length;
  const finished = tick > total;
  const active = tick < total ? tick : -1;

  useEffect(() => {
    reduce.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: index reinicia la animación al cambiar de caso, aunque el cuerpo no lo lea
  useEffect(() => {
    setTick(0);
    if (reduce.current) {
      setTick(total + 1);
      return;
    }
    const id = window.setInterval(() => {
      setTick((v) => {
        if (v > total) {
          window.clearInterval(id);
          return v;
        }
        return v + 1;
      });
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [index, total]);

  const pill = useMemo(() => {
    if (!finished) return { text: t.panel.pill.running, cls: s.pillRun };
    return current.result === "blocked"
      ? { text: t.panel.pill.blocked, cls: s.pillBlocked }
      : { text: t.panel.pill.committed, cls: s.pillOk };
  }, [finished, current.result, t.panel.pill]);

  return (
    <div className={s.page}>
      <header className={`${s.nav} ${navDark ? s.navDark : ""}`}>
        <Container className={s.navRow}>
          <a className={s.navBrand} href="/">
            roddcode<span className={s.navDot}>.</span>
          </a>

          <nav className={s.navLinks} aria-label="Main">
            <a className={s.navSection} href="#gate-panel">
              {t.nav.demo}
            </a>
            <a className={s.navSection} href="#systems">
              {t.nav.systems}
            </a>
            <a className={s.navSection} href="#experience">
              {t.nav.trajectory}
            </a>

            <LanguageSelector locale={locale} labels={t.nav} />
          </nav>

          <a className={s.navCta} href={`mailto:${SITE.email}`}>
            {t.nav.email}
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={s.navMenuButton}
                aria-label={t.nav.menu}
              >
                <span />
                <span />
                <span />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className={`${s.navMenuPanel} ${navDark ? s.navMenuPanelDark : ""}`}
            >
              <DropdownMenuItem asChild>
                <a href="#gate-panel">{t.nav.demo}</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="#systems">{t.nav.systems}</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="#experience">{t.nav.trajectory}</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href="/cv-alejandro-alvarado-roddcode.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.nav.cv}
                </a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="sr-only">
                {t.nav.language}
              </DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <a
                  href={`/api/locale?to=${locale === "es" ? "en" : "es"}`}
                  hrefLang={locale === "es" ? "en" : "es"}
                >
                  {locale === "es" ? t.nav.english : t.nav.spanish}
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Container>
      </header>

      <main id="main-content">
        <Section tone="paper" className={s.heroSection}>
          <ContourField
            palette="paper"
            maxDpr={1.5}
            className={s.heroContour}
          />
          <Container className={s.heroInner}>
            <p className={s.byline}>
              <img
                className={s.bylineAvatar}
                src="/alejandro.webp"
                alt=""
                width={40}
                height={40}
              />
              <span className={s.bylineName}>Alejandro Alvarado</span>
              <span className={s.bylineRole}>{t.hero.role}</span>
            </p>

            <h1 className={s.title}>
              <span className={s.titleLine}>
                <span className={`${s.titleLineInner} ${s.titleSoft}`}>
                  {t.hero.h1a}
                </span>
              </span>
              <span className={s.titleLine}>
                <span className={s.titleLineInner}>{t.hero.h1b}.</span>
              </span>
            </h1>

            <p className={s.sub}>{t.hero.sub}</p>

            <div className={s.ctas}>
              <a className={s.btnPrimary} href={`mailto:${SITE.email}`}>
                {t.hero.ctaEmail}
              </a>
              <a className={s.btnGhost} href="#systems">
                {t.hero.ctaSystems}
              </a>
              <p className={s.avail}>
                <i className={s.availDot} />
                {t.hero.avail}
              </p>
            </div>

            <div
              className={s.panel}
              id="gate-panel"
              role="tabpanel"
              aria-labelledby={`gate-tab-${current.id}`}
            >
              <div className={s.top}>
                <span className={s.brand}>{t.panel.brand}</span>
                <span className={s.crumb}>
                  <svg className={s.sep} viewBox="0 0 12 12" aria-hidden="true">
                    <path
                      d="M4.5 2.5L8 6l-3.5 3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <b>{current.id}</b>
                </span>
                <span className={`${s.pill} ${pill.cls}`} aria-live="polite">
                  <i className={s.dot} />
                  {pill.text}
                </span>
              </div>

              <div className={s.body}>
                <div className={s.left}>
                  <div className={s.who}>
                    <span className={s.avatar} aria-hidden="true">
                      <img
                        className={s.avatarImg}
                        src={current.avatar}
                        alt=""
                        width={38}
                        height={38}
                      />
                    </span>
                    <span className={s.ident}>
                      <b>{current.who}</b>
                      <span>{current.meta}</span>
                    </span>
                  </div>

                  <div key={current.id} className={s.bubble}>
                    <p>{current.message}</p>
                  </div>

                  {!finished && (
                    <div className={s.typing}>
                      <span className={s.spinnerSm} />
                      {current.typing}
                    </div>
                  )}

                  <div className={`${s.reply} ${finished ? s.replyOn : ""}`}>
                    <span className={s.by}>
                      <span className={s.avatarAi} aria-hidden="true">
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          className={s.markAi}
                        >
                          <path
                            d="M12 1.5 A13 13 0 0 0 22.5 12 A13 13 0 0 0 12 22.5 A13 13 0 0 0 1.5 12 A13 13 0 0 0 12 1.5 Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                      {t.panel.system}
                      <span className={s.badge}>{t.panel.brand}</span>
                    </span>
                    <div className={s.bubbleAi}>
                      <p>{current.reply}</p>
                      <span
                        className={`${s.chip} ${
                          current.chipState === "blocked"
                            ? s.chipBlocked
                            : s.chipOk
                        }`}
                      >
                        {current.chipState === "blocked" ? (
                          <Cross />
                        ) : (
                          <Check />
                        )}
                        {current.chip}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={s.steps}>
                  <div className={s.stepsHead}>
                    <b>
                      {current.id === "crm" ? t.panel.batchRun : t.panel.action}
                    </b>
                  </div>

                  <ol className={s.list}>
                    {current.steps.map((step, i) => {
                      const state =
                        i < tick
                          ? step.state
                          : i === active
                            ? "running"
                            : "pending";
                      return (
                        <li
                          key={step.label}
                          className={`${s.step} ${s[state]}`}
                        >
                          <span className={s.mark}>
                            {state === "running" ? (
                              <span className={s.spinner} />
                            ) : state === "blocked" ? (
                              <Cross />
                            ) : state === "done" ? (
                              <Check />
                            ) : (
                              <span className={s.hollow} />
                            )}
                          </span>
                          <span className={s.label}>{step.label}</span>
                          <span className={s.system}>
                            <SystemMark system={step.system} />
                            {step.system}
                          </span>
                        </li>
                      );
                    })}
                  </ol>

                  <div className={`${s.foot} ${finished ? s.footOn : ""}`}>
                    <b>
                      <i
                        className={`${s.dot} ${
                          current.result === "blocked" ? s.dotBlocked : s.dotOk
                        }`}
                      />
                      {current.foot}
                    </b>
                    <span>{current.footSub}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={s.tabs}>
              <span className={s.tabsCap} aria-hidden="true">
                {t.panel.tryAnother}
              </span>
              <div
                className={s.tabList}
                role="tablist"
                aria-label={t.panel.tryAnother}
              >
                {CASES.map((c, i) => (
                  <button
                    key={c.id}
                    id={`gate-tab-${c.id}`}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-controls="gate-panel"
                    tabIndex={i === index ? 0 : -1}
                    className={`${s.tab} ${i === index ? s.tabOn : ""}`}
                    onClick={() => setIndex(i)}
                    onKeyDown={(event) => {
                      const next = {
                        ArrowRight: (i + 1) % CASES.length,
                        ArrowLeft: (i - 1 + CASES.length) % CASES.length,
                        Home: 0,
                        End: CASES.length - 1,
                      }[event.key];
                      if (next === undefined) return;
                      event.preventDefault();
                      setIndex(next);
                      const tabs =
                        event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
                          '[role="tab"]',
                        );
                      tabs?.[next]?.focus();
                    }}
                  >
                    <TabIcon id={c.id} />
                    {c.tab}
                  </button>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {systems}
        {openSource}
        {experience}

        <Section
          id="contact"
          tone="night"
          dark
          ariaLabel={t.footer.connect}
          className={s.contact}
        >
          <ContourField
            palette="night"
            mask="ellipse"
            maxDpr={1.5}
            className={s.contactField}
          />
          <Container className={s.contactInner}>
            <h2 className={s.contactTitle}>{t.contact.title}</h2>
            <p className={s.contactBody}>{t.contact.body}</p>

            <div className={s.contactActions}>
              <a
                className={`${s.btnPrimary} ${s.contactBtn}`}
                href={`mailto:${SITE.email}?subject=${encodeURIComponent(t.contact.mailSubject)}`}
              >
                {t.contact.email}
              </a>
              <a
                className={`${s.btnGhost} ${s.contactGhost}`}
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.contact.linkedin}
                <svg
                  viewBox="0 0 12 12"
                  aria-hidden="true"
                  className={s.contactGhostIcon}
                >
                  <path
                    d="M3.5 8.5L8.5 3.5M8.5 3.5H4.7M8.5 3.5V7.3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </Container>
        </Section>
      </main>

      <footer className={s.footer} data-dark>
        <Container className={s.footerGrid}>
          <div className={s.footerBrand}>
            <span className={s.footerLogo}>roddcode.</span>
            <p className={s.footerTagline}>
              {t.hero.h1a} {t.hero.h1b}.
            </p>
            <button
              type="button"
              className={`${s.footerMail} ${copied ? s.footerMailCopied : ""}`}
              onClick={copyEmail}
              aria-label={t.footer.copyEmail}
              title={t.footer.copyEmail}
            >
              {SITE.email}
              <span className={s.copyIcon} aria-hidden="true">
                {copied ? <Check /> : <CopyIcon />}
              </span>
            </button>
          </div>

          <nav className={s.footerCols} aria-label="Footer">
            <div className={s.col}>
              <h2>{t.footer.work}</h2>
              <ul>
                <li>
                  <a href="#systems">{t.footer.systems}</a>
                </li>
                <li>
                  <a href="#open-source">{t.footer.openSource}</a>
                </li>
              </ul>
            </div>
            <div className={s.col}>
              <h2>{t.footer.profile}</h2>
              <ul>
                <li>
                  <a
                    href="/cv-alejandro-alvarado-roddcode.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.footer.cv}
                  </a>
                </li>
                <li>
                  <a href="/writing">{t.footer.writing}</a>
                </li>
              </ul>
            </div>
            <div className={s.col}>
              <h2>{t.footer.connect}</h2>
              <ul>
                <li>
                  <a
                    href="https://github.com/roddcode"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/alejandro-alvarado-roddcode/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.npmjs.com/~roddcode"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NPM
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </Container>

        <Container className={s.footerBar}>
          <p className={s.footerCopy}>{t.footer.copy}</p>
          <div className={s.footerMeta}>
            <a href="/privacidad">{t.footer.privacy}</a>
            <a href="/seguridad">{t.footer.security}</a>
          </div>
        </Container>
      </footer>
    </div>
  );
}
