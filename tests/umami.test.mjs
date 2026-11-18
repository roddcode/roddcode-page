import assert from "node:assert/strict";
import test from "node:test";
import { getUmamiWebsiteId, isUmamiWebsiteId } from "../src/lib/umami.ts";

const DUMMY_WEBSITE_ID = "3f7b2c1a-9d4e-4a6b-8c2d-1e5f7a9b0c3d";

const production = (overrides = {}) => ({
  NODE_ENV: "production",
  VERCEL_ENV: "production",
  NEXT_PUBLIC_UMAMI_WEBSITE_ID: DUMMY_WEBSITE_ID,
  ...overrides,
});

test("tracker requires production, a production deployment and a valid UUID", () => {
  assert.equal(getUmamiWebsiteId(production()), DUMMY_WEBSITE_ID);
  assert.equal(
    getUmamiWebsiteId(production({ NEXT_PUBLIC_UMAMI_WEBSITE_ID: undefined })),
    null,
  );
  assert.equal(
    getUmamiWebsiteId(production({ NEXT_PUBLIC_UMAMI_WEBSITE_ID: "" })),
    null,
  );
  assert.equal(
    getUmamiWebsiteId(
      production({ NEXT_PUBLIC_UMAMI_WEBSITE_ID: "not-a-uuid" }),
    ),
    null,
  );
  assert.equal(
    getUmamiWebsiteId(production({ NEXT_PUBLIC_UMAMI_WEBSITE_ID: "1" })),
    null,
  );
  assert.equal(
    getUmamiWebsiteId(production({ NODE_ENV: "development" })),
    null,
  );
  assert.equal(getUmamiWebsiteId(production({ VERCEL_ENV: "preview" })), null);
  assert.equal(getUmamiWebsiteId(production({ VERCEL_ENV: undefined })), null);
  assert.equal(
    getUmamiWebsiteId(
      production({ NEXT_PUBLIC_UMAMI_WEBSITE_ID: ` ${DUMMY_WEBSITE_ID} ` }),
    ),
    DUMMY_WEBSITE_ID,
  );
  assert.equal(isUmamiWebsiteId(DUMMY_WEBSITE_ID), true);
  assert.equal(isUmamiWebsiteId("00000000-0000-0000-0000-000000000000"), false);
});
