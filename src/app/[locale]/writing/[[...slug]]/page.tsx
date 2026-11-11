import { resolveLocale } from "@/lib/portfolio";
import { permanentRedirect } from "next/navigation";

export default async function WritingAlias({
  params,
}: { params: Promise<{ locale: string; slug?: string[] }> }) {
  const { locale, slug = [] } = await params;
  resolveLocale(locale);
  permanentRedirect(
    `/writing${slug.length ? `/${slug.map(encodeURIComponent).join("/")}` : ""}`,
  );
}
