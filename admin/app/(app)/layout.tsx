import Link from "next/link";
import PushToggle from "@/components/PushToggle";
import SignOutButton from "@/components/SignOutButton";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-ink/90 backdrop-blur border-b border-white/10 safe-top">
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="uppercase font-extrabold tracking-wide">
            FDS <span className="text-amber">Enquiries</span>
          </Link>
          <div className="flex items-center gap-4">
            <PushToggle />
            <SignOutButton />
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-5 py-8 safe-bottom">{children}</main>
    </div>
  );
}
