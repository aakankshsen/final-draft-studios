import Reveal from "@/components/Reveal";
import NeedsContent from "@/components/NeedsContent";

export default function Studio() {
  return (
    <section id="studio" className="px-[5%] py-40 border-b border-white/10">
      <Reveal className="mb-12">
        <h2 className="font-display uppercase text-[clamp(30px,4.5vw,52px)] leading-none">
          The
          <br />
          studio
        </h2>
      </Reveal>

      <Reveal className="flex flex-wrap gap-14 items-center">
        <div className="flex-1 min-w-[300px]">
          <p className="text-dim text-base max-w-[480px] leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="font-mono text-xs text-dim mt-3">
            COPY — About the studio/team, written in client&apos;s voice
          </p>
        </div>

        <div className="flex-1 min-w-[300px] grid grid-cols-2 gap-4">
          <NeedsContent label="CLIENT ASSET — Team/BTS photo 1" className="aspect-[3/4]" />
          <NeedsContent label="CLIENT ASSET — Team/BTS photo 2" className="aspect-[3/4] mt-10" />
        </div>
      </Reveal>
    </section>
  );
}