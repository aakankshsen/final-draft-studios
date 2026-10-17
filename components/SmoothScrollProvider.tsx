"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const isAssetTarget = (target: EventTarget | null) => {
  if (!(target instanceof Element)) return false;
  if (target.closest("img, video, audio, svg")) return true;

  const href = target.closest("a[href]")?.getAttribute("href");
  return Boolean(href && /\.(avif|gif|jpe?g|mp4|png|svg|webm|webp)(?:$|[?#])/i.test(href));
};

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

  return (
    <div
      className="contents"
      onContextMenuCapture={(event) => {
        if (isAssetTarget(event.target)) event.preventDefault();
      }}
      onDragStartCapture={(event) => {
        if (isAssetTarget(event.target)) event.preventDefault();
      }}
    >
      {children}
    </div>
  );
}