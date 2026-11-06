import { strict as assert } from "node:assert";
import { test } from "node:test";
import { enquirySearchFilter, normalizeEnquiryFilters } from "./enquiryFilters";

test("normalizes the same status and search for list and selection", () => {
  assert.deepEqual(normalizeEnquiryFilters("new", "  film,(test)%*\\  "), {
    status: "new",
    term: "film  test",
  });
  assert.deepEqual(normalizeEnquiryFilters("invalid", undefined), { status: null, term: "" });
  assert.equal(
    enquirySearchFilter("film"),
    "name.ilike.%film%,email.ilike.%film%,message.ilike.%film%,service.ilike.%film%",
  );
});
