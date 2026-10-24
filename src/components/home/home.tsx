"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CASES, type Case } from "./cases";
import { SystemMark } from "./system-mark";
import { SystemsStacked } from "./systems-stacked";
import s from "./home.module.css";

const STEP_MS = 460;

function Check() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={s.ic}>
      <path d="M3.5 8.4l2.8 2.8 6.2-6.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function Cross() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={s.ic}>
      <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function TabIcon({ id }: { id: string }) {
  if (id === "booking")
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true" className={s.ic}>
        <rect x="2.5" y="3.5" width="11" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M2.5 6.5h11M5.5 2v3M10.5 2v3" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  if (id === "flight")
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true" className={s.ic}>
        <path d="M2 9.5l12-5-3.2 8-3.1-2.2L2 9.5z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={s.ic}>
      <ellipse cx="8" cy="4" rx="5.2" ry="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2.8 4v8c0 1.1 2.3 2 5.2 2s5.2-.9 5.2-2V4" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function Home() {
  const [index, setIndex] = useState(0);
  const [tick, setTick] = useState(0);
  const [copied, setCopied] = useState(false);
  const [navDark, setNavDark] = useState(false);
  const gridRef = useRef<HTMLDivElement | null>(null);

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
    blocks.forEach((el) => io.observe(el));
    check();
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
        el.dataset.on = "true";
      });
    };
    const leave = () => {
      el.dataset.on = "false";
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("roddcode.dev@gmail.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }
  const reduce = useRef(false);
  const current: Case = CASES[index] ?? CASES[0]!;
  const total = current.steps.length;
  const finished = tick > total;
  const active = tick < total ? tick : -1;

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    setTick(0);
    if (reduce.current) {
      setTick(total + 1);
      return;
    }
    const id = window.setInterval(() => {
      setTick((t) => {
        if (t > total) {
          window.clearInterval(id);
          return t;
        }
        return t + 1;
      });
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [index, total]);

  const pill = useMemo(() => {
    if (!finished) return { text: "Running", cls: s.pillRun };
    return current.result === "blocked"
      ? { text: "Blocked", cls: s.pillBlocked }
      : { text: "Committed", cls: s.pillOk };
  }, [finished, current.result]);

  return (
    <section className={s.hero} id="top">
      <div ref={gridRef} className={s.gridFx} aria-hidden="true" />

      <header className={`${s.nav} ${navDark ? s.navDark : ""}`}>
        <div className={s.navInner}>
          <a className={s.navBrand} href="#top">
            roddcode<span className={s.navDot}>.</span>
          </a>

          <nav className={s.navLinks} aria-label="Main">
            <a href="#systems">Systems</a>
            <a href="#method">Method</a>
            <a href="/about">About</a>
            <a href="/writing">Writing</a>
          </nav>

          <a className={s.navCta} href="mailto:roddcode.dev@gmail.com">
            Email
          </a>
        </div>
      </header>

      <div className={s.inner}>
        <p className={s.byline}>
          <span className={s.bylineName}>Alejandro Alvarado</span>
          <span className={s.bylineRole}>AI &amp; Software Engineer</span>
        </p>

        <h1 className={s.title}>
          <span className={s.titleSoft}>The model proposes.</span>
          <br />
          The database decides<span className={s.titleDot}>.</span>
        </h1>

        <p className={s.sub}>
          I build the deterministic control layer between LLMs and transactional
          systems: bookings, payments, customer state. TypeScript, C#/.NET,
          PostgreSQL.
        </p>

        <div className={s.ctas}>
          <a className={s.btnPrimary} href="#systems">
            See the systems
          </a>
          <a className={s.btnGhost} href="#method">
            Read the code
          </a>
          <p className={s.avail}>
            <i className={s.availDot} />
            Open to remote · UTC-5
          </p>
        </div>

        <div className={s.panel} role="group" aria-label={`Example: ${current.crumb}`}>
          <div className={s.top}>
            <span className={s.brand}>gate</span>
            <span className={s.crumb}>
              <span className={s.sep}>/</span>
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
                  {current.who.slice(0, 1)}
                </span>
                <span className={s.ident}>
                  <b>{current.who}</b>
                  <span>{current.meta}</span>
                </span>
              </div>

              <div className={s.bubble}>
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
                    <svg viewBox="0 0 24 24" className={s.markAi}>
                      <path
                        d="M12 1.5 A13 13 0 0 0 22.5 12 A13 13 0 0 0 12 22.5 A13 13 0 0 0 1.5 12 A13 13 0 0 0 12 1.5 Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  system
                  <span className={s.badge}>gate</span>
                </span>
                <div className={s.bubbleAi}>
                  <p>{current.reply}</p>
                  <span
                    className={`${s.chip} ${
                      current.chipState === "blocked" ? s.chipBlocked : s.chipOk
                    }`}
                  >
                    {current.chipState === "blocked" ? <Cross /> : <Check />}
                    {current.chip}
                  </span>
                </div>
              </div>
            </div>

            <div className={s.steps}>
              <div className={s.stepsHead}>
                <b>{current.id === "crm" ? "Batch run" : "Action"}</b>
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
                    <li key={step.label} className={`${s.step} ${s[state]}`}>
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

        <div className={s.tabs} role="group" aria-label="Try another case">
          <span className={s.tabsCap}>Try another case</span>
          {CASES.map((c, i) => (
            <button
              key={c.id}
              type="button"
              className={`${s.tab} ${i === index ? s.tabOn : ""}`}
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
            >
              <TabIcon id={c.id} />
              {c.tab}
            </button>
          ))}
        </div>
      </div>

      <section className={s.systems} id="systems" data-dark>
        <div className={s.systemsInner}>
          <h2 className={s.systemsTitle}>
            Three systems where a failure cost money.
          </h2>

          

          <SystemsStacked />
        </div>
      </section>

      <div className={s.aboutWrap}>
        <section className={s.about} id="about">
          <div className={s.aboutRail}>
            <span className={s.sectionIndex}>05</span>
            <span className={s.sectionLabel}>About</span>
          </div>

          <div className={s.aboutBody}>
            <p className={s.aboutLede}>
              I studied physics before I wrote software. What kept me here is
              what pulled me in: a result doesn&rsquo;t negotiate.
            </p>
            <p>
              A model can be wrong in interesting ways. A booking can&rsquo;t. So
              I build the line where the model stops and the database decides,
              and I make that line dull enough to trust.
            </p>
            <p>
              I&rsquo;m Alejandro. I write the layer that lets the clever layer
              be wrong safely.
            </p>
            <a className={s.aboutLink} href="/about">
              Read the full version <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </div>

      <footer className={s.footer} data-dark>
        <div className={s.footerInner}>
          <div className={s.footerBrand}>
            <span className={s.footerLogo}>roddcode.</span>
            <p className={s.footerCopy}>
              © 2026 roddcode. All rights reserved.
            </p>
            <button
              type="button"
              className={`${s.footerMail} ${copied ? s.footerMailCopied : ""}`}
              onClick={copyEmail}
            >
              {copied ? "copied ✓" : "roddcode.dev@gmail.com"}
            </button>
          </div>

          <nav className={s.footerCols} aria-label="Footer">
            <div className={s.col}>
              <h4>Work</h4>
              <ul>
                <li><a href="#systems">Systems</a></li>
                <li><a href="#method">Method</a></li>
                <li><a href="/writing">Writing</a></li>
              </ul>
            </div>
            <div className={s.col}>
              <h4>Profile</h4>
              <ul>
                <li><a href="/about">About</a></li>
                <li><a href="/cv">CV</a></li>
                <li><a href="/consulting">Consulting</a></li>
              </ul>
            </div>
            <div className={s.col}>
              <h4>Connect</h4>
              <ul>
                <li><a href="#">GitHub</a></li>
                <li><a href="#">LinkedIn</a></li>
                <li><a href="#">npm</a></li>
                <li><a href="mailto:roddcode.dev@gmail.com">Email</a></li>
                <li><a href="/feed.xml">RSS</a></li>
              </ul>
            </div>
          </nav>
        </div>

        <div className={s.footerBar}>
          <p className={s.signature}>
            State is physics. <span>Prompts are weather.</span>
          </p>
          <div className={s.footerMeta}>
            <a href="/privacidad">Privacy</a>
            <a href="/.well-known/security.txt">Security</a>
            <button
              type="button"
              onClick={() =>
                document
                  .querySelector("section")
                  ?.scrollTo({ top: 0, behavior: "smooth" })
              }
            >
              Back to top <span className={s.arrow}>↑</span>
            </button>
          </div>
        </div>
      </footer>
    </section>
  );
}
