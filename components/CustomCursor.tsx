"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [supportsCustomCursor, setSupportsCustomCursor] = useState(false);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updatePointerSupport = () => setSupportsCustomCursor(pointerQuery.matches);

    updatePointerSupport();
    pointerQuery.addEventListener("change", updatePointerSupport);

    return () => pointerQuery.removeEventListener("change", updatePointerSupport);
  }, []);

  useEffect(() => {
    if (!supportsCustomCursor) return;

    const handleMove = (e: MouseEvent) => {
      setHidden(false);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }

      const target = e.target as HTMLElement;
      setIsPointer(!!target.closest("a, button, [role='button'], input, textarea"));
    };

    const handleLeave = () => setHidden(true);

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [supportsCustomCursor]);

  if (!supportsCustomCursor) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 z-[200] pointer-events-none transition-opacity duration-300 ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
      style={{ transform: "translate(-50%, 0)" }}
    >
      <Image
        src="/logo/arrow-white.png"
        alt=""
        width={34}
        height={34}
        className={`transition-transform duration-200 ${isPointer ? "scale-125" : "scale-100"}`}
      />
    </div>
  );
}