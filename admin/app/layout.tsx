import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
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

export const metadata: Metadata = {
  title: "FDS Enquiries",
  description: "Track and manage Final Draft Studios enquiries.",
  robots: { index: false, follow: false },
  appleWebApp: { capable: true, title: "FDS Enquiries", statusBarStyle: "black-translucent" },
  icons: { apple: "/icons/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${gilroy.variable} font-sans antialiased min-h-screen`}>
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
