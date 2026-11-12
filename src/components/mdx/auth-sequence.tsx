import { ArrowLeft, ArrowRight } from "lucide-react";
import s from "./auth-sequence.module.css";

export function AuthSequenceDiagram() {
  return (
    <figure className={s.diagram}>
      <figcaption>Cookie-based authentication</figcaption>
      <ol>
        <li>
          <div>
            <strong>Browser</strong>
            <code>POST /api/auth/login</code>
          </div>
          <ArrowRight aria-hidden="true" size={20} />
          <div>
            <strong>Server</strong>
            <span>
              Validates credentials and issues JWTs (access + refresh).
            </span>
          </div>
        </li>
        <li>
          <div>
            <strong>Browser</strong>
            <span>Receives HttpOnly cookies.</span>
          </div>
          <ArrowLeft aria-hidden="true" size={20} />
          <div>
            <strong>Server</strong>
            <span>Sets HttpOnly cookies.</span>
          </div>
        </li>
        <li>
          <div>
            <strong>Browser</strong>
            <code>GET /api/protected</code>
            <span>Cookie sent automatically.</span>
          </div>
          <ArrowRight aria-hidden="true" size={20} />
          <div>
            <strong>Server</strong>
            <span>
              Reads the cookie, validates the JWT and responds with protected
              data.
            </span>
          </div>
        </li>
      </ol>
    </figure>
  );
}
