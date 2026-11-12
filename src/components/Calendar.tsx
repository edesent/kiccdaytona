"use client";

import { useState } from "react";

export type CalDay = { date: string; items: { title: string; time: string; kind: string; note: string }[] };
export type CalMonth = { ym: string; label: string; lead: number; days: CalDay[] };

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * The church calendar. It fills itself in: the server builds each month from
 * the weekly services and the dated events in site.ts, so nobody has to
 * retype "Sunday worship" every week. Tap a day to see what is on.
 */
export default function Calendar({ months, today }: { months: CalMonth[]; today: string }) {
  const [m, setM] = useState(0);
  const month = months[m];
  const firstBusy = month.days.find((d) => d.date >= today && d.items.length)?.date ?? month.days.find((d) => d.items.length)?.date ?? month.days[0].date;
  const [picked, setPicked] = useState<string | null>(null);
  const sel = month.days.find((d) => d.date === (picked ?? firstBusy)) ?? month.days[0];

  const go = (d: number) => {
    setM((i) => Math.min(months.length - 1, Math.max(0, i + d)));
    setPicked(null);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr]">
      <div className="rounded-sm bg-[#fffdf6] p-4 shadow-[0_24px_60px_-30px_rgba(12,42,29,0.55)] ring-1 ring-[#d9cca6] sm:p-6">
        <div className="flex items-center justify-between">
          <button type="button" onClick={() => go(-1)} disabled={m === 0} className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-lo text-xl text-forest disabled:opacity-25" aria-label="Previous month">
            ←
          </button>
          <p className="display text-2xl text-forest sm:text-3xl" aria-live="polite">
            {month.label}
          </p>
          <button type="button" onClick={() => go(1)} disabled={m === months.length - 1} className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-lo text-xl text-forest disabled:opacity-25" aria-label="Next month">
            →
          </button>
        </div>
        <div className="mt-5 grid grid-cols-7 gap-1 text-center sm:gap-1.5">
          {DOW.map((d) => (
            <div key={d} className="caps !text-[0.62rem] pb-1 text-gold-lo">
              {d}
            </div>
          ))}
          {Array.from({ length: month.lead }, (_, i) => (
            <div key={`x${i}`} />
          ))}
          {month.days.map((d) => {
            const day = Number(d.date.slice(8));
            const past = d.date < today;
            const isSel = d.date === sel.date;
            const hasEvent = d.items.some((x) => x.kind === "event");
            return (
              <button
                key={d.date}
                type="button"
                onClick={() => setPicked(d.date)}
                aria-pressed={isSel}
                aria-label={`${month.label.split(" ")[0]} ${day}: ${d.items.length ? d.items.map((x) => x.title).join(", ") : "nothing scheduled"}`}
                className={`time relative flex aspect-square flex-col items-center justify-center rounded-sm text-[0.95rem] font-semibold transition-colors ${
                  isSel ? "bg-forest text-gold-hi" : d.items.length ? "bg-cream-2 text-ink hover:bg-[#e6d9b4]" : "text-ink/45 hover:bg-cream"
                } ${past && !isSel ? "opacity-45" : ""} ${d.date === today ? "ring-2 ring-gold" : ""}`}
              >
                {day}
                {d.items.length > 0 && (
                  <span className="absolute bottom-1.5 flex gap-0.5">
                    {d.items.slice(0, 3).map((x, i) => (
                      <span key={i} className={`h-1.5 w-1.5 rounded-full ${x.kind === "event" ? "bg-wine" : isSel ? "bg-gold-hi" : "bg-emerald"} ${hasEvent && isSel && x.kind === "event" ? "!bg-gold-hi" : ""}`} />
                    ))}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-ink/70">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald" /> Every week
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-wine" /> Special event
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm ring-2 ring-gold" /> Today
          </span>
        </p>
      </div>

      <div>
        <p className="caps text-gold-lo">
          {new Date(`${sel.date}T12:00:00Z`).toLocaleDateString("en-US", { timeZone: "UTC", weekday: "long", month: "long", day: "numeric" })}
        </p>
        {sel.items.length === 0 ? (
          <p className="mt-4 text-lg">Nothing on the calendar this day. Pick a day with a dot.</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {sel.items.map((x, i) => (
              <li key={i} className={`border-l-4 pl-4 ${x.kind === "event" ? "border-wine" : "border-emerald"}`}>
                <p className="time text-sm font-bold text-gold-lo">{x.time}</p>
                <p className="font-display text-2xl font-bold leading-tight text-forest">{x.title}</p>
                <p className="mt-1 text-[0.98rem]">{x.note}</p>
              </li>
            ))}
          </ul>
        )}
        <a href="/calendar.ics" className="btn btn-forest mt-8">
          Add KICC to my phone’s calendar
        </a>
        <p className="mt-3 text-sm text-ink/70">One tap puts every weekly gathering and special date on your own calendar.</p>
      </div>
    </div>
  );
}
