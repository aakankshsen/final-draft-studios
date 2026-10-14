"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";
import NeedsContent from "@/components/NeedsContent";

gsap.registerPlugin(ScrollTrigger);

const LOGO_BASE =
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Clientelle%20Logos";

type Client = {
  name: string;
  logoSrc: string | null;
  onLight?: boolean; // set true for logos that need a light panel behind them
  scale?: number; // 1 = default size, higher = bigger logo
};

const clients: Client[] = [
  { name: "Lakmē", logoSrc: `${LOGO_BASE}/Gold-logo2.png`, scale: 1.4 },
    { name: "Sparx", logoSrc: `${LOGO_BASE}/Sparx%20New%20Logo%2017-08-2026-1.png` },
  { name: "Bhagat Tarachand", logoSrc: `${LOGO_BASE}/Bhagat-Tarachand-Logo.png`, scale: 1.9 },
  { name: "Flite", logoSrc: `${LOGO_BASE}/Flite%20Logo%202.png` },
  { name: "Nissan", logoSrc: `${LOGO_BASE}/nissan%20white.png` },
  {
    name: "Purple",
    logoSrc: `${LOGO_BASE}/WhatsApp%20Image%202026-10-13%20at%2012.28.52%20AM.png`,
  },
  {
    name: "FinX Commune",
    logoSrc: `${LOGO_BASE}/finx-commune-mumbai-coffee-shops-cq3zg9sno7.png`,
    scale: 2.0,
  },
  { name: "YouMee", logoSrc: `${LOGO_BASE}/youmee%20white.png` },
  { name: "Afnan", logoSrc: `${LOGO_BASE}/afnan%20white.png`, scale: 1.4 },
  { name: "PTAT", logoSrc: `${LOGO_BASE}/Artboard%201mdpi.png` },
  {
    name: "Bagicha Wilderness",
    logoSrc: `${LOGO_BASE}/2deb51_97abfe7fbd754b4ca65f7bdb041c9670~mv2.png`,
    scale: 1.4,
  },
];

export default function ClientReel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const scrollDistance = () =>
        track.scrollWidth - window.innerWidth + window.innerWidth * 0.05;

      gsap.to(track, {
        x: () => -scrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollDistance()}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-black py-10 border-b border-white/10">
      <div className="mb-8 px-[5%] pt-16">
        <Reveal>
          <h2 className="group cursor-default font-display uppercase text-[clamp(24px,3.5vw,40px)] leading-none text-paper [-webkit-text-stroke:1px_rgba(245,166,35,0.6)] hover:text-amber hover:[-webkit-text-stroke:1px_#F5A623] transition-all duration-500">
            Brands we&apos;ve worked with
          </h2>
        </Reveal>
      </div>

      {/* the actual filmstrip object */}
      <div className="relative bg-[#111] overflow-hidden">
        {/* top perforation row */}
        <div className="film-sprockets" />

        <div className="relative overflow-hidden py-3">
          <div ref={trackRef} className="flex items-center gap-3 pl-[5%] pr-[15vw] w-max">
            {clients.map((client, i) => (
              <div key={client.name} className="flex-shrink-0 flex items-center gap-3">
                {/* frame number, like real film edge printing */}
                <div className="font-mono text-[10px] text-white/25 rotate-90 origin-center w-4 text-center select-none">
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* the film frame itself */}
                <div className="relative bg-black border-[10px] border-[#0a0a0a] w-[300px] md:w-[340px] aspect-[4/3]">
                  <div
                    className={`w-full h-full relative overflow-hidden flex items-center justify-center ${
                      client.onLight ? "bg-paper" : ""
                    }`}
                  >
                    {client.logoSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={client.logoSrc}
                        alt={client.name}
                        loading="lazy"
                        className="w-auto h-auto object-contain max-w-[70%] max-h-[60%]"
                        style={{ transform: `scale(${client.scale ?? 1})` }}
                      />
                    ) : (
                      <NeedsContent
                        label={`CLIENT ASSET — ${client.name} logo`}
                        className="w-full h-full"
                      />
                    )}
                  </div>
                  {/* subtle inner vignette to sell the "film still" feel */}
                  <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* bottom perforation row */}
        <div className="film-sprockets" />
      </div>
    </div>
  );
}