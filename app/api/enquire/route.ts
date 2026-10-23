import { NextResponse, after } from "next/server";

const limits = { name: 120, email: 200, phone: 40, service: 120, message: 5000 };
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const row = {
    name: clean(body.name, limits.name),
    email: clean(body.email, limits.email),
    phone: clean(body.phone, limits.phone) || null,
    service: clean(body.service, limits.service) || null,
    message: clean(body.message, limits.message),
  };

  if (!row.name || !row.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) {
    return NextResponse.json({ error: "Please fill in name, a valid email and message." }, { status: 400 });
  }

  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_URL, NOTIFY_SECRET } = process.env;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Enquiry storage is not configured (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).");
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/enquiries`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(row),
  });

  if (!res.ok) {
    console.error("Failed to save enquiry:", res.status, await res.text());
    return NextResponse.json({ error: "Could not save enquiry" }, { status: 500 });
  }

  const [saved] = (await res.json()) as { id: string }[];

  if (ADMIN_URL && NOTIFY_SECRET && saved?.id) {
    after(async () => {
      try {
        await fetch(`${ADMIN_URL.replace(/\/$/, "")}/api/notify`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-notify-secret": NOTIFY_SECRET },
          body: JSON.stringify({ id: saved.id }),
        });
      } catch (err) {
        console.error("Notify failed:", err);
      }
    });
  }

  return NextResponse.json({ ok: true });
}
