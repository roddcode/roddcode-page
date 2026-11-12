import { LegalBlock, LegalList, PageShell } from "@/components/page-shell";
import { SITE } from "@/lib/constants";
import { resolveLocale } from "@/lib/portfolio";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "en" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  if (locale !== "en") notFound();
  return {
    title: "Privacy | roddcode",
    description:
      "What personal data I handle on roddcode.com, what I use it for, who it is shared with and how to exercise your rights.",
    alternates: {
      canonical: "/en/privacy",
      languages: { es: "/privacidad", en: "/en/privacy" },
    },
  };
}

const Mail = () => (
  <a
    href={`mailto:${SITE.email}`}
    className="text-accent underline-offset-4 hover:underline"
  >
    {SITE.email}
  </a>
);

export default async function PrivacyPage({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  if (locale !== "en") notFound();
  return (
    <PageShell
      locale="en"
      path="/privacy"
      languagePaths={{ es: "/privacidad", en: "/privacy" }}
    >
      <h1 className="m-0 font-sans text-[clamp(32px,5vw,44px)] leading-[1.05] font-semibold tracking-[-0.03em] text-ink">
        Privacy
      </h1>
      <p className="mt-5 mb-12 max-w-[58ch] text-[17px] leading-[1.6] text-ink-2">
        What personal data I handle when you use this site or write to me, and
        what I do with it. In short: I use it to reply and arrange a call.
      </p>

      <div>
        <LegalBlock title="Who is responsible">
          <p>
            Alejandro Alvarado (roddcode), based in Lima, Peru. For any privacy
            matter, write to me at <Mail />.
          </p>
        </LegalBlock>

        <LegalBlock title="What data I handle">
          <LegalList
            items={[
              "What you send me by email when you write.",
              "Your language preference, stored in a functional cookie.",
              "Aggregated technical metrics from Vercel Analytics and Speed Insights, without tracking cookies.",
            ]}
          />
        </LegalBlock>

        <LegalBlock title="What I use it for">
          <LegalList
            items={[
              "Replying to your enquiries and arranging calls.",
              "Understanding, in aggregate, which parts of the site are used.",
            ]}
          />
          <p>
            I do not use it for advertising or sell it. I only share it with the
            providers described below, and I do not make automated decisions
            with it.
          </p>
        </LegalBlock>

        <LegalBlock title="Who it is shared with">
          <p>
            Only with the providers that run the site: Vercel (hosting and
            technical metrics) and Google (email). They may process data outside
            Peru, mainly in the United States, under their current terms and
            transfer frameworks.
          </p>
          <p>
            If you follow a link to LinkedIn, GitHub or npm, you leave this site
            and that service's privacy policy applies.
          </p>
        </LegalBlock>

        <LegalBlock title="How long I keep it">
          <p>
            For as long as needed to reply to your enquiry and maintain the
            business relationship. Emails are kept only while they are useful
            for following up the conversation.
          </p>
        </LegalBlock>

        <LegalBlock title="Your rights">
          <p>
            Access, rectification, cancellation, objection and portability
            (Peru's Law 29733). If you are in Spain or the European Union, you
            also have the right to access, rectification, erasure, restriction
            of processing, objection and portability (GDPR).
          </p>
          <p>
            To exercise any of them, write to me at <Mail /> and I will reply.
            You can also complain to your data protection authority: the ANPD in
            Peru or the AEPD in Spain.
          </p>
        </LegalBlock>

        <LegalBlock title="Cookies">
          <p>
            I use the functional NEXT_LOCALE cookie to remember whether you
            prefer Spanish or English. It lasts one year and you can delete it
            from your browser. I do not use advertising or tracking cookies.
          </p>
        </LegalBlock>

        <LegalBlock title="Minors">
          <p>
            The site is not aimed at minors and I do not knowingly collect their
            data.
          </p>
        </LegalBlock>

        <LegalBlock title="Changes">
          <p>
            If anything changes in this policy, I will update this page and the
            date below.
          </p>
        </LegalBlock>
      </div>

      <p className="mt-4 border-t border-line pt-6 font-mono text-xs text-ink-4">
        Last updated: 2 November 2026
      </p>
    </PageShell>
  );
}
