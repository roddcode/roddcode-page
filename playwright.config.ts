import { defineConfig } from "@playwright/test";

const production = process.env.PLAYWRIGHT_PRODUCTION === "1";
const baseURL = production ? "http://localhost:3200" : "http://localhost:3000";

export default defineConfig({
  testDir: "./tests",
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
      testMatch: /layout\.spec\.ts/,
    },
    {
      name: "firefox",
      use: { browserName: "firefox" },
      testMatch: /browser\.spec\.ts/,
    },
    {
      name: "webkit",
      use: { browserName: "webkit" },
      testMatch: /browser\.spec\.ts/,
    },
  ],
  fullyParallel: true,
  workers: 2,
  reporter: "list",
  use: {
    baseURL,
    // el middleware negocia por Accept-Language: sin esto, un navegador
    // en ingles recibe /en y la prueba de idioma mide la suerte del entorno
    locale: "es-PE",
  },
  webServer: {
    command: production ? "pnpm exec next start -p 3200" : "pnpm dev",
    url: baseURL,
    reuseExistingServer: !production,
    timeout: 120_000,
  },
});
