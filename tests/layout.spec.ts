import { expect, test } from "@playwright/test";

const routes = [
  "",
  "/work",
  "/work/soffia",
  "/work/ndc",
  "/work/meteor",
  "/open-source",
  "/about",
];
for (const locale of ["es", "en"] as const) {
  const prefix = locale === "es" ? "" : "/en";
  test(`${locale}: portfolio routes and metadata`, async ({ page }) => {
    for (const route of routes) {
      expect((await page.goto(`${prefix}${route || "/"}`))?.status()).toBe(200);
      await expect(page.locator("main h1")).toHaveCount(1);
      await expect(page.locator("main")).not.toContainText(
        /Expertia|TechHouse|24\/7|86 tests/,
      );
      const canonical = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      expect(new URL(canonical ?? "").href).toBe(
        new URL(`${prefix}${route}` || "/", "https://www.roddcode.com").href,
      );
    }
  });
  test(`${locale}: home links to cases and keeps the demo inside Soffia`, async ({
    page,
  }) => {
    await page.goto(prefix || "/");
    await expect(page.locator("main")).toContainText(
      "Backend & AI Systems Engineer",
    );
    await expect(page.locator("#systems article")).toHaveCount(3);
    await expect(page.locator("#gate-panel")).toHaveCount(0);
    for (const slug of ["soffia", "ndc", "meteor"]) {
      await page
        .locator(`#systems a[href="${prefix}/work/${slug}"]`)
        .last()
        .click();
      await expect(page).toHaveURL(new RegExp(`${prefix}/work/${slug}$`));
      await expect(page.locator("article > h2").first()).toBeVisible();
      const contents = page.getByRole("navigation", {
        name: locale === "es" ? "Contenido del caso" : "Case contents",
      });
      for (const link of await contents.getByRole("link").all()) {
        const target = await link.getAttribute("href");
        await expect(page.locator(target ?? "#missing")).toHaveCount(1);
      }
      await page.goto(prefix || "/");
    }
  });
}

for (const width of [320, 390, 1024, 1440]) {
  test(`layout without horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/work/soffia",
      "/work/ndc",
      "/open-source",
      "/about",
    ]) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const edges = await page
        .locator("[data-container]")
        .evaluateAll((elements) =>
          elements.map((el) => Math.round(el.getBoundingClientRect().left)),
        );
      expect(edges.length).toBeGreaterThan(0);
      expect([...new Set(edges)]).toHaveLength(1);
    }
  });
}

test("language switching preserves the case", async ({ page }) => {
  await page.goto("/work/ndc");
  await page.locator('header a[hreflang="en"]').click();
  await expect(page).toHaveURL(/\/en\/work\/ndc$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.locator('header a[hreflang="es"]').click();
  await expect(page).toHaveURL(/\/work\/ndc$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.locator('header a[hreflang="es"]')).toHaveAttribute(
    "aria-current",
    "page",
  );
});

test("locale return paths cannot redirect to another origin", async ({
  request,
}) => {
  for (const path of [
    "//example.com",
    "https://example.com",
    "/\\example.com",
    "/\n/example.com",
  ]) {
    const response = await request.get(
      `/api/locale?to=es&next=${encodeURIComponent(path)}`,
      { maxRedirects: 0 },
    );
    expect(new URL(response.headers().location ?? "").pathname).toBe("/");
    expect(response.headers().location).not.toContain("example.com");
  }
});

test("mobile navigation supports keyboard, escape and touch", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");
  const trigger = page.getByLabel("Menú", { exact: true });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const details = page.locator("header details");
  await expect(details).toHaveAttribute("open", "");
  await expect(
    details.getByRole("link", { name: "Proyectos", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(details).not.toHaveAttribute("open");
  await expect(trigger).toBeFocused();
  for (const selector of [
    'header a[hreflang="es"]',
    'header a[hreflang="en"]',
    "header summary",
  ]) {
    const box = await page.locator(selector).boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(44);
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }
});

test("booking illustration distinguishes conflict, commit, replay and reset", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/work/soffia#gate-panel");
  const demo = page.locator("#gate-panel");
  await expect(demo).toContainText("Reconstrucción ilustrativa");
  await demo.getByRole("radio", { name: "10:30 Horario ocupado" }).check();
  await demo.getByRole("button", { name: "Probar reserva" }).click();
  await expect(demo.locator("output")).toHaveAttribute(
    "data-state",
    "rejected",
  );
  await expect(demo.locator("code")).toHaveCount(0);
  await demo.getByRole("radio", { name: "10:00 Horario disponible" }).check();
  await demo.getByRole("button", { name: "Probar reserva" }).focus();
  await page.keyboard.press("Enter");
  await expect(demo.locator("output")).toHaveAttribute(
    "data-state",
    "accepted",
  );
  const receipt = await demo.locator("code").innerText();
  await demo.getByRole("button", { name: "Repetir solicitud" }).click();
  await expect(demo.locator("output")).toHaveAttribute(
    "data-state",
    "replayed",
  );
  await expect(demo.locator("code")).toHaveText(receipt);
  await demo.getByRole("button", { name: "Reiniciar" }).click();
  await expect(demo.locator("output")).toHaveAttribute("data-state", "idle");
  await expect(demo.locator("code")).toHaveCount(0);
  await expect(demo.getByRole("button", { name: "Probar reserva" })).toHaveCSS(
    "transition-duration",
    "0s",
  );
});

test("component contracts expose limits and verified usage", async ({
  page,
}) => {
  await page.goto("/open-source");
  await expect(page.locator("#reactive-fsm")).toContainText("1.4.1");
  await expect(page.locator("#exactly-once")).toContainText("0.2.0");
  for (const name of ["reactive-fsm", "exactly-once"]) {
    const component = page.locator(`#${name}`);
    await expect(
      component.getByRole("heading", { name: "Hasta dónde llega" }),
    ).toBeVisible();
    await expect(
      component.getByRole("heading", { name: "Uso comprobado" }),
    ).toBeAttached();
    await expect(
      component.getByRole("link", { name: "Código fuente" }),
    ).toHaveAttribute("href", `https://github.com/roddcode/${name}`);
  }
});

