"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NdcMock } from "./ndc-mock";
import s from "./home.module.css";
import { SYSTEMS } from "./systems";

/**
 * Variante A — selector con click.
 * No está montada en la página. Se conserva como componente.
 */
export function SystemsSelector() {
  const [activeSystem, setActiveSystem] = useState(0);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [box, setBox] = useState({ top: 0, height: 0 });

  const activeEntry = SYSTEMS[activeSystem] ?? SYSTEMS[0]!;

  useLayoutEffect(() => {
    const el = itemRefs.current[activeSystem];
    if (el) setBox({ top: el.offsetTop, height: el.offsetHeight });
  }, [activeSystem]);

  useEffect(() => {
    const sync = () => {
      const el = itemRefs.current[activeSystem];
      if (el) setBox({ top: el.offsetTop, height: el.offsetHeight });
    };
    window.addEventListener("resize", sync);
    document.fonts?.ready.then(sync);
    return () => window.removeEventListener("resize", sync);
  }, [activeSystem]);

  return (
    <div className={s.systemsGrid}>
      <div className={s.systemsList} role="tablist" aria-label="Systems">
        <span
          className={s.activeBg}
          aria-hidden="true"
          style={{
            transform: `translateY(${box.top}px)`,
            height: `${box.height}px`,
          }}
        />
        {SYSTEMS.map((sys, i) => (
          <button
            key={sys.id}
            type="button"
            role="tab"
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            aria-selected={i === activeSystem}
            className={`${s.systemItem} ${
              i === activeSystem ? s.systemItemOn : ""
            }`}
            onClick={() => setActiveSystem(i)}
          >
            <span className={s.systemName}>{sys.title}</span>
            <span className={s.systemKind}>{sys.kind}</span>
            <span className={s.systemSummary}>{sys.summary}</span>
            <span className={s.systemReading}>
              {sys.reading} <em>{sys.readingLabel}</em>
            </span>
          </button>
        ))}
      </div>

      <div className={s.diagramCol}>
        {activeEntry.id === "ndc" ? (
          <NdcMock />
        ) : activeEntry.image ? (
          <img
            className={s.diagramImage}
            src={activeEntry.image}
            alt={`${activeEntry.title} — product screenshot`}
          />
        ) : (
          <div className={s.diagram}>
            <ol className={s.nodes}>
              {activeEntry.nodes.map((node) => (
                <li
                  key={node.label}
                  className={`${s.node} ${node.state ? s[node.state] : ""}`}
                >
                  <span className={s.nodeDot} />
                  <span className={s.nodeLabel}>{node.label}</span>
                  <span className={s.nodeMeta}>{node.meta}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
