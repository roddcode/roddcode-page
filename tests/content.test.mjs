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
