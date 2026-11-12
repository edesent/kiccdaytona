import Link from "next/link";
import Phone from "@/components/Phone";
import Seal from "@/components/Seal";
import { church, hasAddress, nav, services } from "@/lib/site";
import { fmtTime } from "@/lib/schedule";

const DAYS = ["Sundays", "Mondays", "Tuesdays", "Wednesdays", "Thursdays", "Fridays", "Saturdays"];

export default function Footer() {
  return (
    <footer className="on-dark">
      <div className="rim" />
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.1fr_1fr_1fr]">
        <div>
          <Seal uid="ftr" className="h-36 w-36" />
          <p className="mt-6 font-display text-2xl font-bold italic text-gold-hi">{church.motto}</p>
          <p className="mt-2 text-sm text-cream/70">Hebrews 12:28–29</p>
        </div>
        <div>
          <p className="caps text-gold-hi">Gather with us</p>
          <ul className="mt-4 space-y-3">
            {services.map((s) => (
              <li key={s.id}>
                <span className="block font-bold">{s.name}</span>
                <span className="time text-cream/80">
                  {DAYS[s.dow]} · {fmtTime(s.time24)}
                  {s.online ? " · Zoom" : ""}
                </span>
              </li>
            ))}
          </ul>
          {hasAddress ? (
            <address className="mt-6 not-italic text-cream/85">
              {church.streetNumber} {church.street}
              <br />
              {church.city}, {church.stateCode} {church.zip}
            </address>
          ) : (
            <p className="mt-6 text-cream/85">
              {church.city}, {church.state}
              <br />
              New location coming soon
            </p>
          )}
          <Phone className="mt-2 inline-block font-bold text-gold-hi underline-offset-4 hover:underline" />
        </div>
        <div>
          <p className="caps text-gold-hi">Find your way</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
            {[...nav, { href: "/give", label: "Give" }, { href: "/contact", label: "Contact" }].map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-gold-hi">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href={church.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-line mt-7 !min-h-[44px]">
            Follow KICC on Facebook
          </a>
        </div>
      </div>
      <div className="border-t border-gold/25">
        <div className="wrap flex flex-col gap-1 py-5 text-xs text-cream/60 sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {church.name}, Inc. Est. 2023.
          </span>
          <span>Let’s KICC it with Pastor J and Lady Q.</span>
        </div>
      </div>
    </footer>
  );
}
