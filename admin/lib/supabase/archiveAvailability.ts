import { cache } from "react";
import { createClient } from "./server";
import { isMissingArchiveColumn } from "../archiveAvailability";

export const isArchiveAvailable = cache(async (): Promise<boolean> => {
  const supabase = await createClient();
  const { error } = await supabase.from("enquiries").select("archived_at").limit(1);
  if (!error) return true;
  if (isMissingArchiveColumn(error)) {
    console.warn("Enquiry archiving is unavailable: the archived_at column has not been installed.");
    return false;
  }
  console.error("Could not check enquiry archive setup:", error);
  throw new Error("Could not check enquiry archive setup.");
});
