"use client";

import { Container } from "@/components/layout/container";
import type { Locale } from "@/content/portfolio";
import { getCopy } from "@/content/portfolio/copy";
import { getIdentity } from "@/content/portfolio/identity";
import { SITE } from "@/lib/constants";
import { CV, pathFor } from "@/lib/paths";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useRef } from "react";
import s from "./portfolio.module.css";

// Keep browser-only chrome independent of server metadata helpers.
export function Header({
  locale,
  path = "/",
}: { locale: Locale; path?: string }) {
  const t = getCopy(locale);
  const menu = useRef<HTMLDetailsElement>(null);
  const links = [
    { path: "/work", label: t.work },
    { path: "/open-source", label: t.components },
    { path: "/writing", label: t.writing },
    { path: "/about", label: t.about },
  ];
  const languageLink = (target: Locale) =>
    `/api/locale?to=${target}&next=${encodeURIComponent(path)}`;
  return (
    <header className={s.header}>
      <Container className={s.headerRow}>
        <a className={s.brand} href={pathFor(locale)}>
          roddcode<span>.</span>
        </a>
        <nav className={s.desktopNav} aria-label={t.navigation}>
          {links.map((link) => (
            <a
              key={link.path}
              href={
                link.path === "/writing"
                  ? link.path
                  : pathFor(locale, link.path)
              }
              aria-current={path.startsWith(link.path) ? "page" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className={s.headerTools}>
          <div className={s.languageLinks} aria-label={t.language}>
            {(["es", "en"] as const).map((value) => (
              <a
                key={value}
                href={languageLink(value)}
                hrefLang={value}
                aria-current={locale === value ? "page" : undefined}
              >
                {value.toUpperCase()}
              </a>
            ))}
          </div>
          <a className={s.headerContact} href={`mailto:${SITE.email}`}>
            {t.email}
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <details
            ref={menu}
            className={s.mobileMenu}
            onKeyDown={(event) => {
              if (event.key === "Escape" && menu.current?.open) {
                menu.current.open = false;
                menu.current.querySelector("summary")?.focus();
              }
            }}
          >
            <summary aria-label={t.menu}>
              <Menu className={s.menuIcon} size={21} />
              <X className={s.closeIcon} size={21} />
            </summary>
            <nav aria-label={t.navigation}>
              {links.map((link) => (
                <a
                  key={link.path}
                  href={
                    link.path === "/writing"
                      ? link.path
                      : pathFor(locale, link.path)
                  }
                >
                  {link.label}
                </a>
              ))}
              <a href={CV} target="_blank" rel="noopener noreferrer">
                {t.cv}
              </a>
              <a href={`mailto:${SITE.email}`}>{t.email}</a>
            </nav>
          </details>
        </div>
      </Container>
    </header>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  const identity = getIdentity(locale);
  return (
    <footer className={s.footer}>
      <Container>
        <div className={s.footerMain}>
          <a className={s.footerBrand} href={pathFor(locale)}>
            roddcode.
          </a>
          <p>
            {identity.role}
            <br />
            {identity.location}
          </p>
          <nav aria-label={t.contact}>
            <a href={SITE.github}>GitHub</a>
            <a href={SITE.linkedin}>LinkedIn</a>
            <a href={CV} target="_blank" rel="noopener noreferrer">
              {t.cv}
            </a>
          </nav>
        </div>
        <div className={s.footerBottom}>
          <span>
            © {new Date().getFullYear()} {identity.name}
          </span>
          <nav>
            <a href="/privacidad">{t.privacy}</a>
            <a href="/seguridad">{t.security}</a>
            <a href="/feed.xml">RSS</a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
