import { strict as assert } from "node:assert";
import { test } from "node:test";
import { isMissingArchiveColumn } from "./archiveAvailability";

test("only recognizes the missing archive column", () => {
  assert.equal(isMissingArchiveColumn({ code: "42703", message: "column enquiries.archived_at does not exist" }), true);
  assert.equal(isMissingArchiveColumn({ code: "42703", message: "column enquiries.status does not exist" }), false);
  assert.equal(isMissingArchiveColumn({ code: "42501", message: "permission denied for archived_at" }), false);
});
