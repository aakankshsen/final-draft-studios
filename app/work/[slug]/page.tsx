import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import NeedsContent from "@/components/NeedsContent";
import Link from "next/link";

const projects = [
  { slug: "lakme", name: "Lakmē", category: "Ad Film", description: "A sun-care campaign shot across three locations, blending product beauty shots with lifestyle film." },
  { slug: "nissan", name: "Nissan", category: "Brand Film", description: "A cinematic brand film capturing precision engineering through dynamic motion and light." },
  { slug: "sparx", name: "Sparx", category: "UGC / Social", description: "A fast-paced social campaign built for scroll-stopping reach across Instagram and YouTube Shorts." },
  { slug: "bering", name: "Bering Watches", category: "Product Film", description: "A quiet, detail-driven product film highlighting craftsmanship frame by frame." },
  { slug: "afnan", name: "Afnan Perfumes", category: "Brand Campaign", description: "A sensorial campaign translating scent into visual rhythm and mood." },
];

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug) ?? projects[0];

  return (
    <main className="min-h-screen bg-ink">
      <CustomCursor />
      <Navbar />

      <section className="px-[5%] pt-40 pb-32 max-w-4xl mx-auto">
        <Link href="/work" className="inline-flex items-center gap-2 text-dim text-xs tracking-widest uppercase mb-10 hover:text-amber transition-colors">
          ← Back to all work
        </Link>

        <div className="font-mono text-xs tracking-[3px] uppercase text-amber mb-4">
          {project.category}
        </div>
        <h1 className="font-display uppercase text-[clamp(36px,6vw,64px)] leading-[0.95] mb-8">
          {project.name}
        </h1>
        <p className="text-dim text-base max-w-lg mb-16">{project.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NeedsContent label={`CLIENT ASSET — ${project.name} full video/edit`} className="aspect-video md:col-span-2" />
          <NeedsContent label={`CLIENT ASSET — ${project.name} photo 1`} className="aspect-[4/5]" />
          <NeedsContent label={`CLIENT ASSET — ${project.name} photo 2`} className="aspect-[4/5]" />
        </div>
      </section>
    </main>
  );
}