import Link from "next/link";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-ink">
      <CustomCursor />
      <Navbar />

      <section className="border-b border-white/10 px-[5%] pt-36 pb-32">
        <div className="mx-auto max-w-5xl text-center">
        <div className="mb-16">
          <Link
            href="/"
            className="mb-10 inline-flex text-dim text-xs uppercase tracking-widest transition-colors hover:text-amber"
          >
            ← Back to home
          </Link>
          <h1 className="mx-auto max-w-4xl font-display uppercase text-[clamp(44px,8vw,110px)] leading-[0.88]">
            About <span className="text-amber">us</span>
          </h1>
        </div>

        <div className="mx-auto max-w-3xl">
          <section>
              <p className="mb-6 font-bold text-xl leading-relaxed text-amber md:text-2xl">
                Final Draft Studios is a creative production house built on strong vision and immaculate execution.
              </p>
              <p className="mb-6 font-bold text-base leading-relaxed text-dim">
                Founded by <span className="text-amber">Keshav Chaturvedi</span> and <span className="text-amber">Disha Wadhwani</span>, FDS has worked with brands across automotive, fashion, skincare, F&amp;B, finance and events.
              </p>
              <p className="mb-6 font-bold text-base leading-relaxed text-dim">
                We handle campaigns, photoshoots, events and content, bringing together creative direction, and fast turnarounds for end-to-end support.
              </p>
              <p className="font-bold text-base leading-relaxed text-dim">
                We tie together a network of creatives, producers and collaborators to deliver work that meets the brief and stands on its own.
              </p>
          </section>
        </div>
        </div>
      </section>
    </main>
  );
}