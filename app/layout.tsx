import type { Metadata } from "next";
import localFont from "next/font/local";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import "./globals.css";

const gilroy = localFont({
  src: [
    { path: "./fonts/Gilroy-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/Gilroy-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Gilroy-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Gilroy-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/Gilroy-Heavy.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-gilroy",
});

const siteDescription =
  "Final Draft Studios is a creative production house built on strong vision and immaculate execution. We handle campaigns, photoshoots, events and content.";

export const metadata: Metadata = {
  title: "Final Draft Studios",
  description: siteDescription,
  openGraph: {
    title: "Final Draft Studios",
    description: siteDescription,
  },
  twitter: {
    card: "summary",
    title: "Final Draft Studios",
    description: siteDescription,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${gilroy.variable} bg-ink text-paper font-body antialiased`}>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}