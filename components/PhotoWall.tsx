"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type PhotoWallProps = {
  photos: string[];
  layouts: string[];
  label: string;
};

export default function PhotoWall({ photos, layouts, label }: PhotoWallProps) {
  const orderedPhotos = [...photos].reverse();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isOpen = activeIndex !== null;
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  const closeGallery = useCallback(() => {
    setActiveIndex(null);
    openerRef.current?.focus();
  }, []);

  const movePhoto = useCallback(
    (direction: number) => {
      setActiveIndex((currentIndex) => {
        if (currentIndex === null) return currentIndex;
        return (currentIndex + direction + photos.length) % photos.length;
      });
    },
    [photos.length],
  );

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeGallery();
      if (event.key === "ArrowLeft") movePhoto(-1);
      if (event.key === "ArrowRight") movePhoto(1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, closeGallery, movePhoto]);

  useEffect(() => {
    if (activeIndex !== null) closeButtonRef.current?.focus();
  }, [activeIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const openGallery = (index: number, opener: HTMLButtonElement) => {
    openerRef.current = opener;
    setActiveIndex(index);
  };

  return (
    <>
      <div className="columns-1 gap-3 sm:columns-2 lg:columns-4">
        {orderedPhotos.map((src, index) => (
          <button
            key={src}
            type="button"
            aria-label={`Open ${label} photo ${index + 1} fullscreen`}
            title="Double-click to view fullscreen"
            onDoubleClick={(event) => openGallery(index, event.currentTarget)}
            onClick={(event) => {
              if (window.matchMedia("(hover: none)").matches) {
                openGallery(index, event.currentTarget);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openGallery(index, event.currentTarget);
              }
            }}
            className={`relative mb-3 inline-block w-full break-inside-avoid overflow-hidden bg-white/5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber ${
              layouts[index % layouts.length]
            }`}
          >
            <Image
              src={src}
              alt={`${label} portfolio photo ${index + 1}`}
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 100vw"
              className="object-contain"
            />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${label} photo gallery`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-8"
          onClick={closeGallery}
        >
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close fullscreen gallery"
            onClick={closeGallery}
            className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full border border-white/30 bg-black/50 text-3xl text-white transition-colors hover:border-amber hover:text-amber sm:right-8 sm:top-8"
          >
            <span aria-hidden="true">&times;</span>
          </button>

          <button
            type="button"
            aria-label="Previous photo"
            onClick={(event) => {
              event.stopPropagation();
              movePhoto(-1);
            }}
            className="absolute left-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50 text-3xl text-white transition-colors hover:border-amber hover:text-amber sm:left-8 sm:size-14"
          >
            <span aria-hidden="true">&lsaquo;</span>
          </button>

          <div
            className="relative h-full max-h-[88vh] w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              key={orderedPhotos[activeIndex]}
              src={orderedPhotos[activeIndex]}
              alt={`${label} portfolio photo ${activeIndex + 1}`}
              fill
              sizes="100vw"
              priority
              className="object-contain"
            />
            <p className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs tracking-widest text-white/80">
              {activeIndex + 1} / {photos.length}
            </p>
          </div>

          <button
            type="button"
            aria-label="Next photo"
            onClick={(event) => {
              event.stopPropagation();
              movePhoto(1);
            }}
            className="absolute right-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50 text-3xl text-white transition-colors hover:border-amber hover:text-amber sm:right-8 sm:size-14"
          >
            <span aria-hidden="true">&rsaquo;</span>
          </button>
        </div>
      )}
    </>
  );
}
