"use client";
import { useEffect, useRef, useState } from "react";
import NeedsContent from "@/components/NeedsContent";
import { ArrowUpRight } from "lucide-react";

const slides = [
  {
    tags: ["Direction", "Cinematography", "Colour", "Sound Design"],
    title: ["Brand", "Films"],
    assetLabel: "CLIENT ASSET — Brand film reel / hero video",
    videoSrc: "/videos/FinalDraftLV_1.mp4",
    counter: 1,
    align: "left" as const,
  },
  {
    tags: ["Documentary Style", "Cinematic Edit", "Same-Day Highlights"],
    title: ["Wedding", "Films"],
    assetLabel: "CLIENT ASSET — Wedding film reel",
    videoSrc: null,
    counter: 2,
    align: "right" as const,
  },
  {
    tags: ["Post-Production", "Motion Titles", "Grade & Mix"],
    title: ["Short Films", "& Editing"],
    assetLabel: "CLIENT ASSET — Short film / edit reel",
    videoSrc: null,
    counter: 3,
    align: "left" as const,
  },
];

function Timecode({ videoRef }: { videoRef: React.RefObject<HTMLVideoElement | null> }) {
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const update = () => {
      const t = el.currentTime;
      const mm = String(Math.floor(t / 60)).padStart(2, "0");
      const ss = String(Math.floor(t % 60)).padStart(2, "0");
      const ff = String(Math.floor((t % 1) * 30)).padStart(2, "0");
      setTime(`${mm}:${ss}:${ff}`);
    };
    el.addEventListener("timeupdate", update);
    return () => el.removeEventListener("timeupdate", update);
  }, [videoRef]);

  return <span className="tabular-nums">{time}</span>;
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div>
      {slides.map((slide, i) => (
        <div
          key={slide.counter}
          className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink"
        >
          {/* full-bleed ambient background from the same video */}
          {slide.videoSrc && (
            <>
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover scale-110 blur-[28px] opacity-75 z-0"
              >
                <source src={slide.videoSrc} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-ink/25 z-0" />
            </>
          )}

          {/* viewfinder corner brackets */}
          <div className="pointer-events-none absolute inset-6 md:inset-10 z-20">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber/70" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber/70" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber/70" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber/70" />
          </div>

          {/* REC + timecode — top right */}
          {slide.videoSrc && (
            <div className="absolute top-8 right-8 z-20 flex items-center gap-2 font-mono text-[11px] text-dim">
              <span className="w-2 h-2 rounded-full bg-tally animate-pulse" />
              <span className="text-tally">REC</span>
              <Timecode videoRef={videoRef} />
            </div>
          )}

          {/* slide counter — top left */}
          <div className="absolute top-8 left-8 z-20 flex items-center gap-2 font-mono text-sm text-dim">
            {slides.map((s) => (
              <span key={s.counter} className={s.counter === slide.counter ? "text-amber" : ""}>
                {s.counter}
                {s.counter !== slides.length ? " /" : ""}
              </span>
            ))}
          </div>

          {/* GROUPED TEXT BLOCK — tags + heading together, alternating side */}
          <div
            className={`hidden md:flex flex-col z-20 absolute top-1/2 -translate-y-1/2 max-w-[38%] ${
              slide.align === "left" ? "left-10 md:left-16 items-start" : "right-10 md:right-16 items-end"
            }`}
          >
            <div className="font-mono text-[11px] tracking-[3px] uppercase text-amber mb-5">
              Scene {String(slide.counter).padStart(2, "0")}
            </div>

            <h2
              className={`group cursor-default select-none leading-[0.9] uppercase font-display text-paper
                [-webkit-text-stroke:1px_rgba(245,166,35,0.6)]
                hover:text-amber hover:[-webkit-text-stroke:1px_#F5A623]
                transition-all duration-500 drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] ${slide.align === "left" ? "text-left" : "text-right"}`}
              style={{ fontSize: "clamp(48px, 6.5vw, 110px)" }}
            >
              {slide.title[0]}
              <br />
              {slide.title[1]}
            </h2>

            <div className={`flex gap-2 flex-wrap mt-7 ${slide.align === "left" ? "justify-start" : "justify-end"}`}>
              {slide.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] tracking-wide uppercase text-dim border border-white/10 px-3 py-1.5 rounded-full whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* the actual vertical video, fully visible, not cropped */}
          <div className="relative z-10 h-[80vh] md:h-[84vh] aspect-[9/16]">
            {slide.videoSrc ? (
              <video
                ref={i === 0 ? videoRef : undefined}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-contain"
              >
                <source src={slide.videoSrc} type="video/mp4" />
              </video>
            ) : (
              <NeedsContent label={slide.assetLabel} className="w-full h-full" />
            )}
          </div>

          {/* mobile: heading + tags stacked below video, centered */}
          <div className="md:hidden flex flex-col items-center gap-5 absolute bottom-24 left-0 right-0 z-20 px-6 text-center">
            <h2
              className="uppercase font-display text-paper [-webkit-text-stroke:1px_rgba(245,166,35,0.6)] leading-[0.95] drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
              style={{ fontSize: "clamp(32px, 10vw, 56px)" }}
            >
              {slide.title[0]} {slide.title[1]}
            </h2>
            <div className="flex gap-2 flex-wrap justify-center">
              {slide.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] tracking-wide uppercase text-dim border border-white/10 px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {i === 0 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 z-20 flex items-center gap-2.5 font-mono text-[11px] tracking-widest text-dim">
              SCROLL
              <ArrowUpRight size={14} className="text-amber animate-bob" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}