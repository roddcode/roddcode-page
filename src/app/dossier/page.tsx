import { permanentRedirect } from "next/navigation";

/**
 * El dossier era la sales page de consultoría con precios low-ticket.
 * En modo job hunt se retira de la superficie pública; el contenido
 * completo queda en el historial de git y se reutiliza en /consulting
 * durante la Fase 2.
 */
export default function DossierPage() {
  permanentRedirect("/#casos");
}
