"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { STATUSES, type Enquiry, type Status } from "@/lib/types";

export default function EnquiryEditor({ enquiry }: { enquiry: Enquiry }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>(enquiry.status);
  const [notes, setNotes] = useState(enquiry.notes);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const dirty = status !== enquiry.status || notes !== enquiry.notes;

  const save = async () => {
    setSaving(true);
    setMsg("");
    const { error } = await createClient().from("enquiries").update({ status, notes }).eq("id", enquiry.id);
    setSaving(false);
    if (error) return setMsg("Could not save. Please try again.");
    setMsg("Saved.");
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className="block text-xs tracking-wide uppercase text-dim mb-2">Status</label>
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              className={`text-xs tracking-widest uppercase px-3 py-2 border transition-colors ${
                status === s ? "border-amber text-amber bg-amber/10" : "border-white/15 text-dim hover:text-paper"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-xs tracking-wide uppercase text-dim mb-2">Private notes</label>
        <textarea
          rows={5}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Call summary, quote sent, follow-up date…"
          className="w-full bg-card border border-white/10 p-3 text-sm focus:outline-none focus:border-amber resize-y"
        />
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={save}
          disabled={!dirty || saving}
          className="border border-amber text-amber text-xs tracking-widest uppercase px-8 py-4 hover:bg-amber hover:text-ink transition-colors disabled:opacity-40"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
        {msg && <span className="text-sm text-dim">{msg}</span>}
      </div>
    </div>
  );
}
