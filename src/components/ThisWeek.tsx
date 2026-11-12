import Link from "next/link";
import { church, hasAddress } from "@/lib/site";
import { fmtDay, fmtTime, nowInChurch, relativeDay, upcoming } from "@/lib/schedule";

/**
 * "Where to find KICC" — the next few gatherings, each with its place
 * (Zoom, a park, a street corner). It is worked out fresh from the weekly
 * services and dated events in site.ts, so it is never out of date.
 */
export default function ThisWeek({ limit = 5 }: { limit?: number }) {
  const list = upcoming(limit, 45);
  const today = nowInChurch().date;
  const home = hasAddress ? `${church.streetNumber} ${church.street}` : "";

  return (
    <ol className="divide-y divide-[#d9cca6] border-y-2 border-forest">
      {list.map((x, i) => {
        const online = x.where === "On Zoom";
        return (
          <li key={x.title + x.date} data-reveal={i} className="grid grid-cols-[72px_1fr] items-center gap-4 py-5 md:grid-cols-[104px_1.3fr_1fr] md:gap-8 md:py-6">
            <div className={`flex aspect-square flex-col items-center justify-center rounded-sm text-center ${x.date === today ? "bg-gold text-night" : "bg-forest text-cream"}`}>
              <span className="caps !text-[0.62rem] md:!text-[0.7rem]">{fmtDay(x.date, { weekday: "short" })}</span>
              <span className="time text-[1.9rem] font-extrabold leading-none md:text-[2.6rem]">{Number(x.date.slice(8))}</span>
              <span className="caps !text-[0.58rem] md:!text-[0.66rem]">{fmtDay(x.date, { month: "short" })}</span>
            </div>
            <div>
              <p className="time text-sm font-bold text-gold-lo">
                {relativeDay(x.date)} · {x.when ?? fmtTime(x.time24)}
              </p>
              <h3 className="font-display text-[1.45rem] font-bold leading-tight text-forest md:text-[1.9rem]">{x.title}</h3>
              <p className="mt-1 text-[0.95rem] text-ink/80 md:hidden">{x.where ?? home}</p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="hidden font-semibold md:block">
                <span className={`caps mr-2 !text-[0.62rem] ${online ? "text-emerald" : "text-wine"}`}>{online ? "Online" : "In person"}</span>
                {x.where ?? home}
              </p>
              <p className="text-[0.95rem] text-ink/80 md:mt-1">{x.note}</p>
              {x.href && (
                <Link href={x.href} className="mt-1 inline-block text-sm font-bold text-forest underline underline-offset-4">
                  Details
                </Link>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
