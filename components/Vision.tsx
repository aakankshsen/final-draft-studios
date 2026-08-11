import Reveal from "@/components/Reveal";

export default function Vision() {
  return (
    <section className="px-[5%] py-40 border-b border-white/10">
      <Reveal>
        <div className="text-xs tracking-[3px] uppercase text-amber mb-4">
          Our Approach
        </div>
        <p className="font-display uppercase text-[clamp(24px,4vw,44px)] leading-[1.15] max-w-4xl">
          Anyone can point a camera. Directing is the difference. We chase the frame that makes someone stop scrolling — then we cut it together like it matters, because it does.
        </p>
        <p className="font-mono text-xs text-dim mt-5">
          COPY — Replace with studio&apos;s actual point of view / philosophy line
        </p>
      </Reveal>
    </section>
  );
}