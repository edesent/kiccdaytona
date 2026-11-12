import type { Metadata } from "next";
import Link from "next/link";
import CashQr from "@/components/CashQr";
import PageHero from "@/components/PageHero";
import { church, giving } from "@/lib/site";

export const metadata: Metadata = {
  title: "Give",
  description: `Give to ${church.name} online through Cash App (${giving.tag}), or in person at any service.`,
};

export default function GivePage() {
  return (
    <>
      <PageHero kicker="Make an impact" title="Give to the work" gold="God is doing here.">
        <p>Tithes, offerings and seeds sown into Kingdom Impact keep the doors open and put coats, groceries and hope into the hands of our neighbors.</p>
      </PageHero>

      <section className="wrap grid gap-12 py-16 md:grid-cols-[1.05fr_1fr] md:py-24">
        <div data-reveal>
          <p className="caps text-gold-lo">Give online</p>
          <h2 className="display mt-3 text-4xl text-forest md:text-5xl">Cash App</h2>
          <p className="time mt-4 inline-block rounded-sm bg-forest px-5 py-3 text-2xl font-extrabold tracking-wide text-gold-hi md:text-3xl">{giving.tag}</p>
          <p className="mt-6 max-w-[46ch] text-lg">
            On your phone, tap the button and Cash App opens with the church already filled in. On a computer, point your phone’s camera at the code. Put a note in the “For” line (Tithe, Offering, Building Fund, Raffle) so it goes where you mean it to.
          </p>
          <a href={giving.url} target="_blank" rel="noopener noreferrer" className="btn btn-gold mt-7">
            {giving.label}
          </a>
          <p className="mt-4 text-sm text-ink/70">The Cash App account shows the name “{giving.accountName}”. That is the right one.</p>
        </div>
        <div data-reveal="1" className="justify-self-center md:justify-self-end">
          <div className="rounded-sm bg-forest p-5 ring-2 ring-gold">
            <CashQr className="h-[250px] w-[250px] bg-white p-2 md:h-[290px] md:w-[290px]" />
            <p className="caps mt-4 text-center text-gold-hi">Scan to give</p>
          </div>
        </div>
      </section>

      <section className="bg-cream-2">
        <div className="wrap grid gap-10 py-16 md:grid-cols-2 md:py-20">
          <div data-reveal>
            <h2 className="display text-3xl text-forest">In person</h2>
            <p className="mt-4 text-lg">Giving is received in every worship service. Cash and checks are both welcome; make checks out to {church.name}.</p>
          </div>
          <div data-reveal="1">
            <h2 className="display text-3xl text-forest">Give something other than money</h2>
            <p className="mt-4 text-lg">The winter coat drive and the holiday pantry take coats, toiletries and non-perishable food, not cash.</p>
            <Link href="/flyers" className="mt-4 inline-block font-bold text-forest underline underline-offset-4">
              See what’s needed on the flyers
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap py-16 text-center md:py-20">
        <p className="mx-auto max-w-[30ch] font-display text-3xl font-bold italic leading-snug text-forest md:text-4xl">“Wherefore we receiving a kingdom which cannot be moved, let us have grace, whereby we may serve God acceptably.”</p>
        <p className="caps mt-5 text-gold-lo">Hebrews 12:28</p>
      </section>
    </>
  );
}
