import Link from "next/link";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import NeedsContent from "@/components/NeedsContent";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-ink">
      <CustomCursor />
      <Navbar />

      <section className="px-[5%] pt-36 pb-32 border-b border-white/10">
        <div className="mb-16">
          <Link
            href="/"
            className="inline-flex text-dim text-xs tracking-widest uppercase mb-10 hover:text-amber transition-colors"
          >
            ← Back to home
          </Link>
          <h1 className="font-display uppercase text-[clamp(44px,8vw,110px)] leading-[0.88] max-w-4xl">
            About
            <br />
            us
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-14 md:gap-20 items-start">
          <div className="flex-1 min-w-0 max-w-2xl">
            <section>
              <p className="text-paper text-xl md:text-2xl leading-relaxed mb-6">
                Final Draft Studios is a creative production house built on creative vision and strong execution.
              </p>
              <p className="text-dim text-base leading-relaxed mb-6">
                We work across films, campaigns, photoshoots, events and content, bringing together creative direction, and fast turnarounds to deliver work for brands across industries.
              </p>
              <p className="text-dim text-base leading-relaxed mb-6">
                Founded by Keshav Chaturvedi and Disha Wadhwani, FDS has worked with brands across automotive, fashion, skincare, F&amp;B, finance and events.
              </p>
              <p className="text-dim text-base leading-relaxed">
                We bring together a network of creatives, producers and collaborators to deliver work that meets the brief and stands on its own.
              </p>
            </section>
          </div>

          <div className="flex-1 min-w-0 w-full md:sticky md:top-28 grid grid-cols-2 gap-4">
            <NeedsContent label="CLIENT ASSET — co-founder portrait 1" className="aspect-[3/4]" />
            <NeedsContent label="CLIENT ASSET — co-founder portrait 2" className="aspect-[3/4] mt-10" />
            <NeedsContent label="CLIENT ASSET — studio / behind the scenes" className="aspect-[4/3] col-span-2" />
          </div>
        </div>
      </section>
    </main>
  );
}