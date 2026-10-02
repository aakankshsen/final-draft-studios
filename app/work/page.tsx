import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import NeedsContent from "@/components/NeedsContent";
import Link from "next/link";

const projects = [
  { slug: "lakme", name: "Lakmē", category: "Ad Film" },
  { slug: "nissan", name: "Nissan", category: "Brand Film" },
  { slug: "sparx", name: "Sparx", category: "UGC / Social" },
  { slug: "bering", name: "Bering Watches", category: "Product Film" },
  { slug: "afnan", name: "Afnan Perfumes", category: "Brand Campaign" },
];

export default function WorkListPage() {
  return (
    <main className="min-h-screen bg-ink">
      <CustomCursor />
      <Navbar />

      <section className="px-[5%] pt-40 pb-32">
        <h1 className="font-display uppercase text-[clamp(36px,6vw,64px)] leading-[0.95] mb-16">
          All Work
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {projects.map((p) => (
            <Link key={p.slug} href={`/work/${p.slug}`} className="group">
              <NeedsContent label={`CLIENT ASSET — ${p.name}`} className="aspect-[9/16] mb-4 group-hover:opacity-80 transition-opacity" />
              <div className="font-mono text-[11px] tracking-wide uppercase text-amber mb-1">{p.category}</div>
              <div className="text-paper font-semibold">{p.name}</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}