import {
  UMAMI_DOMAINS,
  UMAMI_SCRIPT_URL,
  getUmamiWebsiteId,
} from "@/lib/umami";
import Script from "next/script";

/**
 * Single root-level tracker. Pageviews and SPA navigation are automatic; no
 * route listener, replay, performance, error or scroll collection is enabled.
 */
export function UmamiAnalytics() {
  const websiteId = getUmamiWebsiteId();
  if (!websiteId) return null;
  return (
    <Script
      src={UMAMI_SCRIPT_URL}
      strategy="afterInteractive"
      data-website-id={websiteId}
      data-domains={UMAMI_DOMAINS}
      data-exclude-search="true"
      data-exclude-hash="true"
      data-do-not-track="true"
    />
  );
}
