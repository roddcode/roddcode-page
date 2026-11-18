import { LegalBlock, LegalList, PageShell } from "@/components/page-shell";
import { ExternalLink } from "@/components/ui/external-link";
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
        What data I handle when you visit this site or write to me: your
        preferences, usage statistics and the information you send by email.
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
              "Your theme preference, stored locally in your browser.",
              "With Umami Cloud: pages visited, referrer, browser, device, language, screen size, approximate location and clicks on CV, email, GitHub and portfolio cases.",
              "With Vercel Speed Insights: loading and responsiveness metrics, route, browser, device, country and other technical performance data.",
            ]}
          />
        </LegalBlock>

        <LegalBlock title="How analytics works">
          <p>
            Umami Cloud loads when configured on the production site. I do not
            add analytics cookies or account identifiers. Query strings and
            fragments of the visited URL are excluded; custom events carry only
            the action name and, for a case, the project.
          </p>
          <p>
            According to Umami, IP addresses are processed to derive approximate
            location and identifiers that group visits, together with browser
            information. IP addresses are not stored as fields in standard
            analytics records, but Umami and its infrastructure may process them
            in operational and security logs. This does not guarantee absolute
            anonymity.
          </p>
          <p>
            I do not enable session recordings, heatmaps or error capture, or
            link analytics to visitor names, email addresses or accounts. This
            version removes Vercel Web Analytics; Vercel Speed Insights
            continues to measure performance.
          </p>
        </LegalBlock>

        <LegalBlock title="What I use it for">
          <LegalList
            items={[
              "Replying to your enquiries and arranging calls.",
              "Understanding traffic and which projects or professional actions attract interest.",
              "Checking the site's real-world performance.",
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
            I use Umami Software, Inc. for analytics, Vercel for hosting and
            performance, and Google for email. These providers and their
            infrastructure may process data outside Peru, including in the
            United States and the European Union. Their data processing
            agreements describe the conditions and safeguards for those
            transfers.
          </p>
          <p>
            See{" "}
            <ExternalLink
              className="text-accent underline underline-offset-4"
              locale="en"
              href="https://umami.is/privacy"
            >
              Umami's privacy policy
            </ExternalLink>
            , its{" "}
            <ExternalLink
              className="text-accent underline underline-offset-4"
              locale="en"
              href="https://umami.is/dpa"
            >
              data processing agreement
            </ExternalLink>
            , the{" "}
            <ExternalLink
              className="text-accent underline underline-offset-4"
              locale="en"
              href="https://umami.is/subprocessors"
            >
              subprocessor list
            </ExternalLink>{" "}
            and the{" "}
            <ExternalLink
              className="text-accent underline underline-offset-4"
              locale="en"
              href="https://vercel.com/docs/speed-insights/privacy-policy"
            >
              Speed Insights privacy information
            </ExternalLink>
            .
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
          <p>
            The Umami Cloud Hobby plan I use retains analytics for six months.
            This does not mean every backup or operational log is immediately
            deleted at that point: those follow the cycles and obligations
            described in its data processing agreement.
          </p>
          <p>
            Retention of Vercel metrics and logs depends on its plan and
            policies. Removing Web Analytics from the code does not itself
            delete any data that may have been collected previously.
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
            from your browser. Your theme preference stays in local storage
            until you change it or clear the site's storage. I do not use
            advertising cookies; Umami's tracker works without cookies. It
            respects Do Not Track when the browser exposes that preference. You
            can block the tracker and continue using the portfolio.
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
        Last updated: 17 November 2026
      </p>
    </PageShell>
  );
}
