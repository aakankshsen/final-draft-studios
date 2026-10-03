"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const headingRef = useRef<HTMLHeadingElement>(null);

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
  }, []);

  return (
    <section id="contact" className="px-[5%] py-28">
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

<<<<<<< HEAD
      <div ref={tagsRef} className="flex flex-wrap gap-2.5 mb-16">
        {services.map((s) => (
          <span
            key={s}
            className="text-xs tracking-wide uppercase border border-white/10 px-4 py-2.5 rounded-full text-amber"
=======
      <div className="mb-16">
        <a
          href="https://www.instagram.com/finaldraftstudios"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 text-amber hover:text-paper transition-colors duration-300"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
>>>>>>> origin/swarna
          >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
          </svg>
          <span className="font-mono text-sm">@finaldraftstudios</span>
        </a>
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