import { expect, test } from "@playwright/test";

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 1024, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

for (const vp of VIEWPORTS) {
  test(`un solo borde izquierdo en ${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto("/");

    const edges = await page.$$eval("[data-container]", (els) =>
      els.map((el) => Math.round(el.getBoundingClientRect().left)),
    );

    expect(edges.length).toBeGreaterThan(0);
    expect([...new Set(edges)]).toHaveLength(1);
  });
}

test("the hero demo and closing contact have live anchors", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.locator('a[href="#gate-panel"]')).toHaveCount(1);
  await expect(page.locator('a[href="#method"]')).toHaveCount(0);
  await expect(page.locator("#gate-panel")).toHaveCount(1);
  await expect(page.locator("#contact a[href^='mailto:']")).toHaveCount(1);
});

test("the locale selector identifies the current language and links to the other", async ({
  page,
}) => {
  await page.goto("/");

  const spanishSelector = page.locator("header details");
  await expect(spanishSelector.locator("summary")).toHaveAttribute(
    "aria-label",
    "Idioma: Español (Perú)",
  );
  await expect(spanishSelector.locator("summary svg")).toHaveCount(2);
  await spanishSelector.locator("summary").click();
  await expect(spanishSelector.locator(":scope > div svg")).toHaveCount(2);
  await expect(spanishSelector.locator(":scope > div")).not.toContainText(
    "Idioma",
  );
  await expect(spanishSelector.locator('[aria-current="page"]')).toContainText(
    "Español (Perú)",
  );
  await expect(
    spanishSelector.locator('a[href="/api/locale?to=en"]'),
  ).toContainText("Inglés (EE. UU.)");

  await page.goto("/en");

  const englishSelector = page.locator("header details");
  await expect(englishSelector.locator("summary")).toHaveAttribute(
    "aria-label",
    "Language: English (US)",
  );
  await englishSelector.locator("summary").click();
  await expect(englishSelector.locator('[aria-current="page"]')).toContainText(
    "English (US)",
  );
  await expect(
    englishSelector.locator('a[href="/api/locale?to=es"]'),
  ).toContainText("Spanish (Peru)");
});

test("the CV link resolves and the email CTA uses the accent", async ({
  page,
}) => {
  await page.goto("/");

  // el CV ya no vive en el header: lo enlazan el menu y el pie. Lo que
  // importa es que el archivo exista con el nombre que usan los enlaces;
  // un rename sin actualizar referencias da 404 en silencio.
  const cvLinks = page.locator('a[href="/cv-alejandro-alvarado-roddcode.pdf"]');
  await expect(cvLinks.first()).toHaveAttribute("target", "_blank");
  const pdf = await page.request.get("/cv-alejandro-alvarado-roddcode.pdf");
  expect(pdf.status()).toBe(200);

  const emailCta = page.locator('main a[href^="mailto:"]').first();
  const accentColor = await page.evaluate(() => {
    const probe = document.createElement("span");
    probe.style.backgroundColor = "var(--color-accent)";
    document.body.append(probe);
    const color = getComputedStyle(probe).backgroundColor;
    probe.remove();
    return color;
  });
  await expect(emailCta).toHaveCSS("background-color", accentColor);
});

test("the 404 uses the design tokens and answers in the visitor's language", async ({
  page,
}) => {
  const res = await page.goto("/no-existe");
  expect(res?.status()).toBe(404);

  await expect(page.locator("h1")).toContainText("no existe");

  // el boton tiene que ser el navy del sistema y el radio de 2px, no el cian
  // del diseno anterior: ese fue el fallo que este test evita repetir
  const cta = page.getByRole("link", { name: "Volver al inicio" });
  await expect(cta).toHaveCSS("background-color", "rgb(31, 78, 140)");
  await expect(cta).toHaveCSS("border-top-left-radius", "2px");
  await expect(cta).toHaveCSS("min-height", "44px");
});

test("the content pages keep the navbar pinned while scrolling", async ({
  page,
}) => {
  for (const ruta of ["/privacidad", "/seguridad", "/writing"]) {
    await page.goto(ruta);
    await page.evaluate(() => window.scrollTo(0, 700));

    const nav = page.locator("header");
    await expect(nav).toHaveCSS("position", "sticky");
    expect(Math.round((await nav.boundingBox())?.y ?? -1)).toBe(0);
  }
});

test("demo tabs support arrows, wrapping, Home and End", async ({ page }) => {
  await page.goto("/");
  const tabs = page.getByRole("tab");
  await tabs.nth(0).focus();
  for (const [key, selected] of [
    ["ArrowRight", 1],
    ["ArrowRight", 2],
    ["ArrowRight", 0],
    ["ArrowLeft", 2],
    ["Home", 0],
    ["End", 2],
  ] as const) {
    await page.keyboard.press(key);
    await expect(tabs.nth(selected)).toBeFocused();
    await expect(tabs.nth(selected)).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("tabpanel")).toHaveAttribute(
      "aria-labelledby",
      (await tabs.nth(selected).getAttribute("id")) ?? "",
    );
  }
});

test("previous CV URLs redirect to the current PDF", async ({ request }) => {
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

test("article social metadata and structured image resolve", async ({
  page,
}) => {
  await page.goto("/writing/network-asymmetry");
  const title = await page.locator("h1").innerText();
  await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
    "content",
    title,
  );
  const image = await page
    .locator('meta[name="twitter:image"]')
    .getAttribute("content");
  expect(image).toContain("/writing/network-asymmetry/image");
  const response = await page.request.get(new URL(image ?? "").pathname);
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("image/png");
  const article = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((nodes) =>
      nodes
        .map((node) => JSON.parse(node.textContent ?? "{}"))
        .find((data) => data["@type"] === "Article"),
    );
  expect(article.image).toBe(image);
});

test("mobile menu and static sections survive at narrow widths in both languages", async ({
  page,
}) => {
  for (const locale of ["es", "en"]) {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto(`/api/locale?to=${locale}`);
    await expect(page.locator("#systems article")).toHaveCount(3);
    await expect(page.locator("#experience details")).toHaveCount(5);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page
      .getByRole("button", {
        name: locale === "es" ? "Menú" : "Menu",
        exact: true,
      })
      .click();
    await expect(page.getByRole("menu")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("menu")).toHaveCount(0);
  }
});

test("home canonical and language alternatives use the production hostname", async ({
  page,
}) => {
  for (const locale of ["es", "en"]) {
    await page.goto(`/api/locale?to=${locale}`);
    for (const [selector, path] of [
      ['link[rel="canonical"]', locale === "es" ? "/" : "/en"],
      ['link[rel="alternate"][hreflang="es"]', "/"],
      ['link[rel="alternate"][hreflang="en"]', "/en"],
    ]) {
      const href = await page.locator(selector ?? "").getAttribute("href");
      expect(new URL(href ?? "").href).toBe(
        new URL(path ?? "/", "https://www.roddcode.com").href,
      );
    }
  }
});

test("system stack labels retain readable contrast on the dark background", async ({
  page,
}) => {
  await page.goto("/");
  const ratios = await page
    .locator("#systems article p > span")
    .evaluateAll((labels) => {
      const luminance = (color: string) => {
        const rgb =
          color
            .match(/[0-9.]+/g)
            ?.slice(0, 3)
            .map(Number) ?? [];
        const channels = rgb.map((n) => {
          const c = n / 255;
          return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
        });
        return (
          (channels[0] ?? 0) * 0.2126 +
          (channels[1] ?? 0) * 0.7152 +
          (channels[2] ?? 0) * 0.0722
        );
      };
      return labels.map((label) => {
        const section = label.closest("section");
        if (!section) return 0;
        const foreground = getComputedStyle(label).color;
        if (!foreground.startsWith("rgb(")) return 0;
        const fg = luminance(foreground);
        const bg = luminance(getComputedStyle(section).backgroundColor);
        return (Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05);
      });
    });
  expect(ratios).toHaveLength(3);
  for (const ratio of ratios) expect(ratio).toBeGreaterThanOrEqual(4.5);
});

test("the footer waits until it approaches the viewport before requesting WebGL", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
      value(this: HTMLCanvasElement, ...args: unknown[]) {
        if (args[0] === "webgl2") this.dataset.webglRequested = "true";
        return Reflect.apply(original, this, args);
      },
      configurable: true,
      writable: true,
    });
  });
  await page.goto("/");
  await expect(page.locator("main > section canvas").first()).toHaveAttribute(
    "data-webgl-requested",
    "true",
  );
  const footer = page.locator("#contact canvas");
  await expect(footer).not.toHaveAttribute("data-webgl-requested", "true");
  await footer.scrollIntoViewIfNeeded();
  await expect(footer).toHaveAttribute("data-webgl-requested", "true");
});
