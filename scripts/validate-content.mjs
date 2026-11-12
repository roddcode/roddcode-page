import assert from "node:assert/strict";
import fs from "node:fs";
import { getPackages } from "../src/content/portfolio/packages.ts";
import { getProjects } from "../src/content/portfolio/projects.ts";
import { getAllPosts } from "../src/lib/mdx.ts";

const posts = getAllPosts();
const postSlugs = new Set(posts.map((post) => post.slug));
for (const locale of ["es", "en"]) {
  const projects = getProjects(locale);
  const seen = new Set();
  const packages = new Set(getPackages(locale).map((pkg) => pkg.name));
  for (const project of projects) {
    assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert(!seen.has(project.slug), `Duplicate project: ${project.slug}`);
    seen.add(project.slug);
    for (const field of [
      "title",
      "summary",
      "category",
      "scope",
      "availability",
      "period",
      "role",
    ]) {
      assert(
        project[field]?.trim(),
        `${locale}/${project.slug}: missing ${field}`,
      );
    }
    const file = `src/content/work/${locale}/${project.slug}.mdx`;
    assert(
      fs.existsSync(file) && fs.readFileSync(file, "utf8").trim(),
      `Missing narrative: ${file}`,
    );
    for (const slug of project.relatedPosts ?? [])
      assert(postSlugs.has(slug), `Unknown related article: ${slug}`);
    for (const pkg of project.relatedPackages ?? [])
      assert(packages.has(pkg.name), `Unknown package: ${pkg.name}`);
  }
}
assert.deepEqual(
  getProjects("es").map((p) => p.slug),
  getProjects("en").map((p) => p.slug),
);
console.log(
  `Content valid: ${posts.length} published articles, ${getProjects("es").length} bilingual cases.`,
);
