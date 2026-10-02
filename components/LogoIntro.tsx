import { ArrowDown } from "lucide-react";

export default function LogoIntro() {
  return (
    <section className="relative flex flex-col items-center justify-start bg-ink overflow-hidden px-[5%] pt-20 pb-16">
      {/* logo animation video */}
      <div className="relative w-full h-[380px]">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="https://pub-06d5ca6a451e4bf9b57df03334b372cc.r2.dev/temporary.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="mt-12 flex flex-col items-center gap-3 text-amber">
        <span className="text-sm md:text-base tracking-widest uppercase">Scroll to explore</span>
        <ArrowDown
          aria-hidden="true"
          size={32}
          className="animate-bounce drop-shadow-[0_0_12px_rgba(245,166,35,0.9)]"
        />
      </div>
    </section>
  );
}