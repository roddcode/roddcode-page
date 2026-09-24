"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { WhatsappFloat } from "@/components/whatsapp-float";
import { usePathname } from "next/navigation";

function useIsLegacyRoute() {
  const pathname = usePathname();
  if (!pathname) return false;
  return pathname.startsWith("/writing");
}

export function ChromeHeader() {
  const legacy = useIsLegacyRoute();
  return legacy ? <Header /> : null;
}

export function ChromeFooter() {
  const legacy = useIsLegacyRoute();
  if (!legacy) return null;
  return (
    <>
      <Footer />
      <WhatsappFloat />
    </>
  );
}

export function ChromeNoise() {
  const legacy = useIsLegacyRoute();
  if (!legacy) return null;
  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none mix-blend-overlay opacity-[0.015] bg-noise"
      aria-hidden="true"
    />
  );
}
