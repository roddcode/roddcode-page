import type { Page } from "@playwright/test";
import { getUmamiWebsiteId } from "../src/lib/umami";
import { expect, test } from "./fixtures";

const CV = "/cv-alejandro-alvarado-roddcode.pdf";
const SCRIPT_URL = "https://cloud.umami.is/script.js";
const UMAMI_REQUEST = /https:\/\/(?:[^/]+\.)?umami\.(?:is|dev)\//;
const SLUGS = ["soffia", "ndc", "meteor"];

const productionTrackerId =
  process.env.PLAYWRIGHT_PRODUCTION === "1"
    ? getUmamiWebsiteId({
        NODE_ENV: "production",
        VERCEL_ENV: process.env.VERCEL_ENV,
        NEXT_PUBLIC_UMAMI_WEBSITE_ID: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
      })
    : null;

/** Keep the suite offline: never let a fixture reach the real Umami endpoints. */
async function blockUmami(page: Page) {
  const requested: string[] = [];
  page.on("request", (request) => {
    if (UMAMI_REQUEST.test(request.url())) requested.push(request.url());
  });
  await page.route(UMAMI_REQUEST, (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/javascript",
      body: "",
    }),
  );
  return requested;
}

test("unconfigured builds render no tracker and request no Umami host", async ({
  page,
}) => {
  test.skip(
    Boolean(productionTrackerId),
    "configured production build is covered by the tracker test",
  );
  const requested = await blockUmami(page);
  await page.goto("/");
  await expect(page.locator("script[data-website-id]")).toHaveCount(0);
  await expect(page.locator(`script[src="${SCRIPT_URL}"]`)).toHaveCount(0);
  expect(requested).toEqual([]);
  const sources = await page
    .locator("script[src]")
    .evaluateAll((scripts) =>
      scripts.map((script) => script.getAttribute("src")),
    );
  expect(sources.some((src) => src?.includes("/_vercel/insights"))).toBe(false);
});

test("home links carry CV, email, GitHub and case event attributes", async ({
  page,
}) => {
  await blockUmami(page);
  await page.goto("/");

  const cvLinks = page.locator(`a[href="${CV}"]`);
  await expect(cvLinks).toHaveCount(4);
  for (const link of await cvLinks.all()) {
    await expect(link).toHaveAttribute("data-umami-event", "cv_click");
  }

  const emailLinks = page.locator('a[href^="mailto:"]');
  await expect(emailLinks).toHaveCount(4);
  for (const link of await emailLinks.all()) {
    await expect(link).toHaveAttribute("data-umami-event", "email_click");
  }

  await expect(
    page.locator('footer a[href="https://github.com/roddcode"]'),
  ).toHaveAttribute("data-umami-event", "github_click");
  await expect(page.locator('a[data-umami-event="github_click"]')).toHaveCount(
    1,
  );

  const homeCases = page.locator('#systems a[data-umami-event="case_open"]');
  await expect(homeCases).toHaveCount(9);
  for (const slug of SLUGS) {
    await expect(
      page.locator(`#systems a[data-umami-event-project="${slug}"]`),
    ).toHaveCount(3);
  }
});

test("work index links carry the controlled project slug", async ({ page }) => {
  await blockUmami(page);
  await page.goto("/work");
  const rows = page.locator('main a[data-umami-event="case_open"]');
  await expect(rows).toHaveCount(3);
  for (const slug of SLUGS) {
    await expect(
      page.locator(`main a[data-umami-event-project="${slug}"]`),
    ).toHaveCount(1);
  }
});

test("next-case links carry the controlled project slug", async ({ page }) => {
  await blockUmami(page);
  await page.goto("/work/soffia");
  const next = page.locator('main a[data-umami-event="case_open"]');
  await expect(next).toHaveCount(2);
  for (const link of await next.all()) {
    expect(SLUGS).toContain(
      await link.getAttribute("data-umami-event-project"),
    );
  }
});

test("about and mobile navigation expose CV attributes", async ({ page }) => {
  await blockUmami(page);
  await page.goto("/about");
  await expect(
    page.locator(`a[href="${CV}"][data-umami-event="cv_click"]`),
  ).toHaveCount(4);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByLabel("Menú", { exact: true }).click();
  const mobileCv = page.locator(`header details a[href="${CV}"]`);
  await expect(mobileCv).toBeVisible();
  await expect(mobileCv).toHaveAttribute("data-umami-event", "cv_click");
});

test("writing related case links carry the controlled project slug", async ({
  page,
}) => {
  await blockUmami(page);
  await page.goto("/writing/db-fat-llm-light");
  const related = page
    .getByRole("complementary")
    .filter({
      has: page.getByRole("heading", { name: "Proyectos relacionados" }),
    })
    .locator('a[data-umami-event="case_open"]');
  expect(await related.count()).toBeGreaterThan(0);
  for (const link of await related.all()) {
    expect(SLUGS).toContain(
      await link.getAttribute("data-umami-event-project"),
    );
  }
});

test("CSP allows only the Umami hosts without relaxing other directives", async ({
  request,
}) => {
  const response = await request.get("/");
  const csp = response.headers()["content-security-policy"] ?? "";
  const directives = new Map(
    csp
      .split(";")
      .map((directive) => directive.trim())
      .filter(Boolean)
      .map((directive) => {
        const [name, ...values] = directive.split(/\s+/);
        return [name, values] as const;
      }),
  );
  expect(directives.get("default-src")).toEqual(["'self'"]);
  expect(
    directives.get("script-src")?.filter((value) => value !== "'unsafe-eval'"),
  ).toEqual(["'self'", "'unsafe-inline'", "https://cloud.umami.is"]);
  expect(directives.get("style-src")).toEqual(["'self'", "'unsafe-inline'"]);
  expect(directives.get("font-src")).toEqual(["'self'"]);
  expect(directives.get("img-src")).toEqual(["'self'", "blob:", "data:"]);
  expect(directives.get("connect-src")).toEqual([
    "'self'",
    "https://gateway.umami.is",
  ]);
  expect(directives.get("frame-ancestors")).toEqual(["'none'"]);
  expect(csp).not.toContain("umami.dev");
  expect(csp).not.toContain("api-gateway");
});

test("configured production build renders the tracker exactly once", async ({
  page,
}) => {
  test.skip(
    !productionTrackerId,
    "requires PLAYWRIGHT_PRODUCTION=1, VERCEL_ENV=production and a dummy NEXT_PUBLIC_UMAMI_WEBSITE_ID",
  );
  const requested = await blockUmami(page);
  await page.goto("/writing");
  const tracker = page.locator(`script[src="${SCRIPT_URL}"]`);
  await expect(tracker).toHaveCount(1);
  await expect(tracker).toHaveAttribute(
    "data-website-id",
    productionTrackerId ?? "",
  );
  await expect(tracker).toHaveAttribute(
    "data-domains",
    "roddcode.com,www.roddcode.com",
  );
  await expect(tracker).toHaveAttribute("data-exclude-search", "true");
  await expect(tracker).toHaveAttribute("data-exclude-hash", "true");
  expect(requested).toEqual([SCRIPT_URL]);

  await page.locator('main a[href^="/writing/"]').first().click();
  await expect(page).toHaveURL(/\/writing\/[^/]+$/);
  await expect(page.locator(`script[src="${SCRIPT_URL}"]`)).toHaveCount(1);
  expect(requested).toEqual([SCRIPT_URL]);
});
