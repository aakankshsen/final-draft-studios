"use client";
import { useEffect, useRef, useState } from "react";
import { useAutoplayVideo } from "./useAutoplayVideo";

const slides = [
  {
    tags: ["Digital Campaigns", "Photoshoots", "Events"],
    title: ["Showreel", "2025"],
    assetLabel: "CLIENT ASSET — Brand film reel / hero video",
    videoSrc: "/videos/hero-reel.mp4",
    counter: 1,
    align: "left" as const,
  },
];

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);
  const { videoRef, playbackBlocked } = useAutoplayVideo(loadVideo);
  const {
    videoRef: backgroundRef,
    playbackBlocked: backgroundBlocked,
  } = useAutoplayVideo(loadVideo);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setLoadVideo(true);
        observer.disconnect();
      }
    }, { rootMargin: "100px" });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="bg-ink">
      <div className="h-px w-full bg-white/10" />
      {slides.map((slide) => (
        <div
          key={slide.counter}
          className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink"
        >
          {/* full-bleed ambient background from the same video */}
          {slide.videoSrc && (
            <>
              <video
                ref={backgroundRef}
                src={loadVideo ? slide.videoSrc : undefined}
                autoPlay={loadVideo}
                muted
                loop
                playsInline
                style={{ visibility: backgroundBlocked ? "hidden" : "visible" }}
                className="pointer-events-none absolute inset-0 w-full h-full object-cover scale-110 blur-[28px] opacity-75 z-0"
              />
              <div className="absolute inset-0 bg-ink/25 z-0" />
            </>
          )}

        

          {/* GROUPED TEXT BLOCK — tags + heading together, alternating side */}
          <div
            className={`hidden lg:flex flex-col z-20 absolute top-1/2 -translate-y-1/2 max-w-[calc((100vw_-_min(51.75vh,32vw))/2_-_5.5rem)] ${
              slide.align === "left" ? "left-10 md:left-16 items-start" : "right-10 md:right-16 items-end"
            }`}
          >
            <h2
              className={`group w-fit cursor-default select-none leading-[0.9] uppercase font-display text-paper text-[clamp(48px,min(5.2vw,calc((50vw_-_min(25.875vh,16vw)_-_5.5rem)/5.3)),100px)]
                [-webkit-text-stroke:1px_rgba(245,166,35,0.6)]
                hover:text-amber hover:[-webkit-text-stroke:1px_#F5A623]
                transition-colors duration-500 drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] ${slide.align === "left" ? "text-left" : "text-right"}`}
            >
              {slide.title[0]}
              <br />
              {slide.title[1]}
            </h2>

            <div className={`flex gap-2 flex-wrap mt-7 ${slide.align === "left" ? "justify-start" : "justify-end"}`}>
              {slide.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] tracking-wide uppercase text-amber border border-white/10 px-3 py-1.5 rounded-full whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* the actual vertical video, fully visible, not cropped */}
          <div className="relative z-10 w-[85vw] aspect-[4/5] sm:w-[70vw] sm:aspect-[3/4] md:w-[60vw] lg:w-[min(51.75vh,32vw)] lg:h-auto lg:aspect-[9/16]">
            <video
              ref={videoRef}
              src={loadVideo ? slide.videoSrc : undefined}
              autoPlay={loadVideo}
              muted
              loop
              playsInline
              style={{ visibility: playbackBlocked ? "hidden" : "visible" }}
              className="pointer-events-none w-full h-full object-contain"
            />
          </div>

          {/* mobile: heading + tags stacked below video, centered */}
          <div className="lg:hidden flex flex-col items-center gap-3 sm:gap-5 absolute bottom-8 sm:bottom-12 left-0 right-0 z-20 px-4 sm:px-6 text-center">
            <h2
              className="uppercase font-display text-paper [-webkit-text-stroke:1px_rgba(245,166,35,0.6)] leading-[0.95] drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
              style={{ fontSize: "clamp(32px, 9vw, 52px)" }}
            >
              {slide.title[0]} {slide.title[1]}
            </h2>
            <div className="flex gap-2 flex-wrap justify-center">
              {slide.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] tracking-wide uppercase text-amber border border-white/10 px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          
        </div>
      ))}
      <div className="h-px w-full bg-white/10" />
    </div>
  );
}