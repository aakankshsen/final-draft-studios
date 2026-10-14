"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis();
    let animationFrame = 0;
    let hashFrame = 0;

    function raf(time: number) {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    }
    animationFrame = requestAnimationFrame(raf);

    if (window.location.hash) {
      hashFrame = requestAnimationFrame(() => {
        hashFrame = requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          const targetId = decodeURIComponent(window.location.hash.slice(1));
          const target = document.getElementById(targetId);
          if (target) lenis.scrollTo(target, { immediate: true });
        });
      });
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      cancelAnimationFrame(hashFrame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}