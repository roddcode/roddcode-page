import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { LiveMetrics } from "@/components/live-metrics";
import { CaseStudySoffia } from "@/components/case-study-soffia";
import { OpenSource } from "@/components/open-source";
import { Philosophy } from "@/components/philosophy";
import { Arsenal } from "@/components/arsenal";
import { TrustLayer } from "@/components/trust-layer";
import { Handshake } from "@/components/handshake";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LiveMetrics />
        <CaseStudySoffia />
        <OpenSource />
        <Philosophy />
        <Arsenal />
        <TrustLayer />
        <Handshake />
      </main>
      <Footer />
    </>
  );
}
