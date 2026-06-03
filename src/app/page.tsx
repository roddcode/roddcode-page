import { About } from "@/components/about";
import { Background } from "@/components/background";
import { CaseStudyMeteor } from "@/components/case-study-meteor";
import { CaseStudySoffia } from "@/components/case-study-soffia";
import { Footer } from "@/components/footer";
import { Handshake } from "@/components/handshake";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";

import { Philosophy } from "@/components/philosophy";
import { TrustLayer } from "@/components/trust-layer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <CaseStudySoffia />
        <CaseStudyMeteor />
        <Background />
        <Philosophy />
        <TrustLayer />
        <About />
        <Handshake />
      </main>
      <Footer />
    </>
  );
}
