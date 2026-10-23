"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await createClient().auth.signInWithPassword({ email, password });
    if (error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }
    router.replace("/");
    router.refresh();
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 safe-top safe-bottom">
      <form onSubmit={submit} className="w-full max-w-sm flex flex-col gap-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/icon-192.png" alt="" width={56} height={56} className="rounded-xl" />
        <div>
          <h1 className="uppercase text-3xl leading-none">Enquiries</h1>
          <p className="text-dim text-sm mt-2">Sign in to view and manage your leads.</p>
        </div>
        <div>
          <label className="block text-xs tracking-wide uppercase text-dim mb-2">Email</label>
          <input
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-amber transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs tracking-wide uppercase text-dim mb-2">Password</label>
          <input
            required
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-amber transition-colors"
          />
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          disabled={loading}
          className="border border-amber text-amber text-xs tracking-widest uppercase px-8 py-4 hover:bg-amber hover:text-ink transition-colors disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
