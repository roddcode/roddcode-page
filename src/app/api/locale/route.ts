import { routing } from "@/i18n/routing";
import { type NextRequest, NextResponse } from "next/server";

const YEAR = 60 * 60 * 24 * 365;

/**
 * Cambio de idioma explícito.
 *
 * Sin esto el idioma queda preso: next-intl escribe la cookie solo cuando el
 * idioma resuelto difiere del `Accept-Language`, así que un visitante con el
 * sistema en inglés aterriza en `/en` y después `/` lo vuelve a mandar a `/en`
 * para siempre. Pasar por acá fija la cookie y recién entonces redirige, de
 * modo que la elección gana sobre la detección del navegador.
 */
export function GET(request: NextRequest) {
  const asked = request.nextUrl.searchParams.get("to");
  const locale =
    routing.locales.find((l) => l === asked) ?? routing.defaultLocale;

  const requestedPath = request.nextUrl.searchParams.get("next") ?? "/";
  let safePath = "/";
  if (
    requestedPath.startsWith("/") &&
    !requestedPath.startsWith("//") &&
    !requestedPath.includes("\\")
  ) {
    try {
      const candidate = new URL(requestedPath, request.url);
      if (candidate.origin === request.nextUrl.origin) {
        safePath = `${candidate.pathname}${candidate.search}`;
      }
    } catch {
      // A malformed return path falls back to the locale home.
    }
  }
  const target =
    locale === routing.defaultLocale
      ? safePath
      : `/${locale}${safePath === "/" ? "" : safePath}`;
  const response = NextResponse.redirect(new URL(target, request.url), 307);

  response.cookies.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: YEAR,
    sameSite: "lax",
  });

  return response;
}
