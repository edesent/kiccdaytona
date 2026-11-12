import type { Metadata } from "next";
import Calendar, { type CalMonth } from "@/components/Calendar";
import PageHero from "@/components/PageHero";
import { church } from "@/lib/site";
import { addDays, addMonths, daysInMonth, eventsOn, fmtTime, monthOf, nowInChurch, servicesOn, weekday } from "@/lib/schedule";

export const metadata: Metadata = {
  title: "Calendar",
  description: `The ${church.name} calendar: weekly Bible study and women’s prayer on Zoom, outreach days, drives and special events.`,
};

/** Builds four months of calendar from the weekly services and dated events in site.ts. */
function buildMonths(count: number): { months: CalMonth[]; today: string } {
  const today = nowInChurch().date;
  const months: CalMonth[] = [];
  for (let i = 0; i < count; i++) {
    const ym = addMonths(monthOf(today), i);
    const first = `${ym}-01`;
    const days = Array.from({ length: daysInMonth(ym) }, (_, d) => {
      const date = addDays(first, d);
      const items = [
        ...eventsOn(date).map((e) => ({ title: e.title, time: e.when ?? (e.time24 ? fmtTime(e.time24) : "All day"), kind: "event", note: [e.where, e.summary].filter(Boolean).join(". "), sort: e.time24 ?? "00:00" })),
        ...servicesOn(date).map((s) => ({ title: s.title, time: `${fmtTime(s.time24)}${s.where ? ` · ${s.where}` : ""}`, kind: s.kind, note: s.note, sort: s.time24 })),
      ]
        .sort((a, b) => a.sort.localeCompare(b.sort))
        .map(({ sort: _s, ...x }) => x);
      return { date, items };
    });
    months.push({
      ym,
      label: new Date(`${first}T12:00:00Z`).toLocaleDateString("en-US", { timeZone: "UTC", month: "long", year: "numeric" }),
      lead: weekday(first),
      days,
    });
  }
  return { months, today };
}

export default function CalendarPage() {
  const { months, today } = buildMonths(4);
  return (
    <>
      <PageHero kicker="Church calendar" title="Every date," gold="in one place.">
        <p>Weekly gatherings fill themselves in. Special days are marked in red. Tap any day to see what’s on and where.</p>
      </PageHero>
      <section className="wrap py-14 md:py-20">
        <Calendar months={months} today={today} />
      </section>
    </>
  );
}
