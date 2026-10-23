export const STATUSES = ["new", "contacted", "in-progress", "won", "lost"] as const;
export type Status = (typeof STATUSES)[number];

export type Enquiry = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  status: Status;
  notes: string;
};

export const STATUS_STYLES: Record<Status, string> = {
  new: "bg-amber/15 text-amber border-amber/40",
  contacted: "bg-sky-400/10 text-sky-300 border-sky-400/30",
  "in-progress": "bg-violet-400/10 text-violet-300 border-violet-400/30",
  won: "bg-emerald-400/10 text-emerald-300 border-emerald-400/30",
  lost: "bg-white/5 text-dim border-white/15",
};

export function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
