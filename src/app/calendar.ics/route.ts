import { church, events, services, siteUrl, TZ } from "@/lib/site";
import { addDays, nowInChurch, weekday } from "@/lib/schedule";

/**
 * /calendar.ics — the whole church calendar as a subscription file. Weekly
 * gatherings repeat (RRULE); dated events come from `events` in site.ts and
 * drop out after their `endsOn`.
 */
export const revalidate = 3600;

const BYDAY = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/([,;])/g, "\\$1");
const d8 = (iso: string) => iso.replace(/-/g, "");
const t6 = (t: string) => t.replace(":", "") + "00";

export function GET() {
  const today = nowInChurch().date;
  const where = `${church.streetNumber} ${church.street}, ${church.city}, ${church.stateCode} ${church.zip}`;
  const stamp = new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", `PRODID:-//${church.short}//Church Calendar//EN`, "CALSCALE:GREGORIAN", `X-WR-CALNAME:${esc(church.name)}`, `X-WR-TIMEZONE:${TZ}`];

  for (const s of services) {
    let first = today;
    while (weekday(first) !== s.dow) first = addDays(first, 1);
    const [h, m] = s.time24.split(":").map(Number);
    const endMin = Math.min(23 * 60 + 59, h * 60 + m + (s.minutes ?? 90));
    const end = `${String(Math.floor(endMin / 60)).padStart(2, "0")}:${String(endMin % 60).padStart(2, "0")}`;
    lines.push(
      "BEGIN:VEVENT",
      `UID:${s.id}@${new URL(siteUrl).hostname}`,
      `DTSTAMP:${stamp}`,
      `DTSTART;TZID=${TZ}:${d8(first)}T${t6(s.time24)}`,
      `DTEND;TZID=${TZ}:${d8(first)}T${t6(end)}`,
      `RRULE:FREQ=WEEKLY;BYDAY=${BYDAY[s.dow]}`,
      `SUMMARY:${esc(`${s.name} · ${church.short}`)}`,
      `LOCATION:${esc(s.online ? "On Zoom" : where)}`,
      `DESCRIPTION:${esc(s.note)}`,
      "END:VEVENT",
    );
  }

  for (const e of events) {
    if (e.endsOn < today) continue;
    lines.push("BEGIN:VEVENT", `UID:${e.id}@${new URL(siteUrl).hostname}`, `DTSTAMP:${stamp}`);
    if (e.time24) lines.push(`DTSTART;TZID=${TZ}:${d8(e.start)}T${t6(e.time24)}`, "DURATION:PT2H");
    else lines.push(`DTSTART;VALUE=DATE:${d8(e.start)}`, `DTEND;VALUE=DATE:${d8(addDays(e.endsOn, 1))}`);
    lines.push(`SUMMARY:${esc(`${e.title} · ${church.short}`)}`, `LOCATION:${esc(e.where ?? where)}`, `DESCRIPTION:${esc(e.summary)}`, "END:VEVENT");
  }

  lines.push("END:VCALENDAR");
  return new Response(lines.join("\r\n"), {
    headers: { "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": 'inline; filename="kingdom-impact.ics"' },
  });
}
