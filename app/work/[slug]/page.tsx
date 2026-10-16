import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import NeedsContent from "@/components/NeedsContent";
import Link from "next/link";
import Image from "next/image";

const projects = [
  { slug: "lakme", name: "Lakmē", category: "Ad Film", description: "Quick Commerce Digital Campaign for Lakme’s Sunscreen range" },
  { slug: "nissan", name: "Nissan", category: "Brand Film", description: "Digital Ads and Shoulder Content for Nissan Gravite" },
  { slug: "sparx", name: "Sparx x Raghu Rajiv", category: "Brand Campaign", description: "Celebrity campaigns, digital ads." },
  { slug: "bering", name: "Bering Watches", category: "Product Film", description: "Digital Ads, Model + Product Campaigns." },
  { slug: "afnan", name: "Sparx x Chunky Panday", category: "Brand Campaign", description: "Celebrity campaigns, digital ads." },
  { slug: "flite", name: "Flite x Ali Fazal & Sanya Malhotra", category: "Brand Campaign", description: "Celebrity campaigns, digital ads." },
  { slug: "nissan-gravite-launch", name: "Nissan Gravite Launch Event", category: "Event Coverage", description: "Full Event Coverage and live edits" },
  { slug: "bagicha-wilderness", name: "Bagicha Wilderness", category: "Property Photography & Video", description: "Interior, space, and property photos and videos" },
  { slug: "bhagat-tarachand", name: "Bhagat Tarachand", category: "Property Photography & Video", description: "Interior, space, and property photos and videos" },
];

const propertyProjects = [
  {
    slug: "bhagat-tarachand",
    name: "Bhagat Tarachand",
    image: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Thumbnails/btc.jpg",
    imageRatio: "aspect-[1/1] md:aspect-auto md:h-[360px]",
  },
  {
    slug: "bagicha-wilderness",
    name: "Bagicha Wilderness",
    image: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Thumbnails/Bagicha.jpg",
    imageRatio: "aspect-[4/5] md:aspect-auto md:h-[360px]",
  },
];

const sparxFliteProjects = [
  {
    slug: "flite",
    name: "Flite x Ali Fazal & Sanya Malhotra",
    image: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Thumbnails/Screenshot%202026-10-15%20at%206.37.55%E2%80%AFPM.png",
    imageRatio: "aspect-[4/3] md:aspect-auto md:h-[340px]",
  },
  {
    slug: "sparx",
    name: "Sparx x Raghu Rajiv",
    image: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Thumbnails/Screenshot%202026-10-15%20at%206.42.50%E2%80%AFPM.png",
    imageRatio: "aspect-[4/3] md:aspect-auto md:h-[340px]",
  },
  {
    slug: "afnan",
    name: "Sparx x Chunky Panday",
    image: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Thumbnails/Screenshot%202026-10-15%20at%206.46.33%E2%80%AFPM.png",
    imageRatio: "aspect-[4/3] md:aspect-auto md:h-[340px]",
  },
];

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const isPropertyCollection = slug === "property-and-interiors";
  const isSparxFliteCollection = slug === "sparx-and-flite";
  const project = projects.find((p) => p.slug === slug) ?? projects[0];

  return (
    <main className="min-h-screen bg-ink">
      <CustomCursor />
      <Navbar />

      <section className={`px-[5%] pt-40 pb-32 mx-auto ${isPropertyCollection || isSparxFliteCollection ? "max-w-5xl" : "max-w-4xl"}`}>
        <Link href="/work" className="inline-flex items-center gap-2 text-dim text-xs tracking-widest uppercase mb-10 hover:text-amber transition-colors">
          ← Back to all work
        </Link>

        {isPropertyCollection || isSparxFliteCollection ? (
          <>
            <div className="font-mono text-xs tracking-[3px] uppercase text-amber mb-4">
              {isPropertyCollection ? "Property Photography & Video" : "Brand Campaign"}
            </div>
            <h1 className="font-display uppercase text-[clamp(36px,6vw,64px)] leading-[0.95] mb-16">
              {isPropertyCollection ? "Property and Interiors" : "Sparx & Flite"}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
              {(isPropertyCollection ? propertyProjects : sparxFliteProjects).map((collectionProject, index) => (
                <Link
                  key={collectionProject.slug}
                  href={`/work/${collectionProject.slug}`}
                  className={`group block ${
                    isPropertyCollection
                      ? index === 0 ? "md:col-span-7" : "md:col-span-5"
                      : ["md:col-span-5", "md:col-span-4", "md:col-span-3"][index]
                  }`}
                >
                  <div className={`relative mb-5 overflow-hidden bg-white/5 ${collectionProject.imageRatio}`}>
                    <Image
                      src={collectionProject.image}
                      alt={collectionProject.name}
                      fill
                      sizes="(min-width: 768px) 45vw, 90vw"
                      className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${
                        isSparxFliteCollection && index === 0 ? "object-[center_25%]" : ""
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-100" />
                  </div>
                  <h2 className="w-fit text-paper text-xl sm:text-2xl font-semibold transition-colors duration-300 group-hover:text-amber">
                    {collectionProject.name}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-dim">
                    {isPropertyCollection ? "Interior, space, and property photos and videos" : "Celebrity campaigns, digital ads."}
                  </p>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </section>
    </main>
  );
}