"use client";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import NeedsContent from "@/components/NeedsContent";
import { ArrowUpRight } from "lucide-react";

const services = [
  "Brand & Ad Films",
  "Wedding Films",
  "Short Films & Documentaries",
  "Editing & Post-Production",
  "Motion Titles & Graphics",
  "Colour Grading",
  "Photography",
  "UGC & Social Content",
];

export default function Deliverables() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="deliverables" className="px-[5%] py-40 border-b border-white/10">
      <Reveal className="mb-12">
        <h2 className="font-display uppercase text-[clamp(30px,4.5vw,52px)] leading-none">
          What we
          <br />
          deliver
        </h2>
      </Reveal>

      <div className="flex flex-col md:flex-row gap-14">
        <Reveal className="flex-1 min-w-[280px]">
          {services.map((service, i) => (
            <div
              key={service}
              onMouseEnter={() => setHovered(service)}
              onMouseLeave={() => setHovered(null)}
              className="group border-t border-white/10 last:border-b py-5 flex justify-between items-center cursor-pointer transition-all hover:pl-3"
            >
              <h3 className="flex items-center gap-3 font-semibold text-lg text-paper group-hover:text-amber transition-colors">
                <ArrowUpRight
                  size={16}
                  className="text-amber opacity-0 group-hover:opacity-100 transition-opacity"
                />
                {service}
              </h3>
              <span className="font-mono text-xs text-dim">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </Reveal>

        <Reveal className="flex-1 min-w-[280px]">
          <NeedsContent
            label={
              hovered
                ? `CLIENT ASSET — reel/photo for "${hovered}"`
                : "CLIENT ASSET — supporting reel/photo (rotates per hovered service, optional)"
            }
            className="aspect-[4/5] sticky top-32"
          />
        </Reveal>
      </div>
    </section>
  );
}