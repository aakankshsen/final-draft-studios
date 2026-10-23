import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { STATUSES, STATUS_STYLES, formatDate, type Enquiry, type Status } from "@/lib/types";

const PAGE_SIZE = 100;

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const { status, q } = await searchParams;
  const supabase = await createClient();

  const { data: all } = await supabase.from("enquiries").select("status");
  const counts: Record<string, number> = {};
  (all ?? []).forEach((r) => (counts[r.status] = (counts[r.status] ?? 0) + 1));
  const total = all?.length ?? 0;

  let query = supabase.from("enquiries").select("*").order("created_at", { ascending: false }).limit(PAGE_SIZE);
  if (status && (STATUSES as readonly string[]).includes(status)) query = query.eq("status", status);
  // strip characters that have meaning in PostgREST filter syntax
  const term = (q ?? "").replace(/[,()%*\\]/g, " ").trim();
  if (term) {
    query = query.or(`name.ilike.%${term}%,email.ilike.%${term}%,message.ilike.%${term}%,service.ilike.%${term}%`);
  }
  const { data } = await query;
  const enquiries = (data ?? []) as Enquiry[];

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
    <>
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

      <form className="mb-4 flex gap-2">
        {status && <input type="hidden" name="status" value={status} />}
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

      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-5 px-5">
        {chip("All", undefined, total)}
        {STATUSES.map((s) => chip(s, s, counts[s] ?? 0))}
      </div>

      {enquiries.length === 0 ? (
        <p className="text-dim text-center py-16">No enquiries found.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {enquiries.map((e) => (
            <li key={e.id}>
              <Link
                href={`/enquiries/${e.id}`}
                className="block bg-card border border-white/10 p-4 hover:border-amber/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-bold truncate">{e.name}</p>
                    <p className="text-dim text-xs mt-0.5 truncate">
                      {e.service || "No service selected"} · {formatDate(e.created_at)}
                    </p>
                  </div>
                  <span className={`shrink-0 text-[10px] tracking-widest uppercase border px-2 py-1 ${STATUS_STYLES[e.status as Status]}`}>
                    {e.status}
                  </span>
                </div>
                <p className="text-sm text-paper/70 mt-3 line-clamp-2">{e.message}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {enquiries.length === PAGE_SIZE && (
        <p className="text-dim text-xs text-center mt-6">Showing the latest {PAGE_SIZE}. Use search or filters to narrow down.</p>
      )}
    </>
  );
}
