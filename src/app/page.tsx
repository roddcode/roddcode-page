import { Arsenal } from "@/components/arsenal";
import { CaseStudyMeteor } from "@/components/case-study-meteor";
import { CaseStudySoffia } from "@/components/case-study-soffia";
import { Footer } from "@/components/footer";
import { Handshake } from "@/components/handshake";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { LiveMetrics } from "@/components/live-metrics";
import { OpenSource } from "@/components/open-source";
import { Philosophy } from "@/components/philosophy";
import { TrustLayer } from "@/components/trust-layer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <LiveMetrics />
        <CaseStudySoffia />
        <CaseStudyMeteor />
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
