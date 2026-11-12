import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import Phone from "@/components/Phone";
import { church, hasAddress } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${church.name} in ${church.city}, ${church.state}.`,
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ about?: string }> }) {
  const { about } = await searchParams;
  return (
    <>
      <PageHero kicker="Contact" title="We’d love to" gold="hear from you.">
        <p>Ask a question, get the Zoom link for Thursday Bible study, or find out where to drop off a coat.</p>
      </PageHero>
      <section className="wrap grid gap-12 py-16 md:grid-cols-[1.25fr_1fr] md:py-24">
        <div data-reveal>
          <ContactForm topic={about} />
        </div>
        <aside data-reveal="1" className="self-start">
          <p className="caps text-gold-lo">Call</p>
          <Phone className="time mt-2 block text-2xl font-extrabold text-forest" />
          <p className="caps mt-8 text-gold-lo">{hasAddress ? "Come by" : "Where we are"}</p>
          {hasAddress ? (
            <>
              <address className="mt-2 text-lg not-italic">
                {church.streetNumber} {church.street}
                <br />
                {church.city}, {church.stateCode} {church.zip}
              </address>
              <a href={church.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-bold text-forest underline underline-offset-4">
                Directions
              </a>
            </>
          ) : (
            <p className="mt-2 text-lg">
              New location coming soon.{" "}
              <Link href="/visit" className="font-bold text-forest underline underline-offset-4">
                See where KICC is this week
              </Link>
            </p>
          )}
          <p className="caps mt-8 text-gold-lo">Need prayer?</p>
          <Link href="/prayer" className="mt-2 inline-block text-lg font-bold text-forest underline underline-offset-4">
            Send a prayer request
          </Link>
          <p className="caps mt-8 text-gold-lo">Facebook</p>
          <a href={church.facebook} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-lg font-bold text-forest underline underline-offset-4">
            Kingdom Impact Christian Center
          </a>
        </aside>
      </section>
    </>
  );
}
