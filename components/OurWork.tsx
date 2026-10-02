"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { slug: "lakme", name: "Lakmē", category: "Ad Film", description: "A sun-care campaign shot across three locations, blending product beauty shots with lifestyle film.", image: "/work-lakme.jpg" },
  { slug: "nissan", name: "Nissan", category: "Brand Film", description: "A cinematic brand film capturing precision engineering through dynamic motion and light.", image: "/work-nissan.jpg" },
  { slug: "sparx", name: "Sparx", category: "UGC / Social", description: "A fast-paced social campaign built for scroll-stopping reach across Instagram and YouTube Shorts.", image: "/work-sparx.jpg" },
  { slug: "bering", name: "Bering Watches", category: "Product Film", description: "A quiet, detail-driven product film highlighting craftsmanship frame by frame.", image: "/work-bering.jpg" },
  { slug: "afnan", name: "Afnan Perfumes", category: "Brand Campaign", description: "A sensorial campaign translating scent into visual rhythm and mood.", image: "/work-afnan.jpg" },
];

export default function OurWork() {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

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

      gsap.set(track.querySelectorAll<HTMLElement>("[data-carousel-card]"), {
        clearProps: "transform,opacity,visibility",
      });
      gsap.set(track, { x: -firstSlot.offsetWidth });
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
    const targetX = direction > 0 ? -slotWidth * 2 : 0;
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
    <section ref={sectionRef} className="relative min-h-screen md:h-screen md:min-h-[620px] flex flex-col justify-center bg-ink overflow-hidden px-[4%] md:px-[2%] py-10 md:py-8 opacity-0 translate-y-28 scale-[0.86]">
      {/* See All — top right */}
      <Link
        href="/work"
        className="absolute top-6 right-[5%] z-20 group flex items-center gap-2 text-amber text-xs tracking-widest uppercase border border-amber/60 px-5 py-2.5 rounded-full hover:bg-amber hover:text-ink transition-colors"
      >
        See All
        <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>

      <div className="text-center mb-6">
        <div className="font-mono text-xs tracking-[3px] uppercase text-amber mb-3">
          Our Work
        </div>
        <h2 className="font-display uppercase text-[clamp(28px,4vw,48px)] text-paper leading-none">
          Selected Projects
        </h2>
      </div>

      {/* carousel */}
      <div ref={carouselRef} className="relative w-full overflow-hidden">
        <div ref={trackRef} className="flex w-full">
        {[-2, -1, 0, 1, 2].map((offset, slot) => {
          const project = getProject(offset);
          const isCenter = offset === 0;

          return (
            <div key={slot} className="relative flex-none w-full px-2 md:w-1/3 md:px-3">
              <Link
                data-carousel-card
                href={`/work/${project.slug}`}
                className={isCenter
                  ? "group relative block w-full aspect-[9/16] md:aspect-[4/3] shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                  : "group relative block w-full aspect-[9/16] md:aspect-[4/3] opacity-35 scale-90 hover:opacity-55 transition-opacity"}
              >
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className={`object-cover transition-transform duration-700 group-hover:scale-105 ${isCenter ? "rounded-2xl" : "rounded-xl"}`}
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent ${isCenter ? "rounded-2xl" : "rounded-xl"}`} />
                {!isCenter && (
                  <div className="absolute inset-x-3 bottom-3 md:inset-x-5 md:bottom-5">
                    <div className="font-mono text-[10px] tracking-wide uppercase text-amber">{project.category}</div>
                    <div className="font-display uppercase text-paper text-sm md:text-lg">{project.name}</div>
                  </div>
                )}
                {isCenter && (
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-amber/40 group-hover:ring-amber transition-all" />
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