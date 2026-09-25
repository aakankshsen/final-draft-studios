"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";
import NeedsContent from "@/components/NeedsContent";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  "Brand & Ad Films",
  "Wedding Films",
  "Short Films & Documentaries",
  "Editing & Post-Production",
  "Motion Titles & Graphics",
  "Colour Grading",
  "Photography",
  "UGC & Social Content",
];

export default function Deliverables() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    rowRefs.current.forEach((row) => {
      if (!row) return;
      gsap.fromTo(
        row,
        { x: -24, opacity: 0.25 },
        {
          x: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top 92%",
            end: "top 65%",
            scrub: 0.5,
          },
        }
      );
    });
  }, []);

  return (
    <section id="deliverables" className="px-[5%] py-40 border-b border-white/10">
      <Reveal className="mb-12">
       <h2 className="group cursor-default font-display uppercase text-[clamp(30px,4.5vw,52px)] leading-none text-paper [-webkit-text-stroke:1px_rgba(245,166,35,0.6)] hover:text-amber hover:[-webkit-text-stroke:1px_#F5A623] transition-all duration-500">
          What we
          <br />
          deliver
        </h2>
      </Reveal>

      <div className="flex flex-col md:flex-row gap-14">
        <div className="flex-1 min-w-[280px]">
          {services.map((service, i) => (
            <div
              key={service}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              className="border-t border-white/10 last:border-b py-5"
            >
              <h3 className="flex items-center gap-3 font-semibold text-lg text-paper">
                <ArrowUpRight size={16} className="text-amber shrink-0" />
                {service}
              </h3>
            </div>
          ))}
        </div>

        <Reveal className="flex-1 min-w-[280px]">
          <NeedsContent
            label="CLIENT ASSET — supporting reel/photo"
            className="aspect-[4/5] sticky top-32"
          />
        </Reveal>
      </div>
    </section>
  );
}