test("CV and historical redirects resolve to the preserved PDF", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await expect(
    page.locator('main a[href="/cv-alejandro-alvarado-roddcode.pdf"]').first(),
  ).toHaveAttribute("target", "_blank");
  const pdf = await request.get("/cv-alejandro-alvarado-roddcode.pdf");
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
  for (const path of [
    "/cv",
    "/cv-alejandro-alvarado.pdf",
    "/cv-alejandro-alvarado-fullstack.pdf",
  ]) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(
      "/cv-alejandro-alvarado-roddcode.pdf",
    );
  }
});

test("legacy demo and localized writing aliases preserve their destinations", async ({
  page,
  request,
}) => {
  await page.goto("/#gate-panel");
  await expect(page).toHaveURL(/\/work\/soffia#gate-panel$/);
  await expect(page.locator("#gate-panel")).toBeVisible();
  const alias = await request.get("/en/writing/network-asymmetry", {
    maxRedirects: 0,
  });
  expect(alias.status()).toBe(308);
  expect(alias.headers().location).toBe("/writing/network-asymmetry");
});

test("reading pages keep sticky navigation and article image metadata", async ({
  page,
}) => {
  for (const route of ["/privacidad", "/seguridad", "/writing"]) {
    await page.goto(route);
    await page.evaluate(() => window.scrollTo(0, 700));
    await expect(page.locator("header")).toHaveCSS("position", "sticky");
    expect(
      Math.round((await page.locator("header").boundingBox())?.y ?? -1),
    ).toBe(0);
  }
  await page.goto("/writing/network-asymmetry");
  await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
    "content",
    await page.locator("h1").innerText(),
  );
  const url = await page
    .locator('meta[name="twitter:image"]')
    .getAttribute("content");
  const image = await page.request.get(new URL(url ?? "").pathname);
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/png");
});

test("unknown cases have a localized 404", async ({ page }) => {
  expect((await page.goto("/work/unknown"))?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("no existe");
  await expect(page.getByRole("link", { name: "Volver al inicio" })).toHaveCSS(
    "background-color",
    "rgb(31, 78, 140)",
  );
});

test("hero comparison is noindex and contains no product demo", async ({
  page,
}) => {
  for (const variant of ["a", "b"]) {
    await page.goto(`/design-preview?variant=${variant}`);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, nofollow",
    );
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.locator("#gate-panel")).toHaveCount(0);
  }
});

test("case and essay links provide context in both directions", async ({
  page,
}) => {
  await page.goto("/work/soffia");
  await page.locator('article a[href="/writing/db-fat-llm-light"]').click();
  await expect(page).toHaveURL(/\/writing\/db-fat-llm-light$/);
  const related = page
    .getByRole("complementary")
    .filter({ has: page.getByRole("heading", { name: "Related work" }) });
  await related.getByRole("link", { name: "SoffIA", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/work\/soffia$/);
});
