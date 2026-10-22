"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import PhotoWall from "@/components/PhotoWall";
import VideoWall, { type PortfolioVideo } from "@/components/VideoWall";

type BagichaPortfolioProps = {
  photos: string[];
  heroVideo: PortfolioVideo;
  reels: PortfolioVideo[];
  label: string;
};

type PortfolioMedia =
  | { type: "photo"; src: string; title: string }
  | { type: "video"; src: string; title: string; poster?: string; orientation: "landscape" | "portrait" };

type ActiveMedia = { index: number; currentTime: number };

export default function BagichaPortfolio({ photos, heroVideo, reels, label }: BagichaPortfolioProps) {
  const media: PortfolioMedia[] = [
    {
      type: "video",
      src: heroVideo.src,
      title: heroVideo.title,
      poster: heroVideo.poster,
      orientation: "landscape",
    },
    ...photos.map((src, index): PortfolioMedia => ({
      type: "photo",
      src,
      title: `${label} photo ${index + 1}`,
    })),
    ...reels.map((reel): PortfolioMedia => ({
      type: "video",
      src: reel.src,
      title: reel.title,
      poster: reel.poster,
      orientation: "portrait",
    })),
  ];

  const [activeMedia, setActiveMedia] = useState<ActiveMedia | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const activeAsset = activeMedia === null ? null : media[activeMedia.index];

  const openMedia = useCallback((index: number, currentTime: number, opener: HTMLButtonElement | null) => {
    openerRef.current = opener;
    setActiveMedia({ index, currentTime });
  }, []);

  const closeGallery = useCallback(() => {
    setActiveMedia(null);
    openerRef.current?.focus();
  }, []);

  const moveMedia = useCallback((direction: number) => {
    setActiveMedia((current) => {
      if (current === null) return current;
      return {
        index: (current.index + direction + media.length) % media.length,
        currentTime: 0,
      };
    });
  }, [media.length]);

  useEffect(() => {
    if (activeMedia === null) return;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeGallery();
      if (event.key === "ArrowLeft") moveMedia(-1);
      if (event.key === "ArrowRight") moveMedia(1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeMedia, closeGallery, moveMedia]);

  useEffect(() => {
    if (activeMedia === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeMedia]);

  const activeFrameClass = activeAsset?.type === "video"
    ? activeAsset.orientation === "portrait"
      ? "relative h-[88vh] max-h-[88vh] w-auto max-w-[min(76vw,calc(88vh*9/16))] aspect-[9/16]"
      : "relative aspect-video w-[min(88vw,calc(78vh*16/9))]"
    : "relative h-[88vh] max-h-[88vh] w-[88vw] max-w-6xl";

  return (
    <>
      <div className="space-y-10">
        <VideoWall
          videos={[heroVideo]}
          label={label}
          layout="landscape-full"
          hideCaptions
          onOpenVideo={(index, currentTime, opener) => openMedia(index, currentTime, opener)}
        />

        <PhotoWall
          photos={photos}
          label={label}
          rowGap={24}
          unoptimized
          onOpenPhoto={(index, opener) => openMedia(index + 1, 0, opener)}
        />

        <div className="mx-auto w-full max-w-[22rem] sm:max-w-[54rem]">
          <VideoWall
            videos={reels}
            label={label}
            layout="portrait"
            hideCaptions
            onOpenVideo={(index, currentTime, opener) =>
              openMedia(1 + photos.length + index, currentTime, opener)
            }
          />
        </div>
      </div>

      {activeMedia !== null && activeAsset && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${label} portfolio gallery`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-8"
          onClick={closeGallery}
        >
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close fullscreen gallery"
            onClick={closeGallery}
            className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white transition-colors hover:border-amber hover:text-amber sm:right-8 sm:top-8"
          >
            <X size={23} aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label="Previous portfolio item"
            onClick={(event) => {
              event.stopPropagation();
              moveMedia(-1);
            }}
            className="absolute left-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50 text-3xl text-white transition-colors hover:border-amber hover:text-amber sm:left-8 sm:size-14"
          >
            <span aria-hidden="true">&lsaquo;</span>
          </button>

          <div
            className={`${activeFrameClass} touch-pan-y select-none overscroll-contain`}
            onClick={(event) => event.stopPropagation()}
          >
            {activeAsset.type === "photo" ? (
              <Image
                key={activeAsset.src}
                src={activeAsset.src}
                alt={activeAsset.title}
                fill
                unoptimized
                sizes="100vw"
                priority
                className="object-contain"
              />
            ) : (
              <video
                key={activeAsset.src}
                controls
                controlsList="nodownload"
                playsInline
                preload="metadata"
                poster={activeAsset.poster}
                autoPlay
                aria-label={`${label}: ${activeAsset.title}`}
                onLoadedMetadata={(event) => {
                  const player = event.currentTarget;
                  player.currentTime = activeMedia.currentTime;
                  void player.play().catch(() => {});
                }}
                className="h-full w-full bg-black object-contain"
              >
                <source src={activeAsset.src} type="video/mp4" />
                Your browser does not support HTML video.
              </video>
            )}
            <p className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs tracking-widest text-white/80">
              {activeMedia.index + 1} / {media.length}
            </p>
          </div>

          <button
            type="button"
            aria-label="Next portfolio item"
            onClick={(event) => {
              event.stopPropagation();
              moveMedia(1);
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