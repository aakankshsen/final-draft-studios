"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ArrowTransition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const arrowWrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !arrowWrapRef.current || !textRef.current) return;

    const section = sectionRef.current;
    let handleTouchScroll: (() => void) | undefined;
    const ctx = gsap.context(() => {
      const isTouch =
        ScrollTrigger.isTouch ||
        window.matchMedia("(pointer: coarse)").matches ||
        navigator.maxTouchPoints > 0;
      const tl = gsap.timeline(
        isTouch
          ? { paused: true }
          : {
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=150%",
                scrub: 0.6,
                pin: true,
                invalidateOnRefresh: true,
              },
            }
      );

      tl.fromTo(
        textRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -40, duration: isTouch ? 0.7 : 1, ease: isTouch ? "power2.inOut" : "none" },
        0
      );

      if (isTouch) {
        tl.fromTo(
          arrowWrapRef.current,
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power2.inOut" },
          0.1
        ).to(
          arrowWrapRef.current,
          { scale: 1.7, opacity: 0, duration: 0.7, ease: "power2.inOut", transformOrigin: "center" },
          0.75
        );

        handleTouchScroll = () => {
          const bounds = section.getBoundingClientRect();
          const isInView = bounds.top < window.innerHeight * 0.8 && bounds.bottom > window.innerHeight * 0.2;

          if (isInView) {
            tl.play();
          } else if (bounds.top >= window.innerHeight) {
            tl.reverse();
          }
        };
        window.addEventListener("scroll", handleTouchScroll, { passive: true });
        handleTouchScroll();
      } else {
        tl.fromTo(
          arrowWrapRef.current,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "none" },
          0.1
        ).fromTo(
          arrowWrapRef.current,
          { scale: 1, opacity: 1 },
          { scale: 1.7, opacity: 0, ease: "none", transformOrigin: "center" },
          0.75
        );
      }
    }, sectionRef);

    return () => {
      if (handleTouchScroll) {
        window.removeEventListener("scroll", handleTouchScroll);
      }
      ctx.revert();
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative h-screen bg-ink overflow-hidden flex items-center justify-center">
      <div ref={textRef} className="absolute top-1/3 left-1/2 -translate-x-1/2 text-center px-6">
        <div className="font-mono text-xs tracking-[3px] uppercase text-amber mb-4">
          Final Draft Studios
        </div>
        <h3 className="font-display uppercase text-[clamp(28px,5vw,56px)] text-paper leading-tight">
          CUT THE NOISE
          <br />
          
        </h3>
      </div>

      <div ref={arrowWrapRef} className="relative z-10">
        <Image src="/logo/arrow-white.png" alt="" width={130} height={130} priority />
      </div>
    </div>
  );
}