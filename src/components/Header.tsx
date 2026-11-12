"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Seal from "@/components/Seal";
import { church, nav } from "@/lib/site";

/**
 * The phone menu is rendered as a SIBLING of the header, never inside it:
 * a header with backdrop-blur traps a position:fixed child.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gold/40 bg-night/95 text-cream">
        <div className="wrap flex h-[68px] items-center justify-between gap-4 md:h-[78px]">
          <Link href="/" className="flex min-w-0 items-center gap-3" aria-label={`${church.name} home`}>
            <Seal uid="hdr" simple className="h-12 w-12 shrink-0 md:h-14 md:w-14" />
            <span className="min-w-0 leading-none">
              <span className="block font-caps text-[0.95rem] font-extrabold tracking-[0.12em] text-gold-hi md:text-[1.05rem]">KINGDOM IMPACT</span>
              <span className="mt-1 block font-caps text-[0.62rem] font-bold tracking-[0.3em] text-cream/80 md:text-[0.68rem]">CHRISTIAN CENTER</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`font-caps text-[0.78rem] font-bold tracking-[0.16em] uppercase transition-colors hover:text-gold-hi ${path === n.href ? "text-gold-hi" : "text-cream/85"}`}
              >
                {n.short}
              </Link>
            ))}
            <Link href="/give" className="btn btn-gold !min-h-[42px] !px-5">
              Give
            </Link>
          </nav>

          <button
            type="button"
            className="flex h-11 items-center gap-2 rounded-sm border border-gold/60 px-3 font-caps text-[0.75rem] font-bold tracking-[0.18em] text-gold-hi lg:hidden"
            aria-expanded={open}
            aria-controls="phone-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>
      </header>

      {open && (
        <div id="phone-menu" className="on-dark fixed inset-x-0 bottom-0 top-[68px] z-50 overflow-y-auto lg:hidden">
          <nav className="wrap flex flex-col py-6" aria-label="Phone">
            {[{ href: "/", label: "Home" }, ...nav, { href: "/give", label: "Give" }].map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="border-b border-gold/25 py-4 font-display text-3xl font-bold text-cream">
                {n.label}
              </Link>
            ))}
            <p className="caps mt-8 text-gold-hi">{church.motto}</p>
          </nav>
        </div>
      )}
    </>
  );
}
