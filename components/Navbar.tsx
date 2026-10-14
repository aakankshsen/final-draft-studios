"use client";
import { useState, useEffect, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { href: `${pathname === "/" ? "" : "/"}#work`, label: "Work" },
    { href: `${pathname === "/" ? "" : "/"}#deliverables`, label: "Services" },
    { href: `${pathname === "/" ? "" : "/"}#studio`, label: "Studio" },
    { href: "/about", label: "About Us" },
  ];

  const handleSectionNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (pathname !== "/" && href.startsWith("/#")) {
      event.preventDefault();
      window.location.assign(href);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed z-50 transition-all duration-300 ${
          scrolled ? "top-1.5 left-2 right-2" : "top-0 left-0 right-0"
        }`}
      >
        <nav
          className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] transition-all duration-300 ${
            scrolled
              ? "py-2 rounded-b-2xl bg-white/[0.06] backdrop-blur-xl backdrop-saturate-150 border-b border-x border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "py-4 bg-transparent border-transparent rounded-none"
          }`}
        >
          <Link href="/" className="flex items-center">
            <Image
              src="/logo/wordmark-white2.png"
              alt="Final Draft Studios"
              width={480}
              height={120}
              priority
              className="w-auto h-6 md:h-8"
            />
          </Link>

          <div className="hidden md:flex gap-8 text-sm font-medium tracking-widest uppercase text-paper">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(event) => handleSectionNavigation(event, link.href)}
                className="hover:text-amber transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/enquire"
              className="group hidden sm:flex border border-amber/70 text-amber text-xs tracking-widest uppercase px-5 py-2 rounded-full items-center gap-2 hover:bg-amber hover:text-ink transition-colors"
            >
              Enquire
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <button onClick={() => setOpen(true)} className="md:hidden text-paper" aria-label="Open menu">
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </div>

      {/* MOBILE FULL-SCREEN MENU */}
      {open && (
        <div className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-ink">
          <div className="flex items-center justify-between px-[5%] py-6">
            <Image src="/logo/wordmark-white2.png" alt="Final Draft Studios" width={140} height={35} className="w-auto h-8" />
            <button onClick={() => setOpen(false)} className="text-paper" aria-label="Close menu">
              <X size={28} />
            </button>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-6 px-[5%] py-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(event) => {
                  setOpen(false);
                  handleSectionNavigation(event, link.href);
                }}
                className="font-display uppercase text-[clamp(2rem,8vw,2.5rem)] text-paper hover:text-amber transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="px-[5%] pb-12">
            <Link
              href="/enquire"
              onClick={() => setOpen(false)}
              className="group border border-amber text-amber text-sm tracking-widest uppercase px-6 py-4 flex items-center justify-center gap-2 hover:bg-amber hover:text-ink transition-colors"
            >
              Enquire
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}