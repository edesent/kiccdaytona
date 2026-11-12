import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Phone from "@/components/Phone";
import ThisWeek from "@/components/ThisWeek";
import { church, hasAddress, pastor } from "@/lib/site";

export const metadata: Metadata = {
  title: "Find us",
  description: `Where ${church.name} is meeting this week: Bible study and women’s prayer on Zoom, and outreach around Daytona Beach while the new location is prepared.`,
};

export default function VisitPage() {
  const address = `${church.streetNumber} ${church.street}, ${church.city}, ${church.stateCode} ${church.zip}`;
  return (
    <>
      <PageHero kicker="Find us" title={hasAddress ? "Come see us at" : "New location"} gold={hasAddress ? "our new home." : "coming soon."}>
        {hasAddress ? (
          <p>{address}</p>
        ) : (
          <p>Kingdom Impact is between buildings, and ministry keeps moving. Here is exactly where to find us until the new doors open.</p>
        )}
      </PageHero>

      <section className="wrap py-16 md:py-24">
        <h2 data-reveal className="display text-[2.3rem] text-forest md:text-[3.2rem]">
          The next places you’ll find KICC
        </h2>
        <div className="mt-8">
          <ThisWeek limit={7} />
        </div>
        <Link href="/calendar" className="btn btn-forest mt-8">
          Full calendar
        </Link>
      </section>

      {hasAddress && (
        <section className="bg-cream-2">
          <div className="wrap py-16">
            <iframe title={`Map to ${church.name}`} src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`} className="h-[420px] w-full rounded-sm ring-1 ring-gold" loading="lazy" />
            <a href={church.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-forest mt-6">
              Directions
            </a>
          </div>
        </section>
      )}

      <section className="bg-cream-2">
        <div className="wrap grid gap-10 py-16 md:grid-cols-3 md:py-20">
          <div data-reveal>
            <p className="caps text-gold-lo">On Zoom</p>
            <h3 className="display mt-2 text-2xl text-forest">How do I get the link?</h3>
            <p className="mt-3">
              Send a message and choose “Zoom link”, or call Sr. Elder Jeanette Holland. You’ll have it the same day. Cameras are welcome and not required.
            </p>
            <Link href="/contact?about=Zoom%20link%20for%20Thursday%20Bible%20study" className="mt-3 inline-block font-bold text-forest underline underline-offset-4">
              Ask for the link
            </Link>
          </div>
          <div data-reveal="1">
            <p className="caps text-gold-lo">In the streetz</p>
            <h3 className="display mt-2 text-2xl text-forest">What should I expect?</h3>
            <p className="mt-3">Come as you are. Outreach days are outdoors: tents, tables, music, the Kidz & Krew in orange shirts, and people glad you came. Nobody will ask you for anything.</p>
          </div>
          <div data-reveal="2">
            <p className="caps text-gold-lo">On Sundays</p>
            <h3 className="display mt-2 text-2xl text-forest">Where is worship?</h3>
            <p className="mt-3">
              {hasAddress ? `At ${address}.` : "The Sunday gathering place will be posted here with the new location."} To find out about this Sunday, call <Phone className="font-bold text-forest underline underline-offset-4" fallback="the church" /> or message us on Facebook.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap py-16 text-center md:py-20">
        <p className="mx-auto max-w-[32ch] font-display text-3xl font-bold italic leading-snug text-forest md:text-4xl">“Let’s KICC it with Pastor J and Lady Q.”</p>
        <p className="caps mt-5 text-gold-lo">
          {pastor.styled} & {pastor.wife}
        </p>
      </section>
    </>
  );
}
