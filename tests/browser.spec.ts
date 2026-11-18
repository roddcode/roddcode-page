import { expect, test } from "./fixtures";

test("reading and controls work across browser engines", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const colorScheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme });
    for (const width of [320, 390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of [
        "/",
        "/work/ndc",
        "/about",
        "/writing",
        "/writing/server-centric-state",
      ]) {
        expect((await page.goto(route))?.status()).toBe(200);
        await expect(page.locator("main h1")).toBeVisible();
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
      }
    }
  }
  await page.goto("/work/ndc");
  await page.locator("header a[hreflang=en]").click();
  await expect(page).toHaveURL(/\/en\/work\/ndc$/);
  const theme = page.getByRole("button", { name: /Switch to .* mode/ });
  const before = await page.locator("html").getAttribute("class");
  await theme.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).not.toHaveAttribute("class", before ?? "");
});
