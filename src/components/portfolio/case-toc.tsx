"use client";

import { useEffect, useState } from "react";
import s from "./case-toc.module.css";

type TocItem = { id: string; title: string };

export function CaseToc({
  items,
  label,
  mobileLabel,
  navLabel,
}: {
  items: TocItem[];
  label: string;
  mobileLabel: string;
  navLabel: string;
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? null);

  useEffect(() => {
    const headings = items
      .map(({ id }) => document.getElementById(id))
      .filter((heading): heading is HTMLElement => Boolean(heading));
    if (headings.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      let current: string | null = headings[0]?.id ?? null;
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= 140) current = heading.id;
      }
      setActiveId(current);
    };
    const schedule = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, [items]);

  if (items.length === 0) return null;

  const links = items.map(({ id, title }) => (
    <li key={id}>
      <a
        href={`#${id}`}
        aria-current={activeId === id ? "location" : undefined}
      >
        {title}
      </a>
    </li>
  ));

  return (
    <nav aria-label={navLabel} className={s.toc}>
      <div className={s.desktop}>
        <p className={s.label}>{label}</p>
        <ol className={s.list}>{links}</ol>
      </div>
      <details className={s.mobile}>
        <summary className={s.summary}>{mobileLabel}</summary>
        <ol className={s.list}>{links}</ol>
      </details>
    </nav>
  );
}
