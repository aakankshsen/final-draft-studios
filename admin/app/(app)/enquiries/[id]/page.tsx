import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import EnquiryEditor from "@/components/EnquiryEditor";
import { formatDate, type Enquiry } from "@/lib/types";

export default async function EnquiryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("enquiries").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const e = data as Enquiry;

  const phone = e.phone?.trim();
  const btn =
    "text-xs tracking-widest uppercase border border-white/20 px-4 py-3 hover:border-amber hover:text-amber transition-colors";

  return (
    <div className="max-w-2xl">
      <Link href="/" className="text-dim text-xs tracking-widest uppercase hover:text-amber transition-colors">
        ← All enquiries
      </Link>

      <h1 className="uppercase text-3xl mt-6 leading-tight">{e.name}</h1>
      <p className="text-dim text-sm mt-1">
        {formatDate(e.created_at)} · {e.service || "No service selected"}
      </p>

      <div className="flex flex-wrap gap-2 mt-6">
        <a href={`mailto:${e.email}`} className={btn}>Email</a>
        {phone && <a href={`tel:${phone}`} className={btn}>Call</a>}
        {phone && (
          <a href={`https://wa.me/${phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className={btn}>
            WhatsApp
          </a>
        )}
      </div>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 bg-card border border-white/10 p-4 text-sm">
        <div>
          <dt className="text-dim text-xs tracking-wide uppercase">Email</dt>
          <dd className="mt-1 break-all">{e.email}</dd>
        </div>
        <div>
          <dt className="text-dim text-xs tracking-wide uppercase">Phone</dt>
          <dd className="mt-1">{phone || "—"}</dd>
        </div>
      </dl>

      <div className="mt-6">
        <p className="text-dim text-xs tracking-wide uppercase mb-2">Message</p>
        <p className="bg-card border border-white/10 p-4 whitespace-pre-wrap text-sm leading-relaxed">{e.message}</p>
      </div>

      <div className="mt-10">
        <EnquiryEditor key={e.updated_at} enquiry={e} />
      </div>
    </div>
  );
}
