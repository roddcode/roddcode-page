export const UMAMI_SCRIPT_URL = "https://cloud.umami.is/script.js";
export const UMAMI_DOMAINS = "roddcode.com,www.roddcode.com";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type UmamiEnvironment = {
  NODE_ENV?: string;
  VERCEL_ENV?: string;
  NEXT_PUBLIC_UMAMI_WEBSITE_ID?: string;
};

export function isUmamiWebsiteId(value: string | undefined): value is string {
  return typeof value === "string" && UUID_PATTERN.test(value.trim());
}

/**
 * Umami only runs on the public production deployment. Preview, local builds and
 * missing or malformed IDs render no tracker at all.
 */
export function getUmamiWebsiteId(
  env: UmamiEnvironment = process.env,
): string | null {
  if (env.NODE_ENV !== "production" || env.VERCEL_ENV !== "production") {
    return null;
  }
  const websiteId = env.NEXT_PUBLIC_UMAMI_WEBSITE_ID?.trim();
  return websiteId && isUmamiWebsiteId(websiteId) ? websiteId : null;
}
