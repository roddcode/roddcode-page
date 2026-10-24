import s from "./home.module.css";

export function NdcMock() {
  return (
    <div className={s.ndc}>
      <div className={s.ndcBlock}>
        <span className={s.ndcLabel}>Search</span>
        <p className={s.ndcTitle}>An agency looks for a flight</p>
      </div>

      <div className={s.ndcArrow} aria-hidden="true">
        ↓
      </div>

      <div className={s.ndcBlock}>
        <span className={s.ndcLabel}>Engine</span>
        <p className={s.ndcTitle}>12 providers in parallel</p>
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
        <span className={s.ndcLabelOn}>Air Europa · NDC 21.3</span>
        <p className={s.ndcTitle}>
          Seven operations, without breaking production
        </p>
        <p className={s.ndcOps}>
          AirShopping · OfferPrice · OrderCreate · OrderRetrieve ·
          OrderChange · OrderCancel · UpSell — against PROS.
        </p>
        <p className={s.ndcOk}>✓ in production, with real agencies</p>
      </div>
    </div>
  );
}
