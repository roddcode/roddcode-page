import { ArrowRight, Check, Plane } from "lucide-react";
import s from "./ndc-preview.module.css";

// Ticket composition informed by Kokonut UI's MIT boarding-pass reference.
// Independently implemented, static NDC offer illustration; no boarding/check-in data.
export function NdcPreview({ locale }: { locale: "es" | "en" }) {
  const es = locale === "es";
  const facts = [
    [es ? "Cabina" : "Cabin", "Economy"],
    [es ? "Trayecto" : "Journey", es ? "Solo ida" : "One way"],
    [es ? "Pasajeros" : "Passengers", es ? "1 adulto" : "1 adult"],
  ];
  const steps = [
    ["AirShopping", es ? "Consulta" : "Shopping"],
    ["OfferPrice", es ? "Precio" : "Pricing"],
    ["OrderCreate", es ? "Orden" : "Order"],
  ];
  return (
    <div className={s.preview} aria-hidden="true">
      <div className={s.body}>
        <div className={s.header}>
          <span className={s.carrier}>
            <span className={s.mark}>
              <Plane size={15} />
            </span>
            Air Europa <span className={s.protocol}>NDC</span>
          </span>
          <span className={s.status}>{es ? "Ejemplo" : "Sample"}</span>
        </div>
        <div className={s.route}>
          <div className={s.airport}>
            <strong>MAD</strong>
            <span>Madrid</span>
          </div>
          <div className={s.path}>
            <span />
            <Plane size={18} />
            <span />
          </div>
          <div className={s.airport}>
            <strong>LIM</strong>
            <span>Lima</span>
          </div>
        </div>
        <div className={s.facts}>
          {facts.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <p className={s.note}>
          {es
            ? "Del itinerario a la creación de la orden."
            : "From itinerary to order creation."}
        </p>
      </div>
      <div className={s.stub}>
        {steps.map(([method, label], index) => (
          <div className={s.step} key={method}>
            <div>
              <span className={s.stepLabel}>
                <Check size={11} />
                {label}
              </span>
              <code>{method}</code>
            </div>
            {index < 2 && <ArrowRight size={12} className={s.arrow} />}
          </div>
        ))}
      </div>
    </div>
  );
}
