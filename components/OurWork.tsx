"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { slug: "lakme", name: "Lakmē Sun Expert", category: "Ad Film", description: "A sun-care campaign shot across three locations, blending product beauty shots with lifestyle film.", image: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Lakme%20Sun%20Expert/Lakme-tint-(model)1505.jpg" },
  { slug: "nissan", name: "Nissan", category: "Brand Film", description: "A cinematic brand film capturing precision engineering through dynamic motion and light.", image: "/work-nissan.jpg" },
  { slug: "sparx", name: "Sparx", category: "UGC / Social", description: "A fast-paced social campaign built for scroll-stopping reach across Instagram and YouTube Shorts.", image: "/work-sparx.jpg" },
  { slug: "bering", name: "Bering Watches", category: "Product Film", description: "A quiet, detail-driven product film highlighting craftsmanship frame by frame.", image: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Bering%20Watches/DSC00219.png" },
  { slug: "afnan", name: "Afnan Perfumes", category: "Brand Campaign", description: "A sensorial campaign translating scent into visual rhythm and mood.", image: "/work-afnan.jpg" },
];

export default function OurWork() {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const suppressClickRef = useRef(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { autoAlpha: 0, y: 120, scale: 0.86 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => context.revert();
  }, []);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const resetTrack = () => {
      const firstSlot = track.firstElementChild as HTMLElement | null;
      if (!firstSlot) return;
      const centerOffset = window.matchMedia("(min-width: 768px)").matches ? 1 : 2;

      gsap.set(track.querySelectorAll<HTMLElement>("[data-carousel-card]"), {
        clearProps: "transform,opacity,visibility",
      });
      gsap.set(track, { x: -firstSlot.offsetWidth * centerOffset });
      isAnimatingRef.current = false;
    };

    const handleResize = () => {
      if (!isAnimatingRef.current) resetTrack();
    };

    resetTrack();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [index]);

  const shiftCarousel = (direction: number) => {
    const track = trackRef.current;
    if (!track || isAnimatingRef.current || projects.length < 2) return;

    const getCardAt = (slot: number) =>
      track.children.item(slot)?.querySelector<HTMLElement>("[data-carousel-card]") ?? null;
    const leavingCard = getCardAt(direction > 0 ? 1 : 3);
    const centerCard = getCardAt(2);
    const incomingSideCard = getCardAt(direction > 0 ? 3 : 1);
    const enteringCard = getCardAt(direction > 0 ? 4 : 0);
    const firstSlot = track.firstElementChild as HTMLElement | null;

    if (!leavingCard || !centerCard || !incomingSideCard || !enteringCard || !firstSlot) return;

    isAnimatingRef.current = true;
    const slotWidth = firstSlot.offsetWidth;
    const centerOffset = window.matchMedia("(min-width: 768px)").matches ? 1 : 2;
    const targetX = -slotWidth * (centerOffset + direction);
    const timeline = gsap.timeline({
      onComplete: () => {
        setIndex((i) => (i + direction + projects.length) % projects.length);
      },
    });

    timeline
      .to(track, { x: targetX, duration: 0.65, ease: "power2.inOut" }, 0)
      .to(centerCard, { scale: 0.9, opacity: 0.35, duration: 0.65, ease: "power2.inOut" }, 0)
      .to(incomingSideCard, { scale: 1, opacity: 1, duration: 0.65, ease: "power2.inOut" }, 0)
      .to(leavingCard, { scale: 0.72, opacity: 0, duration: 0.65, ease: "power2.in" }, 0)
      .fromTo(
        enteringCard,
        { scale: 0.72, opacity: 0 },
        { scale: 0.9, opacity: 0.35, duration: 0.65, ease: "power2.out" },
        0
      );
  };

  const prev = () => shiftCarousel(-1);
  const next = () => shiftCarousel(1);

  const getProject = (offset: number) => {
    const i = (index + offset + projects.length) % projects.length;
    return projects[i];
  };

  const current = getProject(0);

  return (
    <section id="work" ref={sectionRef} className="relative min-h-screen md:h-screen md:min-h-[620px] flex flex-col justify-center bg-ink overflow-hidden px-[4%] md:px-[2%] py-10 md:py-8 opacity-0 translate-y-28 scale-[0.86]">
      {/* See All — top right */}
      <Link
        href="/work"
        className="relative z-20 mb-4 self-end group flex items-center gap-2 text-amber text-xs tracking-widest uppercase border border-amber/60 px-5 py-2.5 rounded-full hover:bg-amber hover:text-ink transition-colors md:absolute md:top-6 md:right-[5%] md:mb-0"
      >
        See All
        <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>

      <div className="text-center mb-6">
        <div className="font-mono text-xs tracking-[3px] uppercase text-amber mb-3">
          Highlight
        </div>
        <h2 className="font-display uppercase text-[clamp(28px,4vw,48px)] text-paper leading-none">
          Our Recent Work
        </h2>
      </div>

      {/* carousel */}
      <div
        ref={carouselRef}
        className="relative w-full overflow-hidden md:overflow-visible touch-pan-y"
        onTouchStart={(event) => {
          const touch = event.touches[0];
          if (!touch) return;
          touchStartRef.current = { x: touch.clientX, y: touch.clientY };
        }}
        onTouchEnd={(event) => {
          const start = touchStartRef.current;
          const touch = event.changedTouches[0];
          touchStartRef.current = null;
          if (!start || !touch) return;
          const deltaX = touch.clientX - start.x;
          const deltaY = touch.clientY - start.y;
          if (Math.abs(deltaX) < 40 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.2) return;
          suppressClickRef.current = true;
          window.setTimeout(() => {
            suppressClickRef.current = false;
          }, 400);
          if (deltaX < 0) next();
          else prev();
        }}
        onTouchCancel={() => {
          touchStartRef.current = null;
        }}
        onClickCapture={(event) => {
          if (!suppressClickRef.current) return;
          event.preventDefault();
          event.stopPropagation();
          suppressClickRef.current = false;
        }}
      >
        <div ref={trackRef} className="flex w-full">
        {[-2, -1, 0, 1, 2].map((offset, slot) => {
          const project = getProject(offset);
          const isCenter = offset === 0;

          return (
            <div key={slot} className="relative flex-none w-full px-2 sm:w-4/5 md:w-1/3 md:px-3">
              <Link
                data-carousel-card
                href={`/work/${project.slug}`}
                className={isCenter
                  ? "group relative block w-full aspect-[4/5] md:aspect-[4/3] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-out hover:z-10 hover:scale-[1.04]"
                  : "group relative block w-full aspect-[4/5] md:aspect-[4/3] overflow-hidden opacity-35 scale-90 hover:opacity-55 transition-opacity"}
              >
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className={`object-cover transition-[filter,transform] duration-700 ease-out ${isCenter ? "group-hover:brightness-110 group-hover:saturate-110 rounded-2xl" : "group-hover:scale-105 rounded-xl"}`}
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent ${isCenter ? "rounded-2xl" : "rounded-xl"}`} />
                {!isCenter && (
                  <div className="absolute inset-x-3 bottom-3 md:inset-x-5 md:bottom-5">
                    <div className="font-mono text-[10px] tracking-wide uppercase text-amber">{project.category}</div>
                    <div className="font-display uppercase text-paper text-sm md:text-lg">{project.name}</div>
                  </div>
                )}
              </Link>
            </div>
          );
        })}
        </div>
      </div>

      {/* description */}
      <div className="text-center max-w-md mx-auto mt-5 md:mt-4">
        <div className="font-mono text-[11px] tracking-wide uppercase text-amber mb-2">
          {current.category}
        </div>
        <h3 className="text-xl font-semibold text-paper mb-2">{current.name}</h3>
        <p className="text-dim text-sm leading-relaxed">{current.description}</p>
      </div>

      {/* arrows */}
      <div className="flex items-center justify-center gap-6 mt-5">
        <button
          onClick={prev}
          aria-label="Previous project"
          className="w-11 h-11 rounded-full border border-amber text-amber flex items-center justify-center hover:bg-amber hover:text-ink transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          aria-label="Next project"
          className="w-11 h-11 rounded-full border border-amber text-amber flex items-center justify-center hover:bg-amber hover:text-ink transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}