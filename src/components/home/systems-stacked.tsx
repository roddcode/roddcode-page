import type { NdcContent, SystemContent } from "@/content/home/types";
import Image from "next/image";
import s from "./home.module.css";
import { NdcMock } from "./ndc-mock";

export function SystemsStacked({
  items,
  ndc,
  builtWith,
}: {
  items: SystemContent[];
  ndc: NdcContent;
  builtWith: string;
}) {
  return (
    <div className={s.stacked}>
      {items.map((sys, i) => (
        <article
          key={sys.id}
          className={`${s.stackRow} ${i === 0 ? s.stackRowLead : ""}`}
        >
          <div className={s.stackText}>
            <div className={s.stackHead}>
              <h3 className={s.stackName}>{sys.title}</h3>
              <span className={s.stackPeriod}>
                {sys.discipline}
                {sys.scope ? ` · ${sys.scope}` : ""} · {sys.period}
              </span>
            </div>

            <p className={s.stackSummary}>{sys.detail}</p>

            <ul className={s.stackBullets}>
              {sys.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>

            <p className={s.stackStack}>
              <span>{builtWith}</span> {sys.stack.join(" · ")}
            </p>

            <p className={s.stackReading}>
              {sys.reading} <em>{sys.readingLabel}</em>
            </p>
          </div>

          <div className={s.stackMedia}>
            {sys.id === "ndc" ? (
              <NdcMock t={ndc} />
            ) : sys.image ? (
              <Image
                className={s.diagramImage}
                src={sys.image}
                alt={sys.title}
                width={sys.id === "soffia" ? 1517 : 1600}
                height={sys.id === "soffia" ? 908 : 770}
                sizes="(max-width: 820px) calc(100vw - 36px), (max-width: 1240px) 45vw, 620px"
              />
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
