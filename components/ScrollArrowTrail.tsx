"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type Arrow = { id: number; x: number };

export default function ScrollArrowTrail() {
  const [arrows, setArrows] = useState<Arrow[]>([]);
  const lastScrollY = useRef(0);
  const lastSpawn = useRef(0);
  const idCounter = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      lastScrollY.current = currentY;

      const now = Date.now();
      if (delta > 2 && now - lastSpawn.current > 120) {
        lastSpawn.current = now;
        const id = idCounter.current++;
        const x = 85 + Math.random() * 10;
        setArrows((prev) => [...prev, { id, x }]);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const removeArrow = (id: number) => {
    setArrows((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {arrows.map((arrow) => (
        <ArrowParticle key={arrow.id} x={arrow.x} onDone={() => removeArrow(arrow.id)} />
      ))}
    </div>
  );
}

function ArrowParticle({ x, onDone }: { x: number; onDone: () => void }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { y: 0, opacity: 0, scale: 0.6 },
      {
        y: -140,
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(ref.current, {
            y: -220,
            opacity: 0,
            duration: 0.5,
            ease: "power1.in",
            onComplete: onDone,
          });
        },
      }
    );
  }, [onDone]);

  return (
    <svg
      ref={ref}
      className="absolute bottom-24"
      style={{ left: `${x}%` }}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 20V6M12 6L5 13M12 6L19 13"
        stroke="#F5A623"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}