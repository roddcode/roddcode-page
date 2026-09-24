"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { WhatsappFloat } from "@/components/whatsapp-float";
import { usePathname } from "next/navigation";

function useIsStandaloneRoute() {
  const pathname = usePathname();
  if (!pathname) return false;
  return (
    pathname === "/" ||
    pathname.startsWith("/dossier") ||
    pathname.startsWith("/lab")
  );
}

export function ChromeHeader() {
  const standalone = useIsStandaloneRoute();
  return standalone ? null : <Header />;
}

export function ChromeFooter() {
  const standalone = useIsStandaloneRoute();
  if (standalone) return null;
  return (
    <>
      <Footer />
      <WhatsappFloat />
    </>
  );
}

export function ChromeNoise() {
  const standalone = useIsStandaloneRoute();
  if (standalone) return null;
  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none mix-blend-overlay opacity-[0.015] bg-noise"
      aria-hidden="true"
    />
  );
}
