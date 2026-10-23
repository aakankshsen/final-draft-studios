"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

function urlBase64ToUint8Array(base64: string) {
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const raw = atob(padded.replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
}

export default function PushToggle() {
  const [state, setState] = useState<"loading" | "unsupported" | "off" | "on" | "denied">("loading");
  const [hint, setHint] = useState("");

  useEffect(() => {
    (async () => {
      if (!("serviceWorker" in navigator) || !("PushManager" in window) || !process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
        // iOS only exposes push to apps added to the Home Screen
        const ios = /iPhone|iPad/.test(navigator.userAgent);
        if (ios) setHint("On iPhone: Share → Add to Home Screen, then open the app to enable alerts.");
        return setState("unsupported");
      }
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      setState(Notification.permission === "denied" ? "denied" : sub ? "on" : "off");
    })();
  }, []);

  const enable = async () => {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return setState("denied");
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
    });
    const json = sub.toJSON();
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !json.keys) return;
    await supabase.from("push_subscriptions").upsert(
      { user_id: user.id, endpoint: sub.endpoint, p256dh: json.keys.p256dh, auth: json.keys.auth },
      { onConflict: "endpoint" }
    );
    setState("on");
  };

  const disable = async () => {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if (sub) {
      await createClient().from("push_subscriptions").delete().eq("endpoint", sub.endpoint);
      await sub.unsubscribe();
    }
    setState("off");
  };

  if (state === "loading") return null;
  if (state === "unsupported") return hint ? <p className="text-dim text-xs">{hint}</p> : null;
  if (state === "denied") return <p className="text-dim text-xs">Notifications are blocked in your browser settings.</p>;

  return (
    <button
      onClick={state === "on" ? disable : enable}
      className="text-xs tracking-widest uppercase border border-white/20 px-3 py-2 hover:border-amber hover:text-amber transition-colors"
    >
      {state === "on" ? "Alerts on" : "Enable alerts"}
    </button>
  );
}
