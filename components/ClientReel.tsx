"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Reveal from "@/components/Reveal";
import NeedsContent from "@/components/NeedsContent";

const LOGO_BASE =
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Clientelle%20Logos";

type Client = {
  name: string;
  logoSrc: string | null;
  onLight?: boolean; // set true for logos that need a light panel behind them
  scale?: number; // 1 = default size, higher = bigger logo
};

const clients: Client[] = [
  { name: "Lakmē", logoSrc: `${LOGO_BASE}/Gold-logo2.png`, scale: 1.4 },
  { name: "Sparx", logoSrc: `${LOGO_BASE}/Sparx%20New%20Logo%2017-08-2026-1.png` },
  { name: "Bhagat Tarachand", logoSrc: `${LOGO_BASE}/Bhagat-Tarachand-Logo.png`, scale: 1.9 },
  { name: "Flite", logoSrc: `${LOGO_BASE}/Flite%20Logo%202.png` },
  { name: "Nissan", logoSrc: `${LOGO_BASE}/nissan%20white.png` },
  {
    name: "Purple",
    logoSrc: `${LOGO_BASE}/WhatsApp%20Image%202026-10-13%20at%2012.28.52%20AM.png`,
  },
  {
    name: "FinX Commune",
    logoSrc: `${LOGO_BASE}/finx-commune-mumbai-coffee-shops-cq3zg9sno7.png`,
    scale: 2.0,
  },
  { name: "YouMee", logoSrc: `${LOGO_BASE}/youmee%20white.png` },
  { name: "Afnan", logoSrc: `${LOGO_BASE}/afnan%20white.png`, scale: 1.4 },
  { name: "PTAT", logoSrc: `${LOGO_BASE}/Artboard%201mdpi.png` },
  {
    name: "Bagicha Wilderness",
    logoSrc: `${LOGO_BASE}/2deb51_97abfe7fbd754b4ca65f7bdb041c9670~mv2.png`,
    scale: 1.4,
  },
];

export default function ClientReel() {
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      let animationFrame: number | null = null;
      let resumeTimer: number | null = null;
      let pointerId: number | null = null;
      let startX = 0;
      let startScrollLeft = 0;
      let dragging = false;

      const startAutoScroll = () => {
        const loopWidth = viewport.scrollWidth / 2;
        if (loopWidth <= 0) return;
        viewport.scrollLeft %= loopWidth;
        const start = viewport.scrollLeft;
        const duration = (50 * (loopWidth - start)) / loopWidth;
        const startedAt = performance.now();

        const animate = (now: number) => {
          const progress = Math.min((now - startedAt) / (duration * 1000), 1);
          viewport.scrollLeft = start + (loopWidth - start) * progress;
          if (progress === 1) {
            viewport.scrollLeft = 0;
            startAutoScroll();
          } else {
            animationFrame = window.requestAnimationFrame(animate);
          }
        };

        animationFrame = window.requestAnimationFrame(animate);
      };

      const stopAutoScroll = () => {
        if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
      };

      const scheduleAutoScroll = () => {
        if (resumeTimer !== null) window.clearTimeout(resumeTimer);
        resumeTimer = window.setTimeout(() => {
          resumeTimer = null;
          startAutoScroll();
        }, 5000);
      };

      const onWheel = (event: WheelEvent) => {
        if (event.deltaX === 0 && event.deltaY === 0) return;
        stopAutoScroll();
        event.preventDefault();
        viewport.scrollLeft += event.deltaX || event.deltaY;
        scheduleAutoScroll();
      };

      const onTouchStart = () => {
        stopAutoScroll();
        if (resumeTimer !== null) {
          window.clearTimeout(resumeTimer);
          resumeTimer = null;
        }
      };
      const onTouchEnd = (event: TouchEvent) => {
        if (event.touches.length > 0) return;
        scheduleAutoScroll();
      };

      const onPointerDown = (event: PointerEvent) => {
        if (event.pointerType !== "mouse" || event.button !== 0) return;
        pointerId = event.pointerId;
        startX = event.clientX;
        startScrollLeft = viewport.scrollLeft;
        dragging = false;
      };

      const onPointerMove = (event: PointerEvent) => {
        if (event.pointerId !== pointerId) return;
        const distance = event.clientX - startX;
        if (!dragging && Math.abs(distance) < 5) return;
        if (!dragging) {
          dragging = true;
          stopAutoScroll();
          if (resumeTimer !== null) {
            window.clearTimeout(resumeTimer);
            resumeTimer = null;
          }
          viewport.setPointerCapture(event.pointerId);
        }
        event.preventDefault();
        viewport.scrollLeft = startScrollLeft - distance;
      };

      const onPointerUp = (event: PointerEvent) => {
        if (event.pointerId !== pointerId) return;
        if (viewport.hasPointerCapture(event.pointerId)) {
          viewport.releasePointerCapture(event.pointerId);
        }
        pointerId = null;
        if (dragging) scheduleAutoScroll();
        dragging = false;
      };

      startAutoScroll();
      viewport.addEventListener("wheel", onWheel, { passive: false });
      viewport.addEventListener("touchstart", onTouchStart, { passive: true });
      viewport.addEventListener("touchend", onTouchEnd);
      viewport.addEventListener("touchcancel", onTouchEnd);
      viewport.addEventListener("pointerdown", onPointerDown);
      viewport.addEventListener("pointermove", onPointerMove);
      viewport.addEventListener("pointerup", onPointerUp);
      viewport.addEventListener("pointercancel", onPointerUp);

      return () => {
        stopAutoScroll();
        if (resumeTimer !== null) window.clearTimeout(resumeTimer);
        viewport.removeEventListener("wheel", onWheel);
        viewport.removeEventListener("touchstart", onTouchStart);
        viewport.removeEventListener("touchend", onTouchEnd);
        viewport.removeEventListener("touchcancel", onTouchEnd);
        viewport.removeEventListener("pointerdown", onPointerDown);
        viewport.removeEventListener("pointermove", onPointerMove);
        viewport.removeEventListener("pointerup", onPointerUp);
        viewport.removeEventListener("pointercancel", onPointerUp);
      };
    });

    return () => media.revert();
  }, []);

  return (
    <div className="relative bg-[radial-gradient(ellipse_at_50%_35%,rgba(245,166,35,0.1),transparent_65%),#080706] py-10 border-b border-amber/20">
      <div className="mb-8 px-[5%] pt-16">
        <Reveal>
          <h2 className="group cursor-default font-display uppercase text-[clamp(24px,3.5vw,40px)] leading-none text-paper [-webkit-text-stroke:1px_rgba(245,166,35,0.6)] hover:text-amber hover:[-webkit-text-stroke:1px_#F5A623] transition-all duration-500">
            Brands we&apos;ve worked with
          </h2>
        </Reveal>
      </div>

      {/* the actual filmstrip object */}
      <div className="relative bg-[radial-gradient(ellipse_at_center,rgba(245,166,35,0.12),transparent_68%),linear-gradient(90deg,#090909,#17120b_50%,#090909)] overflow-hidden">
        {/* top perforation row */}
        <div className="film-sprockets" />

        <div
          ref={viewportRef}
          aria-label="Brands we've worked with"
          className="client-reel-viewport relative overflow-x-auto overflow-y-hidden py-3 motion-reduce:overflow-visible"
        >
          <div
            className="flex w-max motion-reduce:w-full motion-reduce:flex-wrap"
          >
            {[false, true].map((isDuplicate) => (
              <div
                key={String(isDuplicate)}
                aria-hidden={isDuplicate || undefined}
                className={`flex shrink-0 items-center motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center ${
                  isDuplicate ? "motion-reduce:hidden" : ""
                }`}
              >
                {clients.map((client) => (
                  <div key={client.name} className="flex-shrink-0">
                    {/* the film frame itself */}
                    <div className="relative bg-black border-[10px] border-[#1c1409] shadow-[0_0_28px_rgba(245,166,35,0.12)] w-[300px] md:w-[340px] aspect-[4/3]">
                      <div
                        className={`w-full h-full relative overflow-hidden flex items-center justify-center ${
                          client.onLight
                            ? "bg-paper"
                            : "bg-[radial-gradient(ellipse_at_center,rgba(245,166,35,0.12),rgba(10,10,10,0.96)_72%)]"
                        }`}
                      >
                        {client.logoSrc ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={client.logoSrc}
                            alt={isDuplicate ? "" : client.name}
                            loading="lazy"
                            className="w-auto h-auto object-contain max-w-[70%] max-h-[60%] drop-shadow-[0_0_18px_rgba(245,166,35,0.24)]"
                            style={{ transform: `scale(${client.scale ?? 1})` }}
                          />
                        ) : (
                          <NeedsContent
                            label={`CLIENT ASSET — ${client.name} logo`}
                            className="w-full h-full"
                          />
                        )}
                      </div>
                      {/* subtle inner vignette to sell the "film still" feel */}
                      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* bottom perforation row */}
        <div className="film-sprockets" />
      </div>
    </div>
  );
}