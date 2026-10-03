"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const textLines = [
  "WE THINK BIG. WE MAKE BIGGER.",
  "Sharp creative direction. High-production value.",
  "Fast turnaround. No compromise on the final draft.",
];

export default function Vision() {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const words = containerRef.current.querySelectorAll(".word");

    gsap.fromTo(
      words,
      { opacity: 0.15, color: "#6b6b6b" },
      {
        keyframes: {
          "0%": { opacity: 0.15, color: "#6b6b6b" },
          "50%": { opacity: 1, color: "#F5A623" },
          "100%": { opacity: 1, color: "#EDEAE0" },
        },
        stagger: 0.04,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 40%",
          scrub: 0.5,
        },
      }
    );
  }, []);

  return (
    <section className="px-[5%] py-28 border-b border-white/10">
      <div className="text-xs tracking-[3px] uppercase text-amber mb-6">Our Approach</div>
      <p
        ref={containerRef}
        className="font-display font-extrabold uppercase text-[clamp(24px,4vw,44px)] leading-[1.15] max-w-4xl [-webkit-text-stroke:1px_rgba(245,166,35,0.6)]"
      >
        {textLines.map((line, lineIndex) => (
          <span key={lineIndex} className="block">
            {line.split(" ").map((word, i) => (
              <span key={`${lineIndex}-${i}`} className="word inline-block mr-[0.25em]">
                {word}
              </span>
            ))}
          </span>
        ))}
      </p>
    </section>
  );
}