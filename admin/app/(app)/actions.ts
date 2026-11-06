"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { enquirySearchFilter, normalizeEnquiryFilters, type EnquiryFilters } from "@/lib/enquiryFilters";
import { collectEnquiryIds } from "@/lib/collectEnquiryIds";

async function authenticatedClient() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims?.sub) throw new Error("Please sign in again.");
  return supabase;
}

export async function selectMatchingEnquiries(filters: EnquiryFilters): Promise<string[]> {
  const { status, term } = normalizeEnquiryFilters(filters.status ?? undefined, filters.term);
  const supabase = await authenticatedClient();
  return collectEnquiryIds(async (afterId) => {
    let query = supabase.from("enquiries").select("id").is("archived_at", null).order("id").limit(500);
    if (status) query = query.eq("status", status);
    if (term) query = query.or(enquirySearchFilter(term));
    if (afterId) query = query.gt("id", afterId);
    const { data, error } = await query;
    if (error || !data || !data.every((row) => typeof row.id === "string")) {
      console.error("Could not select matching enquiries:", error);
      throw new Error("Could not select enquiries. Please try again.");
    }
    return data.map((row) => row.id);
  });
}

export async function archiveEnquiries(ids: string[]): Promise<number> {
  if (!Array.isArray(ids) || ids.length === 0 || !ids.every(
    (id) => typeof id === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id),
  ) || new Set(ids).size !== ids.length) {
    throw new Error("Invalid enquiry selection.");
  }
  const supabase = await authenticatedClient();
  const { data, error } = await supabase.rpc("archive_selected_enquiries", { enquiry_ids: ids });
  if (error || typeof data !== "number") {
    console.error("Could not archive enquiries:", error);
    throw new Error("Could not archive enquiries. Check the database setup and try again.");
  }
  revalidatePath("/");
  return data;
}
