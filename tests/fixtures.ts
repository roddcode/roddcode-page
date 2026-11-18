import { type BrowserContext, test as base, expect } from "@playwright/test";

/** Tests must never send traffic to an analytics account, even with an ID set. */
export async function mockUmamiNetwork(context: BrowserContext) {
  await context.route(/^https:\/\/(?:[^/]+\.)?umami\.(?:is|dev)\//, (route) =>
    route.fulfill({
      status: 200,
      contentType:
        route.request().resourceType() === "script"
          ? "application/javascript"
          : "application/json",
      body: route.request().resourceType() === "script" ? "" : "{}",
    }),
  );
}

export const test = base.extend({
  context: async ({ context }, use) => {
    await mockUmamiNetwork(context);
    await use(context);
  },
});

export { expect };
