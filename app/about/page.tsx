import Link from "next/link";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import NeedsContent from "@/components/NeedsContent";

const founders = [
  {
    role: "Keshav Chaturvedi — Director & Cinematographer",
    bio: "Keshav is my friend.",
  },
  {
    label: "",
    role: "Disha ",
    bio: "Disha is also my friend.",
  },
];

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
            <section className="pb-14 border-b border-white/10">
              <p className="text-amber text-xs tracking-[3px] uppercase mb-5">About the company</p>
              <p className="text-paper text-xl md:text-2xl leading-relaxed mb-6">
                Final Draft Studios is a content production house built around stories that stay with people.
              </p>
              <p className="text-dim text-base leading-relaxed">
                We work across brand films, wedding films, short films, editing, and motion. From the first idea to the final frame, we bring direction, craft, and a considered point of view to every project.
              </p>
            </section>

            <section className="pt-14">
              <p className="text-amber text-xs tracking-[3px] uppercase mb-8">The co-founders</p>
              <div className="flex flex-col">
                {founders.map((founder) => (
                  <article key={founder.label} className="py-7 border-t border-white/10 first:pt-0">
                    <p className="font-mono text-xs tracking-wide uppercase text-amber mb-3">{founder.label}</p>
                    <h2 className="font-display uppercase text-2xl md:text-3xl mb-3">{founder.role}</h2>
                    <p className="text-dim text-sm leading-relaxed max-w-lg">{founder.bio}</p>
                  </article>
                ))}
              </div>
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