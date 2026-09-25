"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";
import NeedsContent from "@/components/NeedsContent";


gsap.registerPlugin(ScrollTrigger);

const clients = [
  { name: "Lakmē", label: "CLIENT ASSET — Lakmē logo / teaser", logoSrc: "/logos/lakme.jpg" },
  { name: "Nissan", label: "CLIENT ASSET — Nissan logo / teaser", logoSrc: "/logos/nissan.png" },
  { name: "Sparx", label: "CLIENT ASSET — Sparx logo / teaser", logoSrc: "/logos/sparx.png" },
  { name: "Bering Watches", label: "CLIENT ASSET — Bering logo / teaser", logoSrc: "/logos/bering.png" },
  { name: "Afnan Perfumes", label: "CLIENT ASSET — Afnan logo / teaser", logoSrc: "/logos/afnan.png" },
  { name: "Relaxo", label: "CLIENT ASSET — Relaxo logo / teaser", logoSrc: "/logos/relaxo.png" },
];

export default function ClientReel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const scrollDistance = () =>
        track.scrollWidth - window.innerWidth + window.innerWidth * 0.05;

      gsap.to(track, {
        x: () => -scrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollDistance()}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-black py-10 border-b border-white/10">
            <div className="mb-8 px-[5%] pt-16">
        <Reveal>
          <h2 className="group cursor-default font-display uppercase text-[clamp(24px,3.5vw,40px)] leading-none text-paper hover:text-amber transition-colors duration-500">
            Brands we&apos;ve worked with
          </h2>
        </Reveal>
      </div>

      {/* the actual filmstrip object */}
      <div className="relative bg-[#111] overflow-hidden">
        {/* top perforation row */}
        <div className="film-sprockets" />

        <div className="relative overflow-hidden py-3">
          <div ref={trackRef} className="flex items-center gap-3 pl-[5%] pr-[15vw] w-max">
            {clients.map((client, i) => (
              <div key={client.name} className="flex-shrink-0 flex items-center gap-3">
                {/* frame number, like real film edge printing */}
                <div className="font-mono text-[10px] text-white/25 rotate-90 origin-center w-4 text-center select-none">
                  {String(i + 1).padStart(2, "0")}
                </div>

                                {/* the film frame itself */}
                <div className="relative bg-black border-[10px] border-[#0a0a0a] w-[300px] md:w-[340px] aspect-[4/3]">
                  <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
                    {client.logoSrc ? (
                      <Image
                        src={client.logoSrc}
                        alt={client.name}
                        width={200}
                        height={100}
                        className="object-contain max-w-[70%] max-h-[60%]"
                      />
                    ) : (
                      <NeedsContent label={client.label} className="w-full h-full" />
                    )}
                  </div>
                  {/* subtle inner vignette to sell the "film still" feel */}
                  <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* bottom perforation row */}
        <div className="film-sprockets" />
      </div>

      <div className="mt-4 px-[5%] flex justify-end">
        <div className="font-mono text-[11px] tracking-widest text-dim">SCROLL TO EXPLORE →</div>
      </div>
    </div>
  );
}