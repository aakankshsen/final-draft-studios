export default function LogoIntro() {
  return (
    <section className="relative flex flex-col items-center justify-start bg-ink overflow-hidden px-[5%] pt-16 sm:pt-20 pb-12 sm:pb-16">
      {/* logo animation video */}
      <div className="relative w-full h-[clamp(220px,45vw,380px)] lg:h-[380px]">
        <video autoPlay muted loop playsInline className="w-full h-full object-contain lg:object-cover">
          <source src="https://pub-06d5ca6a451e4bf9b57df03334b372cc.r2.dev/temporary.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}