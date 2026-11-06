import { STATUSES, type Status } from "./types";

export function normalizeEnquiryFilters(status?: string, search?: string) {
  return {
    status: STATUSES.find((value) => value === status) ?? null,
    term: (search ?? "").replace(/[,()%*\\]/g, " ").trim(),
  };
}

export function enquirySearchFilter(term: string) {
  return `name.ilike.%${term}%,email.ilike.%${term}%,message.ilike.%${term}%,service.ilike.%${term}%`;
}

export type EnquiryFilters = { status: Status | null; term: string };
