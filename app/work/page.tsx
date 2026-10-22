import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    slug: "lakme",
    name: "Lakmē Sun Expert",
    category: "Ad Film",
    description: "Quick Commerce Digital Campaign for Lakme’s Sunscreen range",
    image: "/work/lakme/cover.jpg",
    layout: "lg:col-span-7",
    imageRatio: "aspect-[4/3] sm:aspect-[1.2/1] lg:aspect-[1.35/1]",
  },
  {
    slug: "nissan",
    name: "Nissan x Lakshya",
    category: "Brand Film",
    description: "Digital Ads and Shoulder Content for Nissan Gravite",
    image: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Thumbnails/lakshyaaaa.webp",
    layout: "lg:col-span-5",
    imageRatio: "aspect-[4/5] sm:aspect-[1/1] lg:aspect-[0.9/1]",
  },
  {
    slug: "bering",
    name: "Bering Watches",
    category: "Product Film",
    description: "Digital Ads, Model + Product Campaigns.",
    image: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Bering%20Watches/DSC00219.png",
    layout: "lg:col-span-5",
    imageRatio: "aspect-[4/3] sm:aspect-[1/1] lg:aspect-square",
  },
  {
    slug: "sparx-and-flite",
    name: "Sparx & Flite",
    category: "Brand Campaign",
    description: "Celebrity campaigns, digital ads.",
    image: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Thumbnails/Screenshot%202026-10-15%20at%206.37.55%E2%80%AFPM.png",
    layout: "lg:col-span-7",
    imageRatio: "aspect-[4/5] sm:aspect-[1.2/1] lg:aspect-[1.4/1]",
  },
  {
    slug: "nissan-gravite-launch",
    name: "Nissan Gravite Launch Event",
    category: "Event Coverage",
    description: "Full Event Coverage and live edits",
    image: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Thumbnails/6a8991bdcafcedc39a89628c_Nissan%20Gravite%20Image.webp",
    layout: "lg:col-span-7",
    imageRatio: "aspect-[4/3] sm:aspect-[1.2/1] lg:aspect-[1.2/1]",
  },
  {
    slug: "property-and-interiors",
    name: "Property and Interiors",
    category: "Property Photography & Video",
    description: "Interior, space, and property photos and videos",
    image: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Thumbnails/Bagicha.jpg",
    layout: "lg:col-span-5",
    imageRatio: "aspect-[4/5] sm:aspect-[1/1] lg:aspect-[0.9/1]",
  },
  {
    slug: "purple-finance",
    name: "Purple Finance",
    category: "Brand Film",
    description: "Corporate Documentaries/Brand Films for Purple Finance Limited",
    image: "/work/posters/purple-finance.jpg",
    layout: "lg:col-span-7",
    imageRatio: "aspect-[4/3] sm:aspect-[1.2/1] lg:aspect-[1.2/1]",
  },
  {
    slug: "picnic-2026-by-district",
    name: "Picnic 2026 by District",
    category: "Event Coverage",
    description: "Full event coverage + Live edits for Picnic 2026 by District",
    image: "/work/posters/picnic-district.jpg",
    layout: "lg:col-span-5",
    imageRatio: "aspect-[4/3] sm:aspect-[1/1] lg:aspect-square",
  },
  {
    slug: "armour-clothing",
    name: "Armour Clothing",
    category: "Brand Campaign",
    description: "Brand Launch reels for Aramour Clothing",
    image: "/work/posters/armour-clothing.jpg",
    layout: "lg:col-span-5",
    imageRatio: "aspect-[4/5] sm:aspect-[1/1] lg:aspect-[0.9/1]",
  },
  {
    slug: "food-and-beverage",
    name: "Food & Beverage",
    category: "Food Photography",
    description: "F&B Photography for B Bhagat Tarachand and FinX Commune Cafe",
    image: "/work/food-and-beverage/01.jpg",
    layout: "lg:col-span-7",
    imageRatio: "aspect-[4/3] sm:aspect-[1.2/1] lg:aspect-[1.2/1]",
  },
  {
    slug: "motion-graphics",
    name: "Motion Graphics",
    category: "Digital Campaign",
    description: "Relaxo Website Launch Ad",
    image: "/work/posters/motion-graphics.jpg",
    layout: "lg:col-span-7",
    imageRatio: "aspect-[4/3] sm:aspect-[1.2/1] lg:aspect-[1.2/1]",
  },
  {
    slug: "sparx-product-launch",
    name: "Sparx Product Launch",
    category: "Product Launch",
    description: "Fashion/lifestyle reels for Sparx Footwear",
    image: "/work/posters/sparx-product-launch-1.jpg",
    layout: "lg:col-span-5",
    imageRatio: "aspect-[4/5] sm:aspect-[1/1] lg:aspect-[0.9/1]",
  },
];

export default function WorkListPage() {
  return (
    <main className="min-h-screen bg-ink">
      <CustomCursor />
      <Navbar />

      <section className="mx-auto max-w-5xl px-[5%] pt-40 pb-32">
        <h1 className="font-display uppercase text-[clamp(36px,6vw,64px)] leading-[0.95] mb-16">
          All <span className="text-amber">Work</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-5 gap-y-10 sm:gap-x-6 sm:gap-y-12">
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className={`group block ${project.layout}`}
            >
              <div className={`relative mb-4 overflow-hidden bg-white/5 ${project.imageRatio}`}>
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  priority={index < 2}
                  sizes="(min-width: 1024px) 45vw, (min-width: 640px) 48vw, 90vw"
                  className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${
                    project.slug === "sparx-and-flite" ? "object-[center_25%]" : ""
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-100" />
              </div>
              <h2 className="w-fit text-paper text-lg sm:text-xl font-semibold transition-colors duration-300 group-hover:text-amber">
                {project.name}
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-dim">{project.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
