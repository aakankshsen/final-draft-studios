import { strict as assert } from "node:assert";
import { test } from "node:test";
import { formatDate } from "./types";

test("enquiry dates use IST regardless of the server timezone", () => {
  const originalTimezone = process.env.TZ;
  try {
    for (const timezone of ["UTC", "America/Los_Angeles", "Asia/Tokyo"]) {
      process.env.TZ = timezone;
      assert.equal(formatDate("2026-11-06T18:29:00Z"), "Fri, 6 Nov, 2026, 11:59 pm IST");
      assert.equal(formatDate("2026-11-06T18:30:00Z"), "Sat, 7 Nov, 2026, 12:00 am IST");
      assert.equal(formatDate("2026-11-07T00:00:00+05:30"), "Sat, 7 Nov, 2026, 12:00 am IST");
    }
  } finally {
    if (originalTimezone === undefined) delete process.env.TZ;
    else process.env.TZ = originalTimezone;
  }
});
