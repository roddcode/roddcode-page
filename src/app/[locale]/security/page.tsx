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
    title: "Security | roddcode",
    description:
      "How to report a vulnerability in roddcode.com: what is in scope, what to include in the report and what to expect.",
    alternates: {
      canonical: "/en/security",
      languages: { es: "/seguridad", en: "/en/security" },
    },
  };
}

const Mail = () => (
  <a
    href={`mailto:${SITE.email}?subject=Security`}
    className="text-accent underline-offset-4 hover:underline"
  >
    {SITE.email}
  </a>
);

export default async function SecurityPage({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  if (locale !== "en") notFound();
  return (
    <PageShell
      locale="en"
      path="/security"
      languagePaths={{ es: "/seguridad", en: "/security" }}
    >
      <h1 className="m-0 font-sans text-[clamp(32px,5vw,44px)] leading-[1.05] font-semibold tracking-[-0.03em] text-ink">
        Security
      </h1>
      <p className="mt-5 mb-12 max-w-[58ch] text-[17px] leading-[1.6] text-ink-2">
        If you found a vulnerability on this site, I want to know. I will reply
        personally, not a form.
      </p>

      <div>
        <LegalBlock title="How to report">
          <p>
            Write to me at <Mail /> with the subject “Security” pre-filled.
            Include what is needed to reproduce it: the URL, the steps and the
            impact you believe it has.
          </p>
          <p>
            If the report is well described, I can confirm it without asking for
            more than you have already written.
          </p>
        </LegalBlock>

        <LegalBlock title="What is in scope">
          <LegalList
            items={[
              "roddcode.com and all its public routes.",
              "The site's contact forms and links.",
              "The configuration of the server that serves this domain.",
            ]}
          />
          <p>
            Out of scope: social engineering, denial of service, brute-force
            attacks, and any testing of third-party services the site uses
            (Vercel, Google). Report those directly to them.
          </p>
        </LegalBlock>

        <LegalBlock title="What to expect">
          <LegalList
            items={[
              "Acknowledgement and my reading of the report.",
              "Confirmation of whether it is reproducible, or an explanation of why it is not.",
              "If it is: the fix, and notice when it is deployed.",
            ]}
          />
          <p>
            There is no bounty programme: this is a personal site, not a product
            with a bug bounty. I will not take legal action against anyone who
            reports in good faith and without exfiltrating data.
          </p>
        </LegalBlock>

        <LegalBlock title="Disclosure">
          <p>
            I ask for a reasonable margin before you publish the details, so the
            fix is in production. If the report involves third-party data, tell
            me first and do not include it in screenshots.
          </p>
        </LegalBlock>

        <LegalBlock title="Standard format">
          <p>
            The policy is also published as{" "}
            <a
              href="/.well-known/security.txt"
              className="text-accent underline-offset-4 hover:underline"
            >
              security.txt
            </a>
            , the format automated reporting tools read.
          </p>
        </LegalBlock>
      </div>

      <p className="mt-4 border-t border-line pt-6 font-mono text-xs text-ink-4">
        Last updated: 27 October 2026
      </p>
    </PageShell>
  );
}
