"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";
import { services } from "@/data/services";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Deliverables() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { y: 28, scale: 0.96, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.55,
            delay: i * 0.04,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="deliverables" className="px-[5%] py-24 md:py-32 border-b border-white/10">
      <Reveal className="mb-12 text-center">
        <h2 className="group cursor-default font-display uppercase text-[clamp(30px,4.5vw,52px)] leading-none text-paper [-webkit-text-stroke:1px_rgba(245,166,35,0.6)] hover:text-amber hover:[-webkit-text-stroke:1px_#F5A623] transition-all duration-500">
          What we
          <br />
          deliver
        </h2>
      </Reveal>

      <div className="mx-auto max-w-3xl">
        {services.map((service, i) => (
          <div
            key={service}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            className="border-t border-white/10 last:border-b py-5"
          >
            <h3 className="flex items-center justify-center gap-3 text-center font-semibold text-lg text-paper">
              <ArrowUpRight size={16} className="text-amber shrink-0" />
              {service}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}