"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";
import NeedsContent from "@/components/NeedsContent";

gsap.registerPlugin(ScrollTrigger);

export default function Studio() {
  const photo1Ref = useRef<HTMLDivElement>(null);
  const photo2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    [photo1Ref.current, photo2Ref.current].forEach((el, i) => {
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
            scrub: 0.5 + i * 0.2,
          },
        }
      );
    });
  }, []);

  return (
    <section id="studio" className="px-[5%] py-40 border-b border-white/10">
      <Reveal className="mb-12">
        <h2 className="group cursor-default font-display uppercase text-[clamp(30px,4.5vw,52px)] leading-none hover:text-amber transition-colors duration-500">
          <br />
          studio
        </h2>
      </Reveal>

      <Reveal className="flex flex-wrap gap-14 items-center">
        <div className="flex-1 min-w-[300px]">
          <p className="text-dim text-base max-w-[480px] leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="font-mono text-xs text-dim mt-3">
            COPY — About the studio/team, written in client&apos;s voice
          </p>
        </div>

        <div className="flex-1 min-w-[300px] grid grid-cols-2 gap-4">
          <div ref={photo1Ref}>
            <NeedsContent label="CLIENT ASSET — Team/BTS photo 1" className="aspect-[3/4]" />
          </div>
          <div ref={photo2Ref} className="mt-10">
            <NeedsContent label="CLIENT ASSET — Team/BTS photo 2" className="aspect-[3/4]" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}