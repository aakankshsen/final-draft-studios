"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";
import NeedsContent from "@/components/NeedsContent";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    category: "Ad Film",
    name: "Project Name — Lorem Ipsum",
    assetLabel: "CLIENT ASSET — Featured project 1 (image/video)",
  },
  {
    category: "Wedding Film",
    name: "Project Name — Lorem Ipsum",
    assetLabel: "CLIENT ASSET — Featured project 2 (image/video)",
  },
];

export default function FeaturedWork() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardRefs.current.forEach((card) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { scale: 0.82, opacity: 0.5 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
            end: "top 55%",
            scrub: 0.6,
          },
        }
      );
    });
  }, []);

  return (
    <section id="work" className="px-[5%] py-40 border-b border-white/10">
      <Reveal className="flex justify-between items-end flex-wrap gap-5 mb-12">
        <h2 className="font-display uppercase text-[clamp(30px,4.5vw,52px)] leading-none">
          A selection
          <br />
          of our work
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <div
            key={project.name}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <NeedsContent label={project.assetLabel} className="absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-[1]" />
              <div className="absolute bottom-0 left-0 p-6 z-[2]">
                <div className="font-mono text-[11px] tracking-wide uppercase text-amber mb-1.5">
                  {project.category}
                </div>
                <div className="text-xl font-semibold text-paper">{project.name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Reveal className="text-center pt-24">
        <p className="text-dim text-[clamp(20px,2.6vw,30px)] mb-6">
          Got a story worth putting on camera?
        </p>
        <a href="#contact" className="group inline-flex items-center gap-2 border-b border-amber text-amber text-sm tracking-widest uppercase pb-1.5">
          <span>Let&apos;s talk</span>
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </Reveal>
    </section>
  );
}