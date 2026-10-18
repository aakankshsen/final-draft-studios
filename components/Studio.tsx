"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";
import NeedsContent from "@/components/NeedsContent";

gsap.registerPlugin(ScrollTrigger);

export default function Studio() {
  const assetRef = useRef<HTMLDivElement>(null);

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
            <NeedsContent
              label="CLIENT ASSET — Team/BTS photo"
              className="w-full h-[400px] sm:h-[500px] md:h-[600px]"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
