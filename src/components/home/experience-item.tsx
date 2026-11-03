import s from "./home.module.css";

/**
 * Un puesto como registro colapsable.
 *
 * Cerrado por defecto en todos los tamaños: la lista se lee como un índice.
 * El stack y el año viven en la cabecera, alineados a la derecha, para que la
 * fila cerrada siga diciendo algo técnico sin exigir un clic.
 */
export function ExperienceItem({
  tile,
  role,
  org,
  when,
  note,
  stack,
}: {
  tile: React.ReactNode;
  role: string;
  org: string;
  when: string;
  note: string;
  stack?: string[];
}) {
  const meta = [stack?.join(" · "), when].filter(Boolean).join(" · ");

  return (
    <details className={s.tlRow}>
      <summary className={s.tlSummary}>
        <span className={s.tlTile} aria-hidden="true">
          {tile}
        </span>

        <span className={s.tlHead}>
          <h3 className={s.tlRole}>{role}</h3>
          <span className={s.tlOrg}>{org}</span>
        </span>

        <span className={s.tlMetaRight}>{meta}</span>

        <span className={s.tlPlus} aria-hidden="true">
          <span />
          <span />
        </span>
      </summary>

      <div className={s.tlPanel}>
        <p className={s.tlNote}>{note}</p>
      </div>
    </details>
  );
}
