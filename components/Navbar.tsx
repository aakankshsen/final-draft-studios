import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] py-6 bg-gradient-to-b from-ink/90 to-transparent">
      <Link href="/" className="flex items-center gap-3">
        <Image src="/logo/icon-white.png" alt="Final Draft Studios" width={32} height={32} priority />
        <span className="flex flex-col leading-none">
          <span className="font-display text-base tracking-wide text-paper">FINAL DRAFT</span>
          <span className="font-display text-[9px] tracking-[3px] text-dim">STUDIOS</span>
        </span>
      </Link>

      <div className="hidden md:flex gap-8 text-xs tracking-widest uppercase text-dim">
        <Link href="#work" className="hover:text-paper transition-colors">Work</Link>
        <Link href="#deliverables" className="hover:text-paper transition-colors">Services</Link>
        <Link href="#studio" className="hover:text-paper transition-colors">Studio</Link>
      </div>

      <Link
        href="#contact"
        className="group border border-amber text-amber text-xs tracking-widest uppercase px-5 py-2.5 flex items-center gap-2 hover:bg-amber hover:text-ink transition-colors"
      >
        Enquire
        <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </nav>
  );
}