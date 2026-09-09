"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const text =
  "Anyone can point a camera. Directing is the difference. We chase the frame that makes someone stop scrolling — then we cut it together like it matters, because it does.";

export default function Vision() {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const words = containerRef.current.querySelectorAll(".word");

    gsap.fromTo(
      words,
      { opacity: 0.15 },
      {
        opacity: 1,
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
    <section className="px-[5%] py-40 border-b border-white/10">
      <div className="text-xs tracking-[3px] uppercase text-amber mb-6">Our Approach</div>
      <p
        ref={containerRef}
        className="font-display uppercase text-[clamp(24px,4vw,44px)] leading-[1.15] max-w-4xl"
      >
        {text.split(" ").map((word, i) => (
          <span key={i} className="word inline-block mr-[0.25em]">
            {word}
          </span>
        ))}
      </p>
      <p className="font-mono text-xs text-dim mt-5">
        COPY — Replace with studio&apos;s actual point of view / philosophy line
      </p>
    </section>
  );
}