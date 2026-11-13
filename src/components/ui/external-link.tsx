import { SITE } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";
import type { ComponentProps } from "react";

type LinkProps = ComponentProps<"a"> & {
  locale?: "es" | "en";
  showIcon?: boolean;
};

/** Native anchor, including Radix asChild props/ref; external destinations keep this page open. */
export function ExternalLink({
  children,
  locale = "en",
  showIcon = false,
  ...props
}: LinkProps) {
  const notice =
    locale === "es" ? "abre en otra pestaña" : "opens in a new tab";
  const label = props["aria-label"];
  return (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label ? `${label} (${notice})` : undefined}
    >
      {children}
      {showIcon && (
        <ArrowUpRight
          size={14}
          aria-hidden="true"
          className="inline-block align-text-bottom"
        />
      )}
      <span className="sr-only"> ({notice})</span>
    </a>
  );
}

/** MDX keeps local pages, anchors and mail links in their existing browsing context. */
export function ContentLink({ href, locale, children, ...props }: LinkProps) {
  let external = false;
  if (href && /^(https?:)?\/\//.test(href)) {
    try {
      external = new URL(href, SITE.url).origin !== new URL(SITE.url).origin;
    } catch {
      /* Preserve malformed authored URLs for validation. */
    }
  }
  return external ? (
    <ExternalLink {...props} href={href} locale={locale} showIcon>
      {children}
    </ExternalLink>
  ) : (
    <a {...props} href={href}>
      {children}
    </a>
  );
}
