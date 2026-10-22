"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger);

const roughDraftAssets = [
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/BTS%20ASSETS/1568e892-05f2-4b91-9fbf-f19bd7360326.JPG",
  "/work/rough-draft/2.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/BTS%20ASSETS/IMG_3512.PNG",
  "/work/rough-draft/3.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/BTS%20ASSETS/IMG_4025.PNG",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/BTS%20ASSETS/IMG_4293.JPG",
  "/work/rough-draft/4.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/BTS%20ASSETS/IMG_6052.JPG",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/BTS%20ASSETS/IMG_6115.JPG",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/BTS%20ASSETS/IMG_6409.JPG",
  "/work/rough-draft/1.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/BTS%20ASSETS/IMG_8866.PNG",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/BTS%20ASSETS/IMG_8867.PNG",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/BTS%20ASSETS/IMG_9263.PNG",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/BTS%20ASSETS/IMG_9264.PNG",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/BTS%20ASSETS/IMG_9504.JPG",
];

export default function Studio() {
  const assetRef = useRef<HTMLDivElement>(null);
  const [activeAsset, setActiveAsset] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const moveSlide = useCallback((direction: number) => {
    setActiveAsset((current) => (current + direction + roughDraftAssets.length) % roughDraftAssets.length);
  }, []);

  useEffect(() => {
    if (isFullscreen) return;

    const slideshow = window.setInterval(() => {
      moveSlide(1);
    }, 3000);

    return () => window.clearInterval(slideshow);
  }, [isFullscreen, moveSlide]);

  const closeFullscreen = useCallback(() => {
    setIsFullscreen(false);
    openerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isFullscreen) return;

    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeFullscreen();
      if (event.key === "ArrowLeft") moveSlide(-1);
      if (event.key === "ArrowRight") moveSlide(1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isFullscreen, closeFullscreen, moveSlide]);

  useEffect(() => {
    const el = assetRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { scale: 0.85, opacity: 0.3 },
      {
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          end: "top 60%",
          scrub: 0.5,
        },
      }
    );
  }, []);

  return (
    <section id="studio" className="px-[5%] py-28 border-b border-white/10">
      <Reveal className="grid gap-12 md:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] md:gap-14 items-center">
        <div className="flex flex-col justify-center">
          <h2 className="group mb-8 w-fit cursor-default font-display uppercase text-[clamp(30px,4.5vw,52px)] leading-none text-paper [-webkit-text-stroke:1px_rgba(245,166,35,0.6)] hover:text-amber hover:[-webkit-text-stroke:1px_#F5A623] transition-all duration-500">
            The Rough Draft
          </h2>
          <p className="text-dim text-base max-w-[480px] leading-relaxed">
            Before the final cut, there&apos;s a lot of chaos. This is where most of it happens
          </p>
        </div>

        <div className="flex items-center justify-center">
          <div ref={assetRef} className="w-full md:max-w-[720px] md:ml-auto">
            <div className="relative isolate h-[400px] w-full overflow-hidden sm:h-[500px] md:h-[600px]">
              <button
                type="button"
                aria-label={`Open behind-the-scenes image ${activeAsset + 1} fullscreen`}
                onClick={(event) => {
                  openerRef.current = event.currentTarget;
                  setIsFullscreen(true);
                }}
                className="absolute inset-0 z-0 block size-full cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber"
              >
                <Image
                  key={roughDraftAssets[activeAsset]}
                  src={roughDraftAssets[activeAsset]}
                  alt={`Behind-the-scenes studio image ${activeAsset + 1}`}
                  fill
                  priority={activeAsset === 0}
                  sizes="(min-width: 768px) 45vw, 90vw"
                  className="object-contain"
                />
              </button>

              <button
                type="button"
                aria-label="Previous slideshow image"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation();
                  moveSlide(-1);
                }}
                className="absolute left-3 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/60 text-white transition-colors hover:border-amber hover:text-amber focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber"
              >
                <ChevronLeft size={22} aria-hidden="true" />
              </button>

              <button
                type="button"
                aria-label="Next slideshow image"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation();
                  moveSlide(1);
                }}
                className="absolute right-3 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/60 text-white transition-colors hover:border-amber hover:text-amber focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber"
              >
                <ChevronRight size={22} aria-hidden="true" />
              </button>

              <p aria-live="polite" className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs tracking-widest text-white/80">
                {activeAsset + 1} / {roughDraftAssets.length}
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {isFullscreen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Behind-the-scenes slideshow"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-8"
          onClick={closeFullscreen}
        >
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close fullscreen slideshow"
            onClick={closeFullscreen}
            className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white transition-colors hover:border-amber hover:text-amber sm:right-8 sm:top-8"
          >
            <X size={23} aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label="Previous slideshow image"
            onClick={(event) => {
              event.stopPropagation();
              moveSlide(-1);
            }}
            className="absolute left-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white transition-colors hover:border-amber hover:text-amber sm:left-8 sm:size-14"
          >
            <ChevronLeft size={23} aria-hidden="true" />
          </button>

          <div className="relative h-[88vh] max-h-[88vh] w-[88vw] max-w-7xl" onClick={(event) => event.stopPropagation()}>
            <Image
              key={roughDraftAssets[activeAsset]}
              src={roughDraftAssets[activeAsset]}
              alt={`Behind-the-scenes studio image ${activeAsset + 1}`}
              fill
              sizes="100vw"
              priority
              className="object-contain"
            />
            <p className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs tracking-widest text-white/80">
              {activeAsset + 1} / {roughDraftAssets.length}
            </p>
          </div>

          <button
            type="button"
            aria-label="Next slideshow image"
            onClick={(event) => {
              event.stopPropagation();
              moveSlide(1);
            }}
            className="absolute right-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white transition-colors hover:border-amber hover:text-amber sm:right-8 sm:size-14"
          >
            <ChevronRight size={23} aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
