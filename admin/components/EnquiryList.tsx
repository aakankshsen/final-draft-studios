"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { archiveEnquiries, selectMatchingEnquiries } from "@/app/(app)/actions";
import type { EnquiryFilters } from "@/lib/enquiryFilters";
import { STATUS_STYLES, formatDate, type Enquiry } from "@/lib/types";

export default function EnquiryList({ enquiries, filters, pageSize }: {
  enquiries: Enquiry[];
  filters: EnquiryFilters;
  pageSize: number;
}) {
  const router = useRouter();
  const [selecting, setSelecting] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const toggle = (id: string) => {
    setSelected((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = async () => {
    setBusy(true);
    setMessage("");
    try {
      const ids = await selectMatchingEnquiries(filters);
      setSelected(new Set(ids));
      if (ids.length === 0) setMessage("No matching enquiries found.");
    } catch (error) {
      console.error("Could not select enquiries:", error);
      setMessage(error instanceof Error ? error.message : "Could not select enquiries.");
    } finally {
      setBusy(false);
    }
  };

  const removeSelected = async () => {
    const ids = [...selected];
    if (!ids.length || !window.confirm(`Remove ${ids.length} selected ${ids.length === 1 ? "enquiry" : "enquiries"} from the admin view? They will remain in Supabase.`)) return;
    setBusy(true);
    setMessage("");
    try {
      const archived = await archiveEnquiries(ids);
      setSelected(new Set());
      setSelecting(false);
      setMessage(archived === ids.length
        ? `Removed ${archived} ${archived === 1 ? "enquiry" : "enquiries"} from the admin view.`
        : `Removed ${archived} of ${ids.length} selected enquiries. Some were already removed or could not be archived.`);
      router.refresh();
    } catch (error) {
      console.error("Could not archive enquiries:", error);
      setMessage(error instanceof Error ? error.message : "Could not archive enquiries.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <button type="button" onClick={() => {
          setSelecting(!selecting);
          setSelected(new Set());
          setMessage("");
        }} disabled={busy || (!selecting && enquiries.length === 0)}
          className="border border-white/20 px-3 py-2 text-xs uppercase tracking-wide hover:border-amber hover:text-amber disabled:opacity-40">
          {selecting ? "Cancel" : "Select"}
        </button>
        {selecting && (
          <>
            <button type="button" onClick={selectAll} disabled={busy || enquiries.length === 0}
              className="border border-white/20 px-3 py-2 text-xs uppercase tracking-wide hover:border-amber hover:text-amber disabled:opacity-40">
              {busy ? "Please wait..." : "Select all"}
            </button>
            {selected.size > 0 && (
              <>
                <button type="button" onClick={removeSelected} disabled={busy}
                  className="border border-red-400/60 px-3 py-2 text-xs uppercase tracking-wide text-red-300 hover:bg-red-400/10 disabled:opacity-40">
                  Remove selected
                </button>
                <span className="text-dim text-xs">{selected.size} selected</span>
              </>
            )}
          </>
        )}
      </div>
      {message && <p role="status" className="text-sm text-paper mb-4">{message}</p>}
      {enquiries.length === 0 ? (
        <p className="text-dim text-center py-16">No enquiries found.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {enquiries.map((e) => (
            <li key={e.id} className="flex items-start bg-card border border-white/10 hover:border-amber/50 transition-colors">
              {selecting && (
                <input
                  type="checkbox"
                  aria-label={`Select enquiry from ${e.name}`}
                  checked={selected.has(e.id)}
                  disabled={busy}
                  onChange={() => toggle(e.id)}
                  className="mt-5 ml-4 h-4 w-4 accent-amber shrink-0"
                />
              )}
              <Link href={`/enquiries/${e.id}`} className="block min-w-0 flex-1 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-bold truncate">{e.name}</p>
                    <p className="text-dim text-xs mt-0.5 truncate">
                      {e.service || "No service selected"} · {formatDate(e.created_at)}
                    </p>
                  </div>
                  <span className={`shrink-0 text-[10px] tracking-widest uppercase border px-2 py-1 ${STATUS_STYLES[e.status]}`}>
                    {e.status}
                  </span>
                </div>
                <p className="text-sm text-paper/70 mt-3 line-clamp-2">{e.message}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {enquiries.length === pageSize && (
        <p className="text-dim text-xs text-center mt-6">Showing the latest {pageSize}. Select all includes all enquiries matching the current filters.</p>
      )}
    </>
  );
}
