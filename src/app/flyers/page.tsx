import type { Metadata } from "next";
import FlyerWall from "@/components/FlyerWall";
import PageHero from "@/components/PageHero";
import { church } from "@/lib/site";
import { liveFlyers } from "@/lib/schedule";

export const metadata: Metadata = {
  title: "Flyers",
  description: `Current flyers from ${church.name}: outreach drives, the Kidz & Krew car wash, the Christmas raffle, God Hears Her and Bible study, each with its details written out.`,
};

export default function FlyersPage() {
  const flyers = liveFlyers();
  return (
    <>
      <PageHero kicker="Flyers" title="What’s happening" gold="at KICC.">
        <p>Tap a flyer to open it full size. The date, time, place and who to call are typed out beside it. Flyers take themselves down when the date has passed.</p>
      </PageHero>
      <section className="wrap py-14 md:py-20">
        <FlyerWall flyers={flyers} />
      </section>
    </>
  );
}
