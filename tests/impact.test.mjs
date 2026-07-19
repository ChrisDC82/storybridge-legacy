import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

test("impact page covers the complete challenge, circulation and scale narrative", async () => {
  const source = await readFile("src/app/impact/page.tsx", "utf8");
  for (const phrase of [
    "The challenge", "Brain circulation", "Engagement and fundraising", "Investment and opportunity",
    "Scale roadmap", "Sustainability", "Safeguards", "Closing vision",
    "Proposed CIC pilot", "Trinidad and Tobago rollout", "Caribbean expansion", "Global diaspora network",
  ]) assert.match(source, new RegExp(phrase, "i"));
});

test("impact page states pilot, no-endorsement, fundraising and investment boundaries", async () => {
  const source = await readFile("src/app/impact/page.tsx", "utf8");
  assert.match(source, /proposed pilot only/i);
  assert.match(source, /No formal endorsement/i);
  assert.match(source, /does not process donations/i);
  assert.match(source, /does not promise funding or returns/i);
  assert.match(source, /does not.*operate as an investment marketplace/i);
  assert.match(source, /does not.*promote investments to minors/i);
  assert.doesNotMatch(source, /confirmed investor|already launched|guaranteed return|\$[0-9,]+|[0-9]+ donors/i);
});

test("impact roadmap is explicitly future-facing and includes all closing calls to action", async () => {
  const source = await readFile("src/app/impact/page.tsx", "utf8");
  assert.match(source, /Future vision, not completed deployment/i);
  assert.match(source, /Every stage below is a future plan/i);
  for (const href of ["/legacy", "/contribute", "/alumni", "/engage"]) assert.match(source, new RegExp(`href="${href}"`));
  assert.doesNotMatch(source, /<main[\s>]/, "the shared layout owns the single main landmark");
});
