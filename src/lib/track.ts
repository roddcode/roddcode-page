export function trackClick(label: string) {
  if (typeof window === "undefined") return;
  try {
    console.log("[track]", label);
  } catch {
    // no-op
  }
}
