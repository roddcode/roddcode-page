import { expect, test } from "@playwright/test";

const routes = [
  "",
  "/work",
  "/work/soffia",
  "/work/ndc",
  "/work/meteor",
  "/about",
];
for (const locale of ["es", "en"] as const) {
  const prefix = locale === "es" ? "" : "/en";
  test(`${locale}: portfolio routes and metadata`, async ({ page }) => {
    for (const route of routes) {
      expect((await page.goto(`${prefix}${route || "/"}`))?.status()).toBe(200);
      await expect(page.locator("main h1")).toHaveCount(1);
      await expect(page.locator("main")).not.toContainText(
        /Confidential client|Cliente confidencial|24\/7|86 tests/,
      );
      const canonical = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      expect(new URL(canonical ?? "").href).toBe(
        new URL(`${prefix}${route}` || "/", "https://www.roddcode.com").href,
      );
    }
  });
  test(`${locale}: full experience is reachable from home`, async ({
    page,
  }) => {
    await page.goto(prefix || "/");
    await expect(page.locator("#experience")).toContainText("Expertia Travel");
    await page
      .getByRole("link", {
        name:
          locale === "es"
            ? "Ver 4 experiencias más"
            : "View 4 more experiences",
      })
      .click();
    await expect(page).toHaveURL(`${prefix}/about#experience`);
    await expect(page.locator("#experience > ol > li")).toHaveCount(7);
    await expect(page.locator("#experience")).toContainText(
      locale === "es"
        ? "Tech-House · Cliente: Expertia Travel"
        : "Tech-House · Client: Expertia Travel",
    );
    await expect(page.locator("#experience")).toContainText("ITAW Group");
    await expect(page.locator("#experience")).toContainText("WebemprendePE");
  });
  test(`${locale}: home links to cases and keeps the demo inside Soffia`, async ({
    page,
  }) => {
    await page.goto(prefix || "/");
    await expect(page.locator("main")).toContainText("Backend & AI Engineer");
    await expect(page.locator("#systems article")).toHaveCount(3);
    await expect(page.locator("#gate-panel")).toHaveCount(0);
    for (const slug of ["soffia", "ndc", "meteor"]) {
      await page
        .locator(`#systems a[href="${prefix}/work/${slug}"]`)
        .last()
        .click();
      await expect(page).toHaveURL(new RegExp(`${prefix}/work/${slug}$`));
      await expect(page.locator("article h2[id]").first()).toBeVisible();
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
      "/about",
      "/privacidad",
      "/en/privacy",
      "/seguridad",
      "/en/security",
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
  await expect(page.locator('header a[hreflang="en"]')).toHaveText("ES");
});

test("English legal pages mirror the Spanish versions", async ({ page }) => {
  await page.goto("/en");
  await expect(page.locator('footer a[href="/en/privacy"]')).toHaveCount(1);
  await expect(page.locator('footer a[href="/en/security"]')).toHaveCount(1);
  for (const [en, es] of [
    ["/en/privacy", "/privacidad"],
    ["/en/security", "/seguridad"],
  ] as const) {
    expect((await page.goto(en))?.status()).toBe(200);
    await expect(page.locator("main h1")).toHaveCount(1);
    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    expect(new URL(canonical ?? "").href).toBe(
      new URL(en, "https://www.roddcode.com").href,
    );
    await page.locator('header a[hreflang="es"]').click();
    await expect(page).toHaveURL(new RegExp(`${es}$`));
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await page.locator('header a[hreflang="en"]').click();
    await expect(page).toHaveURL(new RegExp(`${en}$`));
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  }
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
  for (const selector of ['header a[hreflang="en"]', "header summary"]) {
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

for (const locale of ["es", "en"] as const) {
  test(`${locale}: open source links directly to code and preserves old URLs`, async ({
    page,
    request,
  }) => {
    const home = locale === "es" ? "/" : "/en";
    const legacy = locale === "es" ? "/open-source" : "/en/open-source";
    const response = await request.get(legacy, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(`${home}#open-source`);
    await page.goto(`${legacy}#reactive-fsm`);
    await expect(page).toHaveURL(`${home}#open-source`);
    await expect(page.locator("#open-source")).toBeInViewport();
    await expect(
      page
        .locator("header, footer")
        .getByRole("link", { name: "Open source", exact: true }),
    ).toHaveCount(0);
    for (const name of ["reactive-fsm", "exactly-once"]) {
      await expect(
        page.locator(`#${name}`).getByRole("link", {
          name: locale === "es" ? "Ver código" : "View code",
        }),
      ).toHaveAttribute("href", `https://github.com/roddcode/${name}`);
    }
    await page.goto(`${locale === "es" ? "" : "/en"}/work/soffia`);
    for (const name of ["reactive-fsm", "exactly-once"]) {
      await expect(
        page.locator("main").getByRole("link", { name: new RegExp(name) }),
      ).toHaveAttribute("href", `https://github.com/roddcode/${name}`);
    }
    expect(await (await request.get("/sitemap.xml")).text()).not.toContain(
      "/open-source",
    );
  });
}

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

test("retired previews and draft article URLs are unavailable", async ({
  page,
}) => {
  for (const route of [
    "/design-preview",
    "/en/design-preview",
    "/writing/_on-taste",
    "/writing/on-taste",
  ]) {
    expect((await page.goto(route))?.status()).toBe(404);
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

test("theme follows the system until a manual choice, then persists across routes, reloads and locales", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/dark/);
  const toggle = page.getByRole("button", {
    name: "Activar modo claro",
    exact: true,
  });
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(page.locator("html")).toHaveClass(/light/);
  await page.goto("/writing/db-fat-llm-light");
  await expect(page.locator("html")).toHaveClass(/light/);
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/light/);
  await page.goto("/en");
  await expect(page.locator("html")).toHaveClass(/light/);
  const enToggle = page.getByRole("button", {
    name: "Switch to dark mode",
    exact: true,
  });
  await enToggle.click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.goto("/en/work/soffia");
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.emulateMedia({ colorScheme: "light" });
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/dark/);
  expect(errors).toEqual([]);
});

test("mobile theme toggle is keyboard operable with a full touch target", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/");
  const toggle = page.getByRole("button", {
    name: "Activar modo oscuro",
    exact: true,
  });
  await expect(toggle).toBeVisible();
  const box = await toggle.boundingBox();
  expect(box?.width).toBeGreaterThanOrEqual(44);
  expect(box?.height).toBeGreaterThanOrEqual(44);
  await expect(toggle).toHaveCSS("transition-duration", "0s");
  await toggle.focus();
  await expect(toggle).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect(
    page.getByRole("button", { name: "Activar modo claro", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Space");
  await expect(page.locator("html")).toHaveClass(/light/);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("shared controls preserve link semantics, keyboard tooltips and real email copying", async ({
  page,
  context,
}) => {
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.goto("/");
  const primary = page.getByRole("link", {
    name: "Ver proyectos",
    exact: true,
  });
  await expect(primary).toHaveAttribute("href", "/work");
  await expect(primary).toHaveAttribute("data-slot", "button");
  await expect(
    page.locator("a a, button button, button a, a button"),
  ).toHaveCount(0);
  const theme = page.getByRole("button", {
    name: "Activar modo oscuro",
    exact: true,
  });
  await theme.focus();
  await expect(page.getByRole("tooltip")).toHaveText("Activar modo oscuro");
  await expect(theme).toHaveCSS("transition-duration", "0s");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("tooltip")).toHaveCount(0);

  await context.grantPermissions(["clipboard-read", "clipboard-write"], {
    origin: new URL(page.url()).origin,
  });
  const copy = page.getByRole("button", { name: "Copiar correo", exact: true });
  await copy.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("footer output")).toHaveText("Correo copiado");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "roddcode.dev@gmail.com",
  );
});

test("case content stays readable without JavaScript and with reduced motion", async ({
  browser,
  page,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    locale: "es-PE",
  });
  try {
    const plain = await context.newPage();
    await plain.goto(new URL("/work/soffia", baseURL).href);
    await expect(plain.locator("main h1")).toHaveText("SoffIA");
    await expect(plain.locator("article")).toContainText("PostgreSQL");
    await expect(plain.locator("[data-reveal-state='pending']")).toHaveCount(0);
    await expect(plain.locator("article")).toHaveCSS("opacity", "1");
  } finally {
    await context.close();
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/work/ndc");
  await expect(page.locator("article h2[id]").first()).toBeVisible();
  await expect(page.locator("[data-reveal-state='pending']")).toHaveCount(0);
});

test("case contents stay visible while reading and collapse on mobile", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/work/soffia");
  const contents = page.getByRole("navigation", {
    name: "Contenido del caso",
    exact: true,
  });
  const last = contents.getByRole("link").last();
  const target = await last.getAttribute("href");
  await last.click();
  await expect(contents).toBeInViewport();
  await expect(
    contents.locator('a[aria-current="location"]:visible'),
  ).toHaveAttribute("href", target ?? "");
  const box = await contents.boundingBox();
  expect(box?.y).toBeGreaterThanOrEqual(80);
  expect(box?.y).toBeLessThan(180);
  await page.setViewportSize({ width: 390, height: 844 });
  const summary = page.locator("main details summary");
  await expect(summary).toHaveCount(1);
  await summary.click();
  await contents.getByRole("link").first().click();
  await expect(page.locator("article h2[id]").first()).toBeInViewport();
});

test("writing keeps readable layouts, accessible code copying and client navigation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/writing/server-centric-state");
  const block = page.locator("[data-code-block]").first();
  const expected = (await block.locator("pre").textContent())?.trimEnd();
  await page.evaluate(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (text: string) => {
          document.documentElement.dataset.testCopy = text;
        },
      },
    });
  });
  const copy = block.getByRole("button", { name: "Copy code" });
  await expect(copy).toHaveAttribute("data-slot", "button");
  await copy.focus();
  await page.keyboard.press("Enter");
  await expect(block.locator("output")).toHaveText("Code copied");
  expect(
    await page.evaluate(() => document.documentElement.dataset.testCopy),
  ).toBe(expected);
  await page.evaluate(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async () => {
          throw new Error("denied");
        },
      },
    });
  });
  await copy.click();
  await expect(block.locator("output")).toContainText("Could not copy");
  await block.locator("pre").focus();
  await expect(block.locator("pre")).toBeFocused();
  const next = page
    .getByRole("complementary")
    .filter({
      has: page.getByRole("heading", { name: "Read next", exact: true }),
    })
    .getByRole("link")
    .first();
  const href = await next.getAttribute("href");
  await next.click();
  await expect(page).toHaveURL(href ?? "");
  await expect(page.locator("main h1")).toBeVisible();
  await expect(page.locator("[data-writing-article]")).toHaveCount(1);
});

