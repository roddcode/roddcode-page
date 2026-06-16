import { About } from "@/components/about";
import { Background } from "@/components/background";
import { CaseStudyMeteor } from "@/components/case-study-meteor";
import { CaseStudySoffia } from "@/components/case-study-soffia";
import { Handshake } from "@/components/handshake";
import { Hero } from "@/components/hero";

import { Philosophy } from "@/components/philosophy";
import { TrustLayer } from "@/components/trust-layer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CaseStudySoffia />
      <CaseStudyMeteor />
      <Background />
      <Philosophy />
      <TrustLayer />
      <About />
      <Handshake />
    </>
  );
}
