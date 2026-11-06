import { strict as assert } from "node:assert";
import { test } from "node:test";
import { collectEnquiryIds } from "./collectEnquiryIds";

test("collects all pages, including pages shorter than the requested size", async () => {
  const calls: (string | null)[] = [];
  const ids = await collectEnquiryIds(async (cursor) => {
    calls.push(cursor);
    if (cursor === null) return ["001", "002"];
    if (cursor === "002") return ["003"];
    return [];
  });
  assert.deepEqual(ids, ["001", "002", "003"]);
  assert.deepEqual(calls, [null, "002", "003"]);
});

test("fails rather than looping on invalid or duplicate pages", async () => {
  await assert.rejects(collectEnquiryIds(async () => ["001"]), /invalid page order/);
});
