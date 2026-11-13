import type { Package } from "../content/portfolio/types";

const VERSION = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;

/** Server-side metadata only; callers isolate this optional value in Suspense. */
export async function getNpmVersion(
  name: Package["name"],
  request: typeof fetch = fetch,
): Promise<string | null> {
  try {
    const response = await request(
      `https://registry.npmjs.org/${name}/latest`,
      {
        next: { revalidate: 86400 },
        signal: AbortSignal.timeout(1500),
      },
    );
    if (!response.ok) return null;
    const data: unknown = await response.json();
    if (
      typeof data !== "object" ||
      data === null ||
      !("name" in data) ||
      data.name !== name ||
      !("version" in data) ||
      typeof data.version !== "string" ||
      data.version.length > 128 ||
      !VERSION.test(data.version)
    )
      return null;
    return data.version;
  } catch {
    return null;
  }
}
