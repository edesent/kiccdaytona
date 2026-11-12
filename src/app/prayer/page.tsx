import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Phone from "@/components/Phone";
import PrayerForm from "@/components/PrayerForm";
import { church } from "@/lib/site";

export const metadata: Metadata = {
  title: "Prayer requests",
  description: `Send a prayer request to the pastors and prayer team at ${church.name} in Daytona Beach.`,
};

export default function PrayerPage() {
  return (
    <>
      <PageHero kicker="Love people" title="Tell us how" gold="we can pray.">
        <p>You don’t have to have it all together to come before Him. Send your request and our pastors and prayer team will carry it with you.</p>
      </PageHero>
      <section className="wrap grid gap-12 py-16 md:grid-cols-[1.25fr_1fr] md:py-24">
        <div data-reveal>
          <PrayerForm />
        </div>
        <aside data-reveal="1" className="self-start rounded-sm bg-forest p-8 text-cream ring-1 ring-gold">
          <p className="caps text-gold-hi">What happens next</p>
          <ul className="mt-5 space-y-4">
            <li>Your request goes straight to the pastors. Nothing is posted on this website.</li>
            <li>Tick “keep this between me and the pastors” and it stays with them alone.</li>
            <li>Ask for a call and someone will phone and pray with you.</li>
          </ul>
          <p className="mt-7 border-t border-gold/30 pt-6">
            Would you rather talk? <Phone className="font-bold text-gold-hi underline underline-offset-4" fallback="Call the church" />
          </p>
          <p className="mt-6 font-display text-xl italic text-gold-hi">“The God who commands the waves hears her. He hears you.”</p>
        </aside>
      </section>
    </>
  );
}
