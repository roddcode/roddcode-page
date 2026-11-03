import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  font-src 'self';
  img-src 'self' blob: data:;
  connect-src 'self';
  frame-ancestors 'none';
`.replace(/\s{2,}/g, " ").trim();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1536],
  },
  async redirects() {
    // Rutas del diseño anterior que hoy están publicadas en `main`. Sin esto,
    // el merge las convierte en 404 y se pierde lo que ya estaba indexado.
    return [
      { source: "/services/:path*", destination: "/", permanent: true },
      { source: "/dossier/:path*", destination: "/", permanent: true },
      ...[
        "/cv",
        "/cv-alejandro-alvarado.pdf",
        "/cv-alejandro-alvarado-fullstack.pdf",
      ].map((source) => ({
        source,
        destination: "/cv-alejandro-alvarado-roddcode.pdf",
        permanent: true,
      })),
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: ContentSecurityPolicy },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
  experimental: {
    optimizeCss: true,
  },
};

export default withNextIntl(nextConfig);
