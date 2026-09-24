import { SITE } from "@/lib/constants";

export function WhatsappFloat() {
  if (!SITE.whatsapp) return null;

  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribime por WhatsApp"
      data-track="whatsapp-float"
      className="fixed bottom-5 right-5 z-50 md:hidden bg-primary text-background px-5 py-3 text-sm font-medium shadow-lg active:scale-[0.98]"
      style={{ borderRadius: "2px" }}
    >
      WhatsApp
    </a>
  );
}