test("writing remains readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 900 },
  });
  const page = await context.newPage();
  await page.goto("/writing/server-centric-state");
  await expect(page.locator("main h1")).toBeVisible();
  await expect(page.locator("[data-code-block] pre")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await context.close();
});

test("theme changes reuse the visible topographic renderer", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.addInitScript(() => {
    localStorage.setItem("roddcode-theme", "light");
    if (typeof WebGL2RenderingContext === "undefined") return;
    const createProgram = WebGL2RenderingContext.prototype.createProgram;
    WebGL2RenderingContext.prototype.createProgram = function () {
      const root = document.documentElement;
      root.dataset.testPrograms = String(
        Number(root.dataset.testPrograms ?? 0) + 1,
      );
      return createProgram.call(this);
    };
  });
  await page.goto("/");
  await page.waitForTimeout(1800);
  const before = Number(
    (await page.locator("html").getAttribute("data-test-programs")) ?? 0,
  );
  test.skip(before === 0, "WebGL unavailable in this browser environment");
  await page.getByRole("button", { name: "Activar modo oscuro" }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.waitForTimeout(1800);
  expect(
    Number(await page.locator("html").getAttribute("data-test-programs")),
  ).toBe(before);
});

for (const locale of ["es", "en"] as const) {
  test(`${locale}: external resources keep the portfolio open`, async ({
    page,
  }) => {
    const prefix = locale === "es" ? "" : "/en";
    await page.goto(prefix || "/");
    const resources = page.locator("#open-source a");
    await expect(resources).toHaveCount(4);
    for (const link of await resources.all()) {
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
      await expect(link.locator(".sr-only")).toContainText(
        locale === "es" ? "otra pestaña" : "new tab",
      );
    }
    await expect(
      page.locator(`main a[href="${prefix}/work"]`).first(),
    ).not.toHaveAttribute("target", "_blank");
    await expect(page.locator('footer a[href^="mailto:"]')).not.toHaveAttribute(
      "target",
      "_blank",
    );
    await expect(
      page.locator('footer a[href="https://github.com/roddcode"]'),
    ).toHaveAttribute("target", "_blank");
    // Exercise a real new-tab action without sending the browser to a third party.
    await page.route("https://github.com/roddcode/exactly-once", (route) =>
      route.fulfill({ body: "External resource" }),
    );
    const popupPromise = page.waitForEvent("popup");
    await resources.first().click();
    const popup = await popupPromise;
    await popup.waitForLoadState();
    await expect(page).toHaveURL(prefix || "/");
    await popup.close();
    await page.goto(`${prefix}/work/soffia`);
    await expect(
      page.locator('main a[href="https://github.com/roddcode/reactive-fsm"]'),
    ).toHaveAttribute("target", "_blank");
  });
}
test("essay references distinguish external destinations from local reading", async ({
  page,
}) => {
  await page.goto("/writing/fourth-time-fsm-library");
  const external = page.locator(".prose a[href^='https://']");
  expect(await external.count()).toBeGreaterThan(0);
  for (const link of await external.all()) {
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
  await expect(
    page.locator('main a[href="/writing"]').first(),
  ).not.toHaveAttribute("target", "_blank");
});
