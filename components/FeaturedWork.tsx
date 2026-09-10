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
    assetLabel: "CLIENT ASSET — Featured project 1",
  },
  {
    category: "Wedding Film",
    name: "Project Name — Lorem Ipsum",
    assetLabel: "CLIENT ASSET — Featured project 2",
  },
  {
    category: "Brand Campaign",
    name: "Project Name — Lorem Ipsum",
    assetLabel: "CLIENT ASSET — Featured project 3",
  },
  {
    category: "Short Film",
    name: "Project Name — Lorem Ipsum",
    assetLabel: "CLIENT ASSET — Featured project 4",
  },
];

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;

      const setupScroll = () => {
        const scrollDistance = track.scrollWidth - window.innerWidth + window.innerWidth * 0.05;

        gsap.to(track, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            scrub: 0.6,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      };

      setupScroll();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <div ref={sectionRef} className="relative h-screen overflow-hidden border-b border-white/10">
        <div className="absolute top-16 left-[5%] z-20">
          <Reveal>
            <h2 className="font-display uppercase text-[clamp(30px,4.5vw,52px)] leading-none">
              A selection
              <br />
              of our work
            </h2>
          </Reveal>
        </div>

        <div
          ref={trackRef}
          className="absolute top-0 left-0 h-full flex items-center gap-6 pl-[5%] pr-[10vw]"
          style={{ willChange: "transform" }}
        >
          {projects.map((project) => (
            <div
              key={project.name}
              className="group cursor-pointer flex-shrink-0 w-[70vw] md:w-[32vw]"
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

        <div className="absolute bottom-8 right-[5%] z-20 font-mono text-[11px] tracking-widest text-dim">
          SCROLL TO EXPLORE →
        </div>
      </div>

      <section id="work" className="px-[5%] py-32 text-center border-b border-white/10">
        <Reveal>
          <p className="text-dim text-[clamp(20px,2.6vw,30px)] mb-6">
            Got a story worth putting on camera?
          </p>
          <a href="#contact" className="group inline-flex items-center gap-2 border-b border-amber text-amber text-sm tracking-widest uppercase pb-1.5">
            <span>Let&apos;s talk</span>
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </section>
    </div>
  );
}