import { NextResponse } from "next/server";
import webpush from "web-push";
import { timingSafeEqual } from "node:crypto";
import { createServiceClient } from "@/lib/supabase/service";

export const runtime = "nodejs";

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  const secret = process.env.NOTIFY_SECRET;
  const provided = req.headers.get("x-notify-secret") ?? "";
  if (!secret || !safeEqual(provided, secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = (await req.json().catch(() => ({}))) as { id?: string };
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const supabase = createServiceClient();
  const { data: enquiry } = await supabase.from("enquiries").select("*").eq("id", id).single();
  if (!enquiry) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const results: { push: number; email: boolean; errors: string[] } = { push: 0, email: false, errors: [] };
  const title = `New enquiry from ${enquiry.name}`;
  const body = enquiry.service ? `${enquiry.service} — ${enquiry.message}` : enquiry.message;

  const { VAPID_PRIVATE_KEY, NEXT_PUBLIC_VAPID_PUBLIC_KEY, VAPID_SUBJECT } = process.env;
  if (VAPID_PRIVATE_KEY && NEXT_PUBLIC_VAPID_PUBLIC_KEY && VAPID_SUBJECT) {
    webpush.setVapidDetails(VAPID_SUBJECT, NEXT_PUBLIC_VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
    const { data: subs } = await supabase.from("push_subscriptions").select("*");
    const payload = JSON.stringify({ title, body: body.slice(0, 140), url: `/enquiries/${id}` });
    await Promise.all(
      (subs ?? []).map(async (s) => {
        try {
          await webpush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, payload);
          results.push++;
        } catch (err) {
          const code = (err as { statusCode?: number }).statusCode;
          results.errors.push(`push ${code ?? "error"}: ${(err as Error).message}`.slice(0, 160));
          if (code === 404 || code === 410) await supabase.from("push_subscriptions").delete().eq("id", s.id);
        }
      })
    );
    if (!subs?.length) results.errors.push("no push subscriptions found");
  } else {
    results.errors.push(
      `push not configured on server (missing: ${[
        !VAPID_PRIVATE_KEY && "VAPID_PRIVATE_KEY",
        !NEXT_PUBLIC_VAPID_PUBLIC_KEY && "NEXT_PUBLIC_VAPID_PUBLIC_KEY",
        !VAPID_SUBJECT && "VAPID_SUBJECT",
      ]
        .filter(Boolean)
        .join(", ")})`
    );
  }

  const { RESEND_API_KEY, NOTIFY_FROM_EMAIL, NOTIFY_TO_EMAIL } = process.env;
  if (RESEND_API_KEY && NOTIFY_FROM_EMAIL && NOTIFY_TO_EMAIL) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: NOTIFY_FROM_EMAIL,
        to: NOTIFY_TO_EMAIL.split(",").map((s) => s.trim()),
        reply_to: enquiry.email,
        subject: title,
        html: `<h2>${esc(title)}</h2>
          <p><b>Email:</b> ${esc(enquiry.email)}<br/><b>Phone:</b> ${esc(enquiry.phone || "-")}<br/><b>Service:</b> ${esc(enquiry.service || "-")}</p>
          <p style="white-space:pre-wrap">${esc(enquiry.message)}</p>`,
      }),
    });
    results.email = res.ok;
  }

  return NextResponse.json({ ok: true, ...results });
}
