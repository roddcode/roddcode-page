import assert from "node:assert/strict";
import test from "node:test";
import { getAllPosts, getPostBySlug, parsePostSource } from "../src/lib/mdx.ts";
import { escapeXml } from "../src/lib/xml.ts";

const article = (metadata = "") => `---
title: "A & B"
date: "2026-11-12"
summary: "Testing <contracts>"
${metadata}
---
Body text.
`;
test("draft-like and traversal slugs cannot be read by URL", () => {
  for (const slug of ["_draft", "../draft", "folder/file", "invalid.mdx"]) {
    assert.throws(() => getPostBySlug(slug), /Post not found/);
  }
});
test("published article metadata is validated explicitly", () => {
  assert.throws(
    () =>
      parsePostSource("test", article().replace("2026-11-12", "2026-02-30")),
    /test/,
  );
  assert.throws(
    () => parsePostSource("test", article('slug: "different"')),
    /match filename/,
  );
  assert.throws(
    () => parsePostSource("test", article().replace("Body text.", "")),
    /empty/,
  );
  assert.equal(
    parsePostSource("test", article("draft: true")).meta.draft,
    true,
  );
  assert(getAllPosts().every((post) => !post.draft));
});
test("RSS values escape XML syntax while preserving source text", () => {
  assert.equal(
    escapeXml("A & B < C > D \"quote\" 'apostrophe'"),
    "A &amp; B &lt; C &gt; D &quot;quote&quot; &apos;apostrophe&apos;",
  );
});

test("npm versions are optional, validated and cached independently of content", async () => {
  const { getNpmVersion } = await import("../src/lib/npm.ts");
  let options;
  const success = await getNpmVersion("reactive-fsm", async (url, init) => {
    assert.equal(url, "https://registry.npmjs.org/reactive-fsm/latest");
    options = init;
    return Response.json({ name: "reactive-fsm", version: "2.0.1" });
  });
  assert.equal(success, "2.0.1");
  assert.equal(options.next.revalidate, 86400);
  assert(options.signal instanceof AbortSignal);
  for (const metadata of [
    null,
    {},
    { name: "other", version: "2.0.1" },
    { name: "reactive-fsm", version: "<bad>" },
  ]) {
    assert.equal(
      await getNpmVersion("reactive-fsm", async () => Response.json(metadata)),
      null,
    );
  }
  assert.equal(
    await getNpmVersion(
      "exactly-once",
      async () => new Response("", { status: 503 }),
    ),
    null,
  );
  assert.equal(
    await getNpmVersion("exactly-once", async () => {
      throw new Error("offline");
    }),
    null,
  );
});
