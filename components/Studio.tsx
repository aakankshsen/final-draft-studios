"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger);

const roughDraftAssets = [
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/BTS%20ASSETS/1568e892-05f2-4b91-9fbf-f19bd7360326.JPG",
  "/work/rough-draft/2.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/BTS%20ASSETS/IMG_3512.PNG",
  "/work/rough-draft/3.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/BTS%20ASSETS/IMG_4025.PNG",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/BTS%20ASSETS/IMG_4293.JPG",
  "/work/rough-draft/4.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/BTS%20ASSETS/IMG_6052.JPG",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/BTS%20ASSETS/IMG_6115.JPG",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/BTS%20ASSETS/IMG_6409.JPG",
  "/work/rough-draft/1.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/BTS%20ASSETS/IMG_8866.PNG",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/BTS%20ASSETS/IMG_8867.PNG",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/BTS%20ASSETS/IMG_9263.PNG",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/BTS%20ASSETS/IMG_9264.PNG",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/BTS%20ASSETS/IMG_9504.JPG",
];

export default function Studio() {
  const assetRef = useRef<HTMLDivElement>(null);
  const [activeAsset, setActiveAsset] = useState(0);

  useEffect(() => {
    const slideshow = window.setInterval(() => {
      setActiveAsset((current) => (current + 1) % roughDraftAssets.length);
    }, 4500);

    return () => window.clearInterval(slideshow);
  }, []);

  useEffect(() => {
    const el = assetRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { scale: 0.85, opacity: 0.3 },
      {
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          end: "top 60%",
          scrub: 0.5,
        },
      }
    );
  }, []);

  return (
    <section id="studio" className="px-[5%] py-28 border-b border-white/10">
      <Reveal className="grid gap-12 md:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] md:gap-14 items-center">
        <div className="flex flex-col justify-center">
          <h2 className="group mb-8 w-fit cursor-default font-display uppercase text-[clamp(30px,4.5vw,52px)] leading-none text-paper [-webkit-text-stroke:1px_rgba(245,166,35,0.6)] hover:text-amber hover:[-webkit-text-stroke:1px_#F5A623] transition-all duration-500">
            The Rough Draft
          </h2>
          <p className="text-dim text-base max-w-[480px] leading-relaxed">
            Before the final cut, there&apos;s a lot of chaos. This is where most of it happens
          </p>
        </div>

        <div className="flex items-center justify-center">
          <div ref={assetRef} className="w-full md:max-w-[720px] md:ml-auto">
            <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
              {roughDraftAssets.map((asset, index) => (
                <img
                  key={asset}
                  src={asset}
                  alt={`Behind-the-scenes studio image ${index + 1}`}
                  className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-1000 ${
                    activeAsset === index ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
