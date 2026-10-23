import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Final Draft Studios — Enquiries",
    short_name: "FDS Enquiries",
    description: "Track and manage client enquiries.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0D0D0D",
    theme_color: "#0D0D0D",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
