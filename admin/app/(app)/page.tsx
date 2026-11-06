import { Suspense, cache } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ListSkeleton, StatsSkeleton } from "@/components/Skeleton";
import EnquiryList from "@/components/EnquiryList";
import { enquirySearchFilter, normalizeEnquiryFilters } from "@/lib/enquiryFilters";
import { STATUSES, type Enquiry } from "@/lib/types";

const PAGE_SIZE = 100;

const getCounts = cache(async () => {
  const supabase = await createClient();
  const { data: all } = await supabase.from("enquiries").select("status");
  const counts: Record<string, number> = {};
  (all ?? []).forEach((r) => (counts[r.status] = (counts[r.status] ?? 0) + 1));
  return { counts, total: all?.length ?? 0 };
});

async function Stats() {
  const { counts, total } = await getCounts();
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
      {[
        ["Total", total],
        ["New", counts.new ?? 0],
        ["In progress", (counts["in-progress"] ?? 0) + (counts.contacted ?? 0)],
        ["Won", counts.won ?? 0],
      ].map(([label, n]) => (
        <div key={label} className="bg-card border border-white/10 p-4">
          <p className="text-dim text-xs tracking-wide uppercase">{label}</p>
          <p className="text-3xl font-extrabold mt-1">{n}</p>
        </div>
      ))}
    </div>
  );
}

async function Chips({ status, term, withCounts }: { status?: string; term: string; withCounts: boolean }) {
  const { counts, total } = withCounts ? await getCounts() : { counts: {} as Record<string, number>, total: undefined };
  const chip = (label: string, value: string | undefined, count?: number) => {
    const active = (status ?? "") === (value ?? "");
    const params = new URLSearchParams();
    if (value) params.set("status", value);
    if (term) params.set("q", term);
    return (
      <Link
        key={label}
        href={`/?${params.toString()}`}
        className={`shrink-0 text-xs tracking-wide uppercase px-3 py-2 border transition-colors ${
          active ? "border-amber text-amber bg-amber/10" : "border-white/15 text-dim hover:text-paper"
        }`}
      >
        {label}
        {count !== undefined && <span className="ml-2 opacity-70">{count}</span>}
      </Link>
    );
  };
  return (
    <div className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-5 px-5">
      {chip("All", undefined, total)}
      {STATUSES.map((s) => chip(s, s, withCounts ? counts[s] ?? 0 : undefined))}
    </div>
  );
}

async function List({ status, term }: { status?: string; term: string }) {
  const supabase = await createClient();
  let query = supabase.from("enquiries").select("*").order("created_at", { ascending: false }).limit(PAGE_SIZE);
  if (status && (STATUSES as readonly string[]).includes(status)) query = query.eq("status", status);
  if (term) {
    query = query.or(enquirySearchFilter(term));
  }
  const { data, error } = await query;
  if (error) {
    console.error("Could not load enquiries:", error);
    return <p role="alert" className="text-red-300 py-8">Could not load enquiries. Please try again.</p>;
  }
  const enquiries = (data ?? []) as Enquiry[];

  return (
    <EnquiryList enquiries={enquiries} filters={normalizeEnquiryFilters(status, term)} pageSize={PAGE_SIZE} />
  );
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const { status, q } = await searchParams;
  const { status: filterStatus, term } = normalizeEnquiryFilters(status, q);

  return (
    <>
      <Suspense fallback={<StatsSkeleton />}>
        <Stats />
      </Suspense>

      <form className="mb-4 flex gap-2">
        {filterStatus && <input type="hidden" name="status" value={filterStatus} />}
        <input
          name="q"
          defaultValue={term}
          placeholder="Search name, email, message…"
          className="flex-1 bg-card border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-amber"
        />
        <button className="border border-amber text-amber text-xs tracking-widest uppercase px-5 hover:bg-amber hover:text-ink transition-colors">
          Search
        </button>
      </form>

      <Suspense fallback={<Chips status={filterStatus ?? undefined} term={term} withCounts={false} />}>
        <Chips status={filterStatus ?? undefined} term={term} withCounts />
      </Suspense>

      <Suspense key={`${filterStatus ?? ""}|${term}`} fallback={<ListSkeleton />}>
        <List status={filterStatus ?? undefined} term={term} />
      </Suspense>
    </>
  );
}
