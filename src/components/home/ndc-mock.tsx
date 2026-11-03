import type { NdcContent } from "@/content/home/types";
import s from "./home.module.css";

export function NdcMock({ t }: { t: NdcContent }) {
  return (
    <div className={s.ndc}>
      <div className={s.ndcBlock}>
        <span className={s.ndcLabel}>{t.search}</span>
        <p className={s.ndcTitle}>{t.searchTitle}</p>
      </div>

      <div className={s.ndcArrow} aria-hidden="true">
        ↓
      </div>

      <div className={s.ndcBlock}>
        <span className={s.ndcLabel}>{t.engine}</span>
        <p className={s.ndcTitle}>{t.engineTitle}</p>
        <div className={s.ndcChips}>
          <span>XML</span>
          <span>SOAP</span>
          <span>JSON</span>
        </div>
      </div>

      <div className={s.ndcArrow} aria-hidden="true">
        ↓
      </div>

      <div className={`${s.ndcBlock} ${s.ndcBlockOn}`}>
        <span className={s.ndcLabelOn}>{t.opsLabel}</span>
        <p className={s.ndcOps}>{t.ops}</p>
      </div>
    </div>
  );
}
