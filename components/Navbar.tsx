"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { href: "#work", label: "Work" },
    { href: "#deliverables", label: "Services" },
    { href: "#studio", label: "Studio" },
  ];

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
              ? "py-3 rounded-b-2xl bg-white/[0.06] backdrop-blur-xl backdrop-saturate-150 border-b border-x border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "py-6 bg-transparent border-transparent rounded-none"
          }`}
        >
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo/icon-white.png" alt="Final Draft Studios" width={30} height={30} priority />
            <span className="flex flex-col leading-none">
              <span className="font-display text-sm tracking-wide text-paper">FINAL DRAFT</span>
              <span className="font-display text-[8px] tracking-[3px] text-dim">STUDIOS</span>
            </span>
          </Link>

          <div className="hidden md:flex gap-8 text-xs tracking-widest uppercase text-dim">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-amber transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="#contact"
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
        <div className="fixed inset-0 z-[100] bg-ink flex flex-col">
          <div className="flex items-center justify-between px-[5%] py-6">
            <Image src="/logo/icon-white.png" alt="Final Draft Studios" width={32} height={32} />
            <button onClick={() => setOpen(false)} className="text-paper" aria-label="Close menu">
              <X size={28} />
            </button>
          </div>

          <div className="flex flex-col justify-center flex-1 px-[5%] gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display uppercase text-4xl text-paper hover:text-amber transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="px-[5%] pb-12">
            <Link
              href="#contact"
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