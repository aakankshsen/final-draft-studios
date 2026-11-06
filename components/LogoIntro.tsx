"use client";

import { useRef } from "react";

const INTRO_VIDEO = "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/FDS-Logo%20Animation-4k.mp4";

export default function LogoIntro() {
  const hasAutoScrolled = useRef(false);

  // Loops manually (instead of the loop attribute) so the first "ended" event fires and triggers the auto scroll.
  const handleEnded = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    video.currentTime = 0;
    void video.play();

    if (hasAutoScrolled.current) return;
    hasAutoScrolled.current = true;

    // Skip if the visitor has already scrolled away from the intro.
    if (window.scrollY > window.innerHeight * 0.5) return;
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative h-screen h-[100svh] w-full overflow-hidden bg-ink">
      <video
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleEnded}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={INTRO_VIDEO} type="video/mp4" />
      </video>
    </section>
  );
}