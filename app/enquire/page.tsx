"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const services = [
  "Brand Films",
  "Wedding Films",
  "Short Films",
  "Editing",
  "Colour Grading",
  "Motion Titles",
  "Photography",
  "Social Content",
];

export default function EnquirePage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-ink">
      <CustomCursor />
      <Navbar />

      <section className="px-[5%] pt-40 pb-32 max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-dim text-xs tracking-widest uppercase mb-10 hover:text-amber transition-colors">
          ← Back to home
        </Link>

        
        <h1 className="font-display uppercase text-[clamp(36px,6vw,64px)] leading-[0.95] mb-6">
          Got a story
          <br />
          worth putting
          <br />
          on camera?
        </h1>
        <p className="text-dim text-base max-w-md mb-14">
          Tell us a bit about your project and we&apos;ll get back to you shortly.
        </p>

        {status === "success" ? (
          <div className="border border-amber/40 rounded-lg p-8 text-center">
            <p className="text-amber text-lg font-semibold mb-2">Enquiry sent.</p>
            <p className="text-dim text-sm">We&apos;ll be in touch shortly — thanks for reaching out.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs tracking-wide uppercase text-dim mb-2">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-paper focus:outline-none focus:border-amber transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs tracking-wide uppercase text-dim mb-2">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-paper focus:outline-none focus:border-amber transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs tracking-wide uppercase text-dim mb-2">Phone (optional)</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-paper focus:outline-none focus:border-amber transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs tracking-wide uppercase text-dim mb-2">Service</label>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-paper focus:outline-none focus:border-amber transition-colors"
                >
                  <option value="" className="bg-ink">Select a service</option>
                  {services.map((s) => (
                    <option key={s} value={s} className="bg-ink">{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-wide uppercase text-dim mb-2">Tell us about your project</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-transparent border-b border-white/20 py-3 text-paper focus:outline-none focus:border-amber transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="group self-start mt-4 flex items-center gap-2 border border-amber text-amber text-xs tracking-widest uppercase px-8 py-4 hover:bg-amber hover:text-ink transition-colors disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Send Enquiry"}
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {status === "error" && (
              <p className="text-tally text-sm">Something went wrong — please try again or email us directly.</p>
            )}
          </form>
        )}
      </section>
    </main>
  );
}