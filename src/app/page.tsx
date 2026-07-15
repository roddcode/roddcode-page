import { getAllPosts } from "@/lib/mdx";
import { CaseStudyMeteor } from "@/components/case-study-meteor";
import { CaseStudySoffia } from "@/components/case-study-soffia";
import { Handshake } from "@/components/handshake";
import { Hero } from "@/components/hero";
import { ProcessSection } from "@/components/process-section";
import { ServicesPreview } from "@/components/services-preview";
import { TrustLayer } from "@/components/trust-layer";
import Link from "next/link";

export default function HomePage() {
  const posts = getAllPosts();
  const latest = posts[0];
  const isNew = latest && (Date.now() - new Date(latest.date).getTime()) < 30 * 24 * 60 * 60 * 1000;

  return (
    <>
      <Hero />
      <ProcessSection />

      <hr className="border-border/20 max-w-3xl mx-auto" />

      <CaseStudyMeteor />
      <CaseStudySoffia />

      <hr className="border-border/20 max-w-3xl mx-auto" />

      <ServicesPreview />
      <section className="py-24 container-site">
        <div className="max-w-2xl">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">Engineering philosophy</p>
          <div className="flex flex-col gap-3">
            <Link href={`/writing/${latest?.slug}`} className="group flex items-baseline gap-2">
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">{latest?.title}</span>
              {isNew && <span className="text-[10px] text-primary border border-primary/30 rounded-sm px-1.5 py-0.5 shrink-0">New</span>}
              <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors hidden md:inline truncate">— The LLM reasons, the database decides.</span>
            </Link>
            <Link href="/writing/network-asymmetry" className="text-sm text-foreground hover:text-primary transition-colors">Network Asymmetry — External APIs fail. My systems don't.</Link>
            <Link href="/writing/server-centric-state" className="text-sm text-foreground hover:text-primary transition-colors">Server-Centric State — The browser is a rendering surface, not a vault.</Link>
          </div>
        </div>
      </section>
      <TrustLayer />
      <Handshake />
    </>
  );
}
