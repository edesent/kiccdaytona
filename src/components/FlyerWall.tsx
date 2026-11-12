"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Phone from "@/components/Phone";
import type { Flyer } from "@/lib/site";

/**
 * The flyer wall. Every flyer the church posts goes in `flyers` (site.ts)
 * with its details typed out, so the date, time, place and contacts are real
 * text people can read, search and tap, not just words inside a picture.
 * Tapping a flyer opens it in a lightbox: the full flyer on one side, the
 * details on the other. Arrow keys move between flyers, Esc closes.
 *
 * The parent passes only flyers that have not expired (see liveFlyers()).
 */
export default function FlyerWall({ flyers, dark = false }: { flyers: Flyer[]; dark?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => {
    setOpen(null);
    lastFocus.current?.focus();
  }, []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + flyers.length) % flyers.length)), [flyers.length]);

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  const f = open === null ? null : flyers[open];

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {flyers.map((fl, i) => (
          <li key={fl.id} data-reveal={i % 4}>
            <button
              type="button"
              onClick={(e) => {
                lastFocus.current = e.currentTarget;
                setOpen(i);
              }}
              className="group block w-full text-left"
              aria-label={`Open the ${fl.title} flyer and its details`}
            >
              <span className="relative block aspect-[4/5] overflow-hidden rounded-sm bg-night shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)] ring-1 ring-gold/50 transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:ring-2 group-hover:ring-gold">
                <Image src={fl.image} alt={fl.alt} fill sizes="(min-width:1024px) 270px, (min-width:768px) 31vw, 46vw" className="object-cover object-top" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night via-night/85 to-transparent px-3 pb-3 pt-10 text-cream opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="caps !text-[0.66rem] text-gold-hi">Open details</span>
                </span>
              </span>
              <span className={`mt-3 block font-display text-lg font-bold leading-tight ${dark ? "text-cream" : "text-ink"}`}>{fl.title}</span>
              <span className={`time mt-0.5 block text-sm ${dark ? "text-gold-hi" : "text-gold-lo"} font-semibold`}>{fl.when}</span>
            </button>
          </li>
        ))}
      </ul>

      {mounted &&
        f &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-stretch justify-center bg-night/92 md:items-center md:p-8" role="dialog" aria-modal="true" aria-label={`${f.title} flyer`} onClick={close}>
            <div className="relative flex max-h-full w-full max-w-[1080px] flex-col overflow-y-auto bg-cream md:max-h-[92vh] md:flex-row md:overflow-hidden md:rounded-sm md:ring-2 md:ring-gold" onClick={(e) => e.stopPropagation()}>
              <div className="flex shrink-0 items-center justify-center bg-night md:w-[52%]">
                <Image key={f.id} src={f.image} alt={f.alt} width={f.w} height={f.h} sizes="(min-width:768px) 560px, 100vw" className="h-auto max-h-[62vh] w-auto max-w-full object-contain md:max-h-[92vh]" priority />
              </div>
              <div className="flex-1 p-6 pb-24 md:overflow-y-auto md:p-9 md:pb-9">
                {f.kicker && <p className="caps text-gold-lo">{f.kicker}</p>}
                <h3 className="display mt-2 text-[2rem] text-forest md:text-[2.5rem]">{f.title}</h3>
                <dl className="mt-6 divide-y divide-[#d9cca6] border-y border-[#d9cca6]">
                  {f.facts.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[92px_1fr] gap-3 py-3">
                      <dt className="caps !text-[0.68rem] pt-1 text-gold-lo">{k}</dt>
                      <dd className="time font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 text-[1.02rem] leading-relaxed">{f.body}</p>
                {f.list && (
                  <ul className="mt-4 space-y-1.5">
                    {f.list.map((l) => (
                      <li key={l} className="flex gap-2.5">
                        <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                        {l}
                      </li>
                    ))}
                  </ul>
                )}
                {f.contacts && (
                  <div className="mt-6">
                    <p className="caps !text-[0.68rem] text-gold-lo">Contact</p>
                    <ul className="mt-2 space-y-1.5">
                      {f.contacts.map((c) => (
                        <li key={c.name}>
                          <span className="font-bold">{c.name}</span> · <Phone b64={c.b64} className="time font-semibold text-forest underline underline-offset-4" fallback="tap to call" />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {f.cta &&
                  (f.cta.href.startsWith("http") ? (
                    <a href={f.cta.href} target="_blank" rel="noopener noreferrer" className="btn btn-forest mt-7">
                      {f.cta.label}
                    </a>
                  ) : (
                    <Link href={f.cta.href} onClick={close} className="btn btn-forest mt-7">
                      {f.cta.label}
                    </Link>
                  ))}
              </div>
              <button ref={closeRef} type="button" onClick={close} className="fixed right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-night text-2xl leading-none text-gold-hi ring-1 ring-gold md:absolute" aria-label="Close flyer">
                ×
              </button>
              {flyers.length > 1 && (
                <div className="fixed inset-x-0 bottom-0 z-10 flex items-center justify-between gap-3 bg-night px-4 py-3 text-cream md:absolute md:inset-x-auto md:bottom-4 md:right-5 md:bg-transparent md:p-0 md:text-ink">
                  <button type="button" onClick={() => step(-1)} className="caps flex h-11 items-center rounded-sm border border-gold px-4 !text-[0.7rem]" aria-label="Previous flyer">
                    ← Prev
                  </button>
                  <span className="time text-sm md:hidden">
                    {open! + 1} of {flyers.length}
                  </span>
                  <button type="button" onClick={() => step(1)} className="caps flex h-11 items-center rounded-sm border border-gold px-4 !text-[0.7rem]" aria-label="Next flyer">
                    Next →
                  </button>
                </div>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
