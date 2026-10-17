"use client";

import { Expand, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type PortfolioVideo = {
  type?: "video";
  title: string;
  src: string;
  poster?: string;
};

export type PortfolioImage = {
  type: "image";
  title: string;
  src: string;
};

export type PortfolioAsset = PortfolioVideo | PortfolioImage;

type VideoWallProps = {
  videos: PortfolioAsset[];
  label: string;
  layout?: "portrait" | "landscape" | "launch-event" | "mixed";
  hideCaptions?: boolean;
};

type ActiveVideo = {
  index: number;
  currentTime: number;
};

export default function VideoWall({ videos, label, layout = "portrait", hideCaptions = false }: VideoWallProps) {
  const [activeVideo, setActiveVideo] = useState<ActiveVideo | null>(null);
  const [playbackError, setPlaybackError] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const fullscreenButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const gridVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const isOpen = activeVideo !== null;

  const openFullscreen = useCallback(
    (index: number, opener: HTMLButtonElement | null, sourceVideo = gridVideoRefs.current[index]) => {
      const currentTime = sourceVideo?.ended ? 0 : (sourceVideo?.currentTime ?? 0);
      sourceVideo?.pause();

      if (sourceVideo && document.fullscreenElement === sourceVideo) {
        void document.exitFullscreen().catch(() => {
          setPlaybackError("Could not exit native fullscreen. Press Escape to continue.");
        });
      }

      const webkitVideo = sourceVideo as (HTMLVideoElement & { webkitExitFullscreen?: () => void }) | null | undefined;
      webkitVideo?.webkitExitFullscreen?.();
      openerRef.current = opener ?? fullscreenButtonRefs.current[index];
      setPlaybackError(null);
      setActiveVideo({ index, currentTime });
    },
    [],
  );

  const closeGallery = useCallback(() => {
    setActiveVideo(null);
    openerRef.current?.focus();
  }, []);

  const moveVideo = useCallback(
    (direction: number) => {
      setActiveVideo((current) => {
        if (current === null) return current;
        return {
          index: (current.index + direction + videos.length) % videos.length,
          currentTime: 0,
        };
      });
      setPlaybackError(null);
    },
    [videos.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    const gridVideos = gridVideoRefs.current;
    const handleFullscreenChange = () => {
      const fullscreenElement = document.fullscreenElement;
      if (!(fullscreenElement instanceof HTMLVideoElement)) return;

      const index = gridVideoRefs.current.indexOf(fullscreenElement);
      if (index !== -1) openFullscreen(index, null, fullscreenElement);
    };

    const handleWebkitBeginFullscreen = (event: Event) => {
      const video = event.currentTarget;
      if (!(video instanceof HTMLVideoElement)) return;

      const index = gridVideoRefs.current.indexOf(video);
      if (index !== -1) {
        event.preventDefault();
        openFullscreen(index, null, video);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    gridVideos.forEach((video) => {
      video?.addEventListener("webkitbeginfullscreen", handleWebkitBeginFullscreen);
    });
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      gridVideos.forEach((video) => {
        video?.removeEventListener("webkitbeginfullscreen", handleWebkitBeginFullscreen);
      });
    };
  }, [openFullscreen]);

  useEffect(() => {
    if (activeVideo === null) return;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeGallery();
      if (event.key === "ArrowLeft") moveVideo(-1);
      if (event.key === "ArrowRight") moveVideo(1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeVideo, closeGallery, moveVideo]);

  const activeAsset = activeVideo === null ? null : videos[activeVideo.index];
  const hasImages = videos.some((item) => item.type === "image");
  const gridClassName =
    layout === "launch-event"
      ? "mx-auto grid max-w-[58rem] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6"
      : layout === "mixed"
        ? "mx-auto grid max-w-[72rem] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        : `grid grid-cols-1 gap-5 sm:grid-cols-2 ${layout === "portrait" ? "lg:grid-cols-3 lg:gap-6" : "lg:grid-cols-2 lg:gap-8"}`;

  return (
    <>
      <div className={gridClassName}>
        {videos.map((item, index) => (
          <figure
            key={item.src}
            className={`min-w-0 ${
              layout === "launch-event"
                ? index === 0
                  ? "sm:col-span-2 lg:col-span-6"
                  : index === 4
                    ? "lg:col-span-2 lg:col-start-2"
                    : index === 5
                      ? "lg:col-span-2 lg:col-start-4"
                      : "lg:col-span-2"
                : layout === "mixed" && index === 8
                  ? "lg:col-start-2"
                  : layout === "mixed" && index === 9
                    ? "lg:col-start-3"
                    : ""
            }`}
          >
            <div className={`relative ${item.type === "image" ? "aspect-[9/16]" : ""}`}>
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt={`${label}: ${item.title}`}
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 100vw"
                  className="bg-white/5 object-contain"
                />
              ) : (
                <video
                  ref={(element) => {
                    gridVideoRefs.current[index] = element;
                  }}
                  controls
                  controlsList="nodownload"
                  playsInline
                  preload="metadata"
                  poster={item.poster}
                  aria-label={`${label}: ${item.title}`}
                  onPlay={() => {
                    gridVideoRefs.current.forEach((element, elementIndex) => {
                      if (elementIndex !== index) element?.pause();
                    });
                  }}
                  className={`w-full bg-white/5 ${
                    layout === "portrait" || layout === "mixed" || (layout === "launch-event" && index > 0)
                      ? `aspect-[9/16] ${layout === "portrait" ? "object-cover" : "object-contain"}`
                      : "aspect-video object-contain"
                  }`}
                >
                  <source src={item.src} type="video/mp4" />
                  Your browser does not support HTML video.
                </video>
              )}
              <button
                ref={(element) => {
                  fullscreenButtonRefs.current[index] = element;
                }}
                type="button"
                aria-label={`View ${item.title} fullscreen`}
                title="View fullscreen"
                onClick={(event) => openFullscreen(index, event.currentTarget)}
                className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full border border-white/40 bg-black/60 text-white shadow transition-colors hover:border-amber hover:text-amber focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber"
              >
                <Expand size={18} aria-hidden="true" />
              </button>
            </div>
            {!hideCaptions && (
              <figcaption className="mt-3 text-sm tracking-wide text-paper">
                {item.title}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {activeVideo !== null && activeAsset && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${label} ${hasImages ? "media" : "video"} gallery`}
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
            aria-label={`Previous ${hasImages ? "asset" : "video"}`}
            onClick={(event) => {
              event.stopPropagation();
              moveVideo(-1);
            }}
            className="absolute left-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50 text-3xl text-white transition-colors hover:border-amber hover:text-amber sm:left-8 sm:size-14"
          >
            <span aria-hidden="true">&lsaquo;</span>
          </button>

          <div
            className={`relative flex max-h-[88vh] flex-col ${
              layout === "portrait" || layout === "mixed"
                ? "h-[88vh] w-auto max-w-[min(76vw,calc(88vh*9/16))] aspect-[9/16]"
                : "aspect-video w-[min(88vw,calc(78vh*16/9))]"
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            {activeAsset.type === "image" ? (
              <Image
                key={activeAsset.src}
                src={activeAsset.src}
                alt={`${label}: ${activeAsset.title}`}
                fill
                unoptimized
                sizes="100vw"
                priority
                className="bg-black object-contain"
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
                  player.currentTime = activeVideo.currentTime;
                  void player.play().then(
                    () => setPlaybackError(null),
                    () => setPlaybackError("Autoplay was blocked by your browser."),
                  );
                }}
                onPlay={() => setPlaybackError(null)}
                className="h-full w-full bg-black object-contain"
              >
                <source src={activeAsset.src} type="video/mp4" />
                Your browser does not support HTML video.
              </video>
            )}
            {!hideCaptions && (
              <div className="mt-3 flex items-center justify-between gap-4 text-sm text-white/80">
                <span className="truncate">{activeAsset.title}</span>
                <span className="shrink-0 text-xs tracking-widest">
                  {activeVideo.index + 1} / {videos.length}
                </span>
              </div>
            )}
            {playbackError && (
              <p role="status" className="mt-2 text-center text-sm text-white/80">
                {playbackError}
              </p>
            )}
          </div>

          <button
            type="button"
            aria-label={`Next ${hasImages ? "asset" : "video"}`}
            onClick={(event) => {
              event.stopPropagation();
              moveVideo(1);
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
