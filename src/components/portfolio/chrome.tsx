"use client";

import { ExternalLink } from "@/components/ui/external-link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/content/portfolio";
import { getCopy } from "@/content/portfolio/copy";
import { getIdentity } from "@/content/portfolio/identity";
import { SITE } from "@/lib/constants";
import { CV, pathFor } from "@/lib/paths";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useRef } from "react";
import s from "./chrome.module.css";
import { CopyEmail } from "./copy-email";
import { LanguageToggle } from "./language-toggle";
import { SocialIcon } from "./social-icon";
import { ThemeToggle } from "./theme-toggle";

// Keep browser-only chrome independent of server metadata helpers.
export function Header({
  locale,
  path = "/",
  languagePaths,
}: {
  locale: Locale;
  path?: string;
  languagePaths?: Partial<Record<Locale, string>>;
}) {
  const t = getCopy(locale);
  const menu = useRef<HTMLDetailsElement>(null);
  const links = [
    { path: "/work", label: t.work },
    { path: "/writing", label: t.writing },
    { path: "/about", label: t.about },
  ];
  const languageLink = (target: Locale) =>
    `/api/locale?to=${target}&next=${encodeURIComponent(languagePaths?.[target] ?? path)}`;
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
          <LanguageToggle
            locale={locale}
            hrefs={{ es: languageLink("es"), en: languageLink("en") }}
          />
          <ThemeToggle locale={locale} />
          <Button
            asChild
            variant="link"
            size="link"
            className={`${s.headerContact} gap-2 text-ink`}
          >
            <a href={`mailto:${SITE.email}`}>
              {t.email}
              <ArrowUpRight
                size={15}
                aria-hidden="true"
                className="group-hover/button:translate-x-[2px] group-hover/button:-translate-y-[2px] group-focus-visible/button:translate-x-[2px] group-focus-visible/button:-translate-y-[2px]"
              />
            </a>
          </Button>
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
              <ExternalLink locale={locale} href={CV}>
                {t.cv}
              </ExternalLink>
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
  const links = [
    { path: "/work", label: t.work },
    { path: "/writing", label: t.writing },
    { path: "/about", label: t.about },
  ];
  return (
    <footer className={s.footer}>
      <Container>
        <div className={s.footerMain}>
          <div className={s.footerIdentity}>
            <a className={s.footerBrand} href={pathFor(locale)}>
              roddcode.
            </a>
            <p className={s.footerMotto}>{identity.motto}</p>
            <p>{identity.role}</p>
            <p>{identity.location}</p>
          </div>
          <nav className={s.footerColumn} aria-labelledby="footer-nav">
            <h2 className={s.footerHeading} id="footer-nav">
              {locale === "es" ? "Navegación" : "Navigation"}
            </h2>
            <ul>
              {links.map((link) => (
                <li key={link.path}>
                  <a
                    href={
                      link.path === "/writing"
                        ? link.path
                        : pathFor(locale, link.path)
                    }
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav className={s.footerColumn} aria-labelledby="footer-profiles">
            <h2 className={s.footerHeading} id="footer-profiles">
              {locale === "es" ? "Perfiles" : "Profiles"}
            </h2>
            <ul>
              <li>
                <ExternalLink locale={locale} showIcon href={SITE.github}>
                  <SocialIcon name="github" />
                  GitHub
                </ExternalLink>
              </li>
              <li>
                <ExternalLink locale={locale} showIcon href={SITE.linkedin}>
                  <SocialIcon name="linkedin" />
                  LinkedIn
                </ExternalLink>
              </li>
            </ul>
          </nav>
          <nav className={s.footerColumn} aria-labelledby="footer-contact">
            <h2 className={s.footerHeading} id="footer-contact">
              {t.contact}
            </h2>
            <ul>
              <li className={s.emailRow}>
                <a className={s.footerEmail} href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
                <CopyEmail email={SITE.email} locale={locale} />
              </li>
              <li>
                <ExternalLink locale={locale} href={CV}>
                  {t.cv}
                </ExternalLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className={s.footerBottom}>
          <span>
            © {new Date().getFullYear()} {identity.name}
          </span>
          <nav>
            <a href={locale === "en" ? "/en/privacy" : "/privacidad"}>
              {t.privacy}
            </a>
            <a href={locale === "en" ? "/en/security" : "/seguridad"}>
              {t.security}
            </a>
            <a href="/feed.xml">RSS</a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
