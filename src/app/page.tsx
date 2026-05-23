import { About } from "@/components/about";
import { Background } from "@/components/background";
import { CaseStudyMeteor } from "@/components/case-study-meteor";
import { CaseStudySoffia } from "@/components/case-study-soffia";
import { Footer } from "@/components/footer";
import { Handshake } from "@/components/handshake";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { LiveMetrics } from "@/components/live-metrics";

import { Philosophy } from "@/components/philosophy";
import { TrustLayer } from "@/components/trust-layer";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <LiveMetrics />
        <About />
        <Background />
        <CaseStudySoffia />
        <CaseStudyMeteor />
        <Philosophy />
        <Suspense
          fallback={
            <section className="py-24 container-site">
              <div className="max-w-xl">
                <div className="h-8 w-48 bg-muted rounded-sm animate-pulse mb-16" />
                <div className="h-4 w-96 bg-muted rounded-sm animate-pulse mb-3" />
                <div className="h-4 w-80 bg-muted rounded-sm animate-pulse" />
              </div>
            </section>
          }
        >
          <TrustLayer />
        </Suspense>
        <Handshake />
      </main>
      <Footer />
    </>
  );
}
