import { NdcMock } from "./ndc-mock";
import s from "./home.module.css";
import { SYSTEMS } from "./systems";

export function SystemsStacked() {
  return (
    <div className={s.stacked}>
      {SYSTEMS.map((sys, i) => (
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
                <span>Built with</span> {sys.stack.join(" · ")}
              </p>

              <p className={s.stackReading}>
                {sys.reading} <em>{sys.readingLabel}</em>
              </p>
            </div>

            <div className={s.stackMedia}>
              {sys.id === "ndc" ? (
                <NdcMock />
              ) : sys.image ? (
                <img
                  className={s.diagramImage}
                  src={sys.image}
                  alt={`${sys.title} — product screenshot`}
                />
              ) : null}
            </div>
          </article>
        ))}
      </div>
  );
}
