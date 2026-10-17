import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import NeedsContent from "@/components/NeedsContent";
import PhotoWall from "@/components/PhotoWall";
import VideoWall, { type PortfolioAsset, type PortfolioVideo } from "@/components/VideoWall";
import Link from "next/link";
import Image from "next/image";

const projects = [
  { slug: "lakme", name: "Lakmē", category: "Ad Film", description: "Quick Commerce Digital Campaign for Lakme’s Sunscreen range" },
  { slug: "nissan", name: "Nissan x Lakshya", category: "Brand Film", description: "Digital Ads and Shoulder Content for Nissan Gravite" },
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

const lakmePhotos = [
  "/work/lakme/01.webp",
  "/work/lakme/02.webp",
  "/work/lakme/03.webp",
  "/work/lakme/04.webp",
  "/work/lakme/05.webp",
  "/work/lakme/06.webp",
  "/work/lakme/07.webp",
  "/work/lakme/08.webp",
  "/work/lakme/09.webp",
  "/work/lakme/10.webp",
  "/work/lakme/11.webp",
  "/work/lakme/12.webp",
  "/work/lakme/13.webp",
  "/work/lakme/14.webp",
  "/work/lakme/15.webp",
  "/work/lakme/16.webp",
  "/work/lakme/17.webp",
  "/work/lakme/18.webp",
  "/work/lakme/19.webp",
  "/work/lakme/20.webp",
  "/work/lakme/21.webp",
  "/work/lakme/22.webp",
  "/work/lakme/23.webp",
  "/work/lakme/24.webp",
];

const nissanVideos: PortfolioVideo[] = [
  {
    title: "Diwali",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Nissan%20x%20Lakshya/DIWALI%20FINAL.mp4",
    poster: "/work/nissan/04.jpg",
  },
  {
    title: "Compilation",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Nissan%20x%20Lakshya/COMPILATION%20FINAL%2015%20FEB.mp4",
    poster: "/work/nissan/05.jpg",
  },
  {
    title: "Sunset W Music",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Nissan%20x%20Lakshya/SUNSET%20W%20MUSIC.mp4",
    poster: "/work/nissan/01.jpg",
  },
  {
    title: "Meeting Friends W Music",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Nissan%20x%20Lakshya/MEETING%20FRIENDS%20W%20MUSIC.mp4",
    poster: "/work/nissan/03.jpg",
  },
  {
    title: "BTS Day 1",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Nissan%20x%20Lakshya/BTS%20DAY%201.mp4",
    poster: "/work/nissan/06.jpg",
  },
  {
    title: "Onam Final",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Nissan%20x%20Lakshya/ONAM%20FINAL.mp4",
    poster: "/work/nissan/02.jpg",
  },
];

const nissanGraviteLaunchVideos: PortfolioVideo[] = [
  {
    title: "After Movie",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Nissan%20Gravite%20Launch%20event/After%20Movie_1.mp4",
  },
  {
    title: "Udaipur",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Nissan%20Gravite%20Launch%20event/Udaipur.mp4",
  },
  {
    title: "Entry",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Nissan%20Gravite%20Launch%20event/Entry.mp4",
  },
  {
    title: "Montage",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Nissan%20Gravite%20Launch%20event/Montage.mp4",
  },
  {
    title: "Mix 1",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Nissan%20Gravite%20Launch%20event/Mix%201.mp4",
  },
  {
    title: "Mix 2",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Nissan%20Gravite%20Launch%20event/Mix%202.mp4",
  },
];

const beringAssets: PortfolioAsset[] = [
  {
    title: "Product 1",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Bering%20Watches/PRODUCT%201%20FINAL.mp4",
  },
  {
    title: "Video 2",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Bering%20Watches/VIDEO%202%20VERTICAL%20FINAL%20.mp4%20.mp4",
  },
  {
    title: "Video 4",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Bering%20Watches/VIDEO%204%20FINAL.mp4",
  },
  {
    title: "Video 5",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Bering%20Watches/VIDEO%205%20FINAL.mp4",
  },
  {
    type: "image",
    title: "Bering Watch 1",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Bering%20Watches/DSC00185A%20copy.jpg",
  },
  {
    type: "image",
    title: "Bering Watch 2",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Bering%20Watches/Copy%20of%20axadwsf_sgsg_254.jpg",
  },
  {
    type: "image",
    title: "Bering Watch 3",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Bering%20Watches/DSC00219.png",
  },
  {
    type: "image",
    title: "Bering Watch 4",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Bering%20Watches/DSC00370.png",
  },
  {
    title: "Male 2",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Bering%20Watches/MALE%202%20CHANGED.mp4",
  },
  {
    title: "Female 3",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Bering%20Watches/FEMALE%203%20FINAL.mp4",
  },
];

const photoWallLayouts = [
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[4/3]",
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[4/5]",
  "aspect-[4/5]",
  "aspect-[4/3]",
  "aspect-[4/5]",
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
  const photos = slug === "lakme" ? lakmePhotos : null;
  const isNissanGraviteLaunch = slug === "nissan-gravite-launch";
  const isBering = slug === "bering";
  const videos = slug === "nissan"
    ? nissanVideos
    : isNissanGraviteLaunch
      ? nissanGraviteLaunchVideos
      : isBering
        ? beringAssets
        : null;
  const project = projects.find((p) => p.slug === slug) ?? projects[0];

  return (
    <main className="min-h-screen bg-ink">
      <CustomCursor />
      <Navbar />

      <section className={`px-[5%] pt-40 pb-32 mx-auto ${isPropertyCollection || isSparxFliteCollection ? "max-w-5xl" : photos ? "max-w-[1600px] px-[4%]" : videos ? "max-w-[1440px] px-[5%]" : "max-w-4xl"}`}>
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
            <h1 className="font-display uppercase text-[clamp(36px,6vw,64px)] leading-[0.95] mb-8">
              {project.slug === "lakme" ? "Lakmē Sun Expert" : project.name}
            </h1>
            <p className={`text-dim text-base max-w-lg ${photos || videos ? "mb-10" : "mb-16"}`}>{project.description}</p>

            {photos ? (
              <PhotoWall photos={photos} layouts={photoWallLayouts} label="Lakmē Sun Expert" />
            ) : videos ? (
              <div>
                {!isNissanGraviteLaunch && (
                  <h2 className="mb-5 text-xs font-medium tracking-[0.2em] text-dim uppercase">
                    Campaign films
                  </h2>
                )}
                <VideoWall
                  videos={videos}
                  label={project.name}
                  layout={isNissanGraviteLaunch ? "launch-event" : isBering ? "mixed" : "portrait"}
                  hideCaptions
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
                <NeedsContent label={`CLIENT ASSET — ${project.name} full video/edit`} className="aspect-video lg:col-span-8" />
                <NeedsContent label={`CLIENT ASSET — ${project.name} photo 1`} className="aspect-[4/5] lg:col-span-4" />
                <NeedsContent label={`CLIENT ASSET — ${project.name} photo 2`} className="aspect-[4/5] lg:col-span-5" />
                <NeedsContent label={`CLIENT ASSET — ${project.name} photo 3`} className="aspect-[4/3] lg:col-span-7" />
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}