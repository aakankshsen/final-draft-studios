"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  "Brand Films",
  "Wedding Films",
  "Short Films",
  "Editing",
  "Colour Grading",
  "Motion Titles",
  "Photography",
  "Social Content",
];

export default function Contact() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0.15, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 90%",
            end: "top 50%",
            scrub: 0.5,
          },
        }
      );
    }

    if (tagsRef.current) {
      const tags = tagsRef.current.children;
      gsap.fromTo(
        tags,
        { opacity: 0.15, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: tagsRef.current,
            start: "top 90%",
            end: "top 65%",
            scrub: 0.5,
          },
        }
      );
    }
  }, []);

  return (
    <section id="contact" className="px-[5%] py-40">
      <div className="flex justify-between gap-10 flex-wrap mb-16">
        <h2
          ref={headingRef}
          className="group cursor-default font-display uppercase text-[clamp(34px,6vw,72px)] leading-[0.95] max-w-2xl text-paper [-webkit-text-stroke:1px_rgba(245,166,35,0.6)] hover:text-amber hover:[-webkit-text-stroke:1px_#F5A623] transition-all duration-500"
        >
          Let&apos;s make
          <br />
          something worth
          <br />
          watching.
        </h2>
        <div className="flex flex-col gap-2.5 items-start">
          <a href="mailto:hello@finaldraftstudios.co" className="text-lg border-b border-amber text-amber pb-1">
            hello@finaldraftstudios.co
          </a>
          <a href="#" className="text-lg border-b border-amber text-amber pb-1">
            WhatsApp us
          </a>
        </div>
      </div>

      <div ref={tagsRef} className="flex flex-wrap gap-2.5 mb-16">
        {services.map((s) => (
          <span
            key={s}
            className="text-xs tracking-wide uppercase border border-white/10 px-4 py-2.5 rounded-full text-amber"
          >
            {s}
          </span>
        ))}
      </div>

      <footer className="flex justify-between items-center flex-wrap gap-3 pt-10 border-t border-white/10 text-dim text-xs">
        <div className="flex items-center gap-2.5">
          <Image src="/logo/icon-white.png" alt="" width={22} height={22} className="opacity-70" />
          <span>© Final Draft Studios — Mumbai</span>
        </div>
        <div className="font-mono">HOMEPAGE — V1</div>
      </footer>
    </section>
  );
}