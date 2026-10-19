"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { TouchEvent } from "react";

type PhotoWallProps = {
  photos: string[];
  label: string;
  rowGap?: number;
  instagramLinks?: { photo: string; href: string }[];
  /** No longer used for sizing. Kept optional so pages that still pass it don't break. */
  layouts?: string[];
  /** Optional: real pixel size of each photo, in the same order as `photos`. */
  dimensions?: { width: number; height: number }[];
};

// ---- tweak these to change how the wall looks ----
// Target row height in px at each screen size (bigger = bigger photos, fewer per row)
const BASE_HEIGHT = { desktop: 380, tablet: 300, mobile: 220 };
// Row heights cycle through these multipliers, which is what gives different frame sizes
const ROW_SCALES = [1, 0.8, 1.2, 0.9, 1.3, 0.85];
// Show the wall after this long even if some photos haven't reported their shape
const MAX_WAIT_MS = 4000;

type Row = { items: number[]; height: number; centered: boolean };

function buildRows(ratios: number[], width: number): { rows: Row[]; gap: number } {
  const gap = width >= 1024 ? 16 : 12;
  const base =
    width >= 1024 ? BASE_HEIGHT.desktop : width >= 640 ? BASE_HEIGHT.tablet : BASE_HEIGHT.mobile;

  // height a row needs so its photos exactly fill the full width
  const fit = (idxs: number[]) => {
    const sum = idxs.reduce((s, i) => s + ratios[i], 0);
    return (width - gap * (idxs.length - 1)) / sum;
  };

  const rows: Row[] = [];
  let row: number[] = [];
  const target = () => base * ROW_SCALES[rows.length % ROW_SCALES.length];

  ratios.forEach((_, i) => {
    if (row.length === 0) {
      row = [i];
      return;
    }
    const t = target();
    const withIt = fit([...row, i]);
    const without = fit(row);
    if (Math.abs(withIt - t) <= Math.abs(without - t)) {
      row.push(i);
    } else {
      rows.push({ items: row, height: without, centered: false });
      row = [i];
    }
  });

  if (row.length) {
    const t = target();
    const h = fit(row);
    // a short last row would stretch huge, so keep it at target height and center it
    if (h <= t * 1.35) rows.push({ items: row, height: h, centered: false });
    else rows.push({ items: row, height: t, centered: true });
  }

  return { rows, gap };
}

// Re-mounts fresh whenever the list of photos changes
export default function PhotoWall(props: PhotoWallProps) {
  return <PhotoWallInner key={props.photos.join("|")} {...props} />;
}

function PhotoWallInner({ photos, label, dimensions, rowGap, instagramLinks }: PhotoWallProps) {
  const orderedPhotos = photos;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isOpen = activeIndex !== null;
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const lightboxOpenRef = useRef(false);

  const wallRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [timedOut, setTimedOut] = useState(false);
  const [ratios, setRatios] = useState<(number | null)[]>(() =>
    photos.map((_, i) => {
      const d = dimensions?.[i];
      return d ? d.width / d.height : null;
    }),
  );

  // photo shape (width / height), reported by each image once it loads
  const reportRatio = useCallback((index: number, img: HTMLImageElement) => {
    const r = img.naturalHeight ? img.naturalWidth / img.naturalHeight : 1;
    setRatios((prev) => {
      const current = prev[index];
      if (current !== null && Math.abs(current - r) < 0.001) return prev;
      const next = prev.slice();
      next[index] = r;
      return next;
    });
  }, []);

  const reportFailed = useCallback((index: number) => {
    setRatios((prev) => {
      if (prev[index] !== null) return prev;
      const next = prev.slice();
      next[index] = 1;
      return next;
    });
  }, []);

  // never leave the wall hidden forever
  useEffect(() => {
    const timer = setTimeout(() => setTimedOut(true), MAX_WAIT_MS);
    return () => clearTimeout(timer);
  }, []);

  const ready = timedOut || ratios.every((r) => r !== null);

  // track the wall's width
  useEffect(() => {
    const el = wallRef.current;
    if (!el) return;
    const update = () => {
      // ignore the width change caused by the lightbox hiding the page scrollbar
      if (lightboxOpenRef.current) return;
      setWidth(Math.floor(el.getBoundingClientRect().width));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // group photos into rows (unknown shapes count as square until they load)
  const layout = useMemo(
    () => (width > 0 ? buildRows(ratios.map((r) => r ?? 1), width) : null),
    [ratios, width],
  );

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
    lightboxOpenRef.current = isOpen;
  }, [isOpen]);

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

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    const touch = event.changedTouches[0];
    touchStartRef.current = null;
    if (!start || !touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.2) return;

    movePhoto(deltaX < 0 ? 1 : -1);
  };

  return (
    <>
      <div
        ref={wallRef}
        style={{ position: "relative", width: "100%", minHeight: layout ? undefined : 240 }}
      >
        {!ready && (
          <p className="absolute inset-x-0 top-10 text-center font-mono text-xs tracking-widest text-dim">
            LOADING PHOTOS…
          </p>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: rowGap ?? layout?.gap ?? 12,
            opacity: ready ? 1 : 0,
            transition: "opacity 400ms ease",
          }}
        >
          {layout?.rows.map((row, r) => (
            <div
              key={r}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: layout.gap,
                justifyContent: row.centered ? "center" : "flex-start",
              }}
            >
              {row.items.map((index) => {
                const ratio = ratios[index] ?? 1;
                const instagramHref = instagramLinks?.find(
                  (link) => link.photo === orderedPhotos[index],
                )?.href;
                return (
                  <div
                    key={orderedPhotos[index]}
                    style={
                      row.centered
                        ? { width: ratio * row.height, flex: "0 0 auto" }
                        : { flex: `${ratio} 1 0%`, minWidth: 0 }
                    }
                    className="flex min-w-0 flex-col"
                  >
                    <button
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
                      style={{ height: row.height }}
                      className="relative block w-full overflow-hidden bg-transparent text-left ring-1 ring-white/10 transition-shadow hover:ring-amber/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber"
                    >
                      <Image
                        src={orderedPhotos[index]}
                        alt={`${label} portfolio photo ${index + 1}`}
                        fill
                        loading="eager"
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        onLoad={(event) => reportRatio(index, event.currentTarget)}
                        onError={() => reportFailed(index)}
                        className="object-contain"
                      />
                    </button>
                    {instagramHref && (
                      <a
                        href={instagramHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex w-fit items-center gap-2 text-base text-dim transition-colors hover:text-amber focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className="size-4"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="5" />
                          <circle cx="12" cy="12" r="4" />
                          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                        </svg>
                        <span>Instagram</span>
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
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
            className="relative h-full max-h-[88vh] w-full max-w-6xl touch-pan-y select-none overscroll-contain"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={() => {
              touchStartRef.current = null;
            }}
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