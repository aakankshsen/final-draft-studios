"use client";
import { useEffect, useRef, useState } from "react";
import NeedsContent from "@/components/NeedsContent";
import { ArrowUpRight } from "lucide-react";

const slides = [
  {
    tags: ["Direction", "Cinematography", "Colour", "Sound Design"],
    title: ["Brand", "Films"],
    assetLabel: "CLIENT ASSET — Brand film reel / hero video",
    videoSrc: "https://pub-06d5ca6a451e4bf9b57df03334b372cc.r2.dev/FinalDraftLV_1.mp4",
    counter: 1,
    align: "left" as const,
  },
    {
    tags: ["Post-Production", "Motion Titles", "Grade & Mix"],
    title: ["Short Films", "& Editing"],
    assetLabel: "CLIENT ASSET — Short film / edit reel",
    videoSrc: null,
    counter: 2,
    align: "right" as const,
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

        

          {/* GROUPED TEXT BLOCK — tags + heading together, alternating side */}
          <div
            className={`hidden md:flex flex-col z-20 absolute top-1/2 -translate-y-1/2 max-w-[38%] ${
              slide.align === "left" ? "left-10 md:left-16 items-start" : "right-10 md:right-16 items-end"
            }`}
          >
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
          <div className="relative z-10 h-[80vh] md:h-[84vh] aspect-[9/16] translate-y-4 md:translate-y-6">
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

          
        </div>
      ))}
    </div>
  );
}