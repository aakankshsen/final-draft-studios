"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useAutoplayVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playbackBlocked, setPlaybackBlocked] = useState(false);

  const playVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.paused) return;

    video.muted = true;
    void video.play().then(
      () => {
        if (videoRef.current === video) setPlaybackBlocked(false);
      },
      (error: unknown) => {
        if (videoRef.current !== video || !video.paused) return;
        if (error instanceof DOMException && error.name === "AbortError") return;
        if (!(error instanceof DOMException && error.name === "NotAllowedError")) {
          console.error("Could not play video:", error);
        }
        setPlaybackBlocked(true);
      },
    );
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const isVisible = () => {
      const rect = video.getBoundingClientRect();
      return rect.bottom > 0 && rect.right > 0 && rect.top < window.innerHeight && rect.left < window.innerWidth;
    };
    const retryIfVisible = () => {
      if (document.visibilityState === "visible" && isVisible()) playVideo();
    };
    const handlePlaying = () => setPlaybackBlocked(false);

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) retryIfVisible();
    });
    observer.observe(video);
    document.addEventListener("visibilitychange", retryIfVisible);
    document.addEventListener("pointerdown", retryIfVisible);
    document.addEventListener("keydown", retryIfVisible);
    video.addEventListener("playing", handlePlaying);
    retryIfVisible();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", retryIfVisible);
      document.removeEventListener("pointerdown", retryIfVisible);
      document.removeEventListener("keydown", retryIfVisible);
      video.removeEventListener("playing", handlePlaying);
    };
  }, [playVideo]);

  return { videoRef, playbackBlocked, playVideo };
}
