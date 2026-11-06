"use client";

import { useEffect, useRef } from "react";
import { useAutoplayVideo } from "./useAutoplayVideo";

const INTRO_VIDEO = "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/FDS-Logo%20Animation-4k.mp4";
// Seconds before the video ends when the auto scroll starts, so it lines up with the arrow going up.
const SCROLL_LEAD_SECONDS = 1.6;
const SCROLL_DURATION_MS = 700;

export default function LogoIntro() {
  const { videoRef, playbackBlocked, playVideo } = useAutoplayVideo();
  const hasAutoScrolled = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let frame = 0;
    let scrollFrame = 0;

    const scrollToWork = () => {
      const target = document.getElementById("work");
      if (!target) return;

      const startY = window.scrollY;
      const distance = target.getBoundingClientRect().top;
      const startTime = performance.now();

      const step = (now: number) => {
        const progress = Math.min((now - startTime) / SCROLL_DURATION_MS, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        window.scrollTo(0, startY + distance * eased);
        if (progress < 1) scrollFrame = requestAnimationFrame(step);
      };
      scrollFrame = requestAnimationFrame(step);
    };

    const check = () => {
      if (!hasAutoScrolled.current && video.duration && video.currentTime >= video.duration - SCROLL_LEAD_SECONDS) {
        hasAutoScrolled.current = true;
        // Skip if the visitor has already scrolled away from the intro.
        if (window.scrollY <= window.innerHeight * 0.5) scrollToWork();
      }
      frame = requestAnimationFrame(check);
    };
    frame = requestAnimationFrame(check);

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(scrollFrame);
    };
  }, [videoRef]);

  return (
    <section className="relative w-full overflow-hidden bg-black pt-14 lg:h-screen lg:h-[100svh] lg:pt-0">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="block aspect-video w-full object-contain lg:absolute lg:inset-[14%] lg:aspect-auto lg:h-[72%] lg:w-[72%]"
      >
        <source src={INTRO_VIDEO} type="video/mp4" />
      </video>
      {playbackBlocked && (
        <button
          type="button"
          onClick={playVideo}
          className="absolute inset-0 m-auto h-fit w-fit rounded-full bg-black/75 px-5 py-3 text-sm text-white"
        >
          Play intro
        </button>
      )}
    </section>
  );
}
