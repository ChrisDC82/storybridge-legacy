import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const pageRoutes = ["", "legacy", "contribute", "alumni", "engage", "impact", "admin"];

test("all requested page route files exist", async () => {
  for (const route of pageRoutes) {
    const path = route ? `src/app/${route}/page.tsx` : "src/app/page.tsx";
    const source = await readFile(path, "utf8");
    assert.match(source, /export default function/);
  }
});

test("story guide API route exposes a scaffold response", async () => {
  const source = await readFile("src/app/api/story-guide/route.ts", "utf8");
  assert.match(source, /export async function GET/);
  assert.match(source, /export async function POST/);
  assert.doesNotMatch(source, /sk-[A-Za-z0-9_-]+/);
});

test("legacy detail route is present", async () => {
  const source = await readFile("src/app/legacy/[slug]/page.tsx", "utf8");
  assert.match(source, /generateStaticParams/);
  assert.match(source, /Fictional demonstration record/);
});

test("shared layout includes navigation, main content and pilot notice", async () => {
  const source = await readFile("src/app/layout.tsx", "utf8");
  assert.match(source, /Primary navigation/);
  assert.match(source, /id="main-content"/);
  assert.match(source, /proposed pilot only/);
  assert.match(source, /fictional\s+demonstration data/);
});
