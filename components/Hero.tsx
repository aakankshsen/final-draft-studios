import NeedsContent from "@/components/NeedsContent";
import { ArrowUpRight } from "lucide-react";

const slides = [
  {
    tags: ["Direction", "Cinematography", "Colour", "Sound Design"],
    title: ["Brand", "Films"],
    assetLabel: "CLIENT ASSET — Brand film reel / hero video",
    counter: 1,
  },
  {
    tags: ["Documentary Style", "Cinematic Edit", "Same-Day Highlights"],
    title: ["Wedding", "Films"],
    assetLabel: "CLIENT ASSET — Wedding film reel",
    counter: 2,
  },
  {
    tags: ["Post-Production", "Motion Titles", "Grade & Mix"],
    title: ["Short Films", "& Editing"],
    assetLabel: "CLIENT ASSET — Short film / edit reel",
    counter: 3,
  },
];

export default function Hero() {
  return (
    <div>
      {slides.map((slide, i) => (
        <div
          key={slide.counter}
          className="relative min-h-screen flex flex-col justify-end px-[5%] pb-24 overflow-hidden"
        >
          <NeedsContent label={slide.assetLabel} className="absolute inset-0 z-0" />

          <div className="absolute top-36 right-[5%] z-20 flex items-center gap-2 font-mono text-sm text-dim">
            {slides.map((s) => (
              <span key={s.counter} className={s.counter === slide.counter ? "text-amber" : ""}>
                {s.counter}
                {s.counter !== slides.length ? " /" : ""}
              </span>
            ))}
          </div>

          <div className="relative z-10">
            <div className="flex gap-2.5 flex-wrap mb-6">
              {slide.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] tracking-wide uppercase text-dim border border-white/10 px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="font-display uppercase leading-[0.95] text-[clamp(38px,7vw,84px)] max-w-4xl">
              {slide.title[0]}
              <br />
              {slide.title[1]}
            </h2>
          </div>

          {i === 0 && (
            <div className="absolute bottom-12 left-[5%] z-20 flex items-center gap-2.5 font-mono text-[11px] tracking-widest text-dim">
              SCROLL
              <ArrowUpRight size={14} className="text-amber animate-bob" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}