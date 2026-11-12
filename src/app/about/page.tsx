import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Seal from "@/components/Seal";
import { church, installation, pastor } from "@/lib/site";
import { fmtDay } from "@/lib/schedule";

export const metadata: Metadata = {
  title: "About",
  description: `${church.name}, established 2023 in Daytona Beach, Florida, led by ${pastor.styled} and ${pastor.wife}.`,
};

const QUARTERS = [
  { name: "The open Bible", text: "The Word comes first. Thursday night Bible study is where KICC Nation goes deeper in it." },
  { name: "The globe", text: "The assignment is bigger than a building. Outreach is not what we do, it’s who we are." },
  { name: "The cross", text: "Everything stands on what Jesus finished. He gets all the glory." },
  { name: "The dove", text: "The Holy Spirit leads, comforts and sends. We pray first, then we move." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero kicker="About Kingdom Impact" title="Love God. Love people." gold="Make an impact.">
        <p>A Daytona Beach church family established in 2023, known around town as KICC Nation.</p>
      </PageHero>

      {/* Pastors */}
      <section className="wrap grid gap-12 py-16 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div data-reveal className="relative">
          <Image
            src="/photos/pastors-sunday-banner.jpg"
            alt="Lady Qutila Simmons in a plaid jacket and Apostle-Elect J. DeNard Simmons in a red clergy shirt and black vest, smiling together behind a small lectern with a closed Bible on it."
            width={960}
            height={800}
            sizes="(min-width:1024px) 480px, 92vw"
            className="w-full rounded-sm ring-2 ring-gold"
          />
        </div>
        <div data-reveal="1">
          <p className="caps text-gold-lo">Our lead pastors</p>
          <h2 className="display mt-3 text-[2.5rem] text-forest md:text-[3.6rem]">Pastor J and Lady Q</h2>
          <p className="mt-5 text-lg">
            Kingdom Impact Christian Center is led by <strong>{pastor.styled}</strong> and <strong>{pastor.wife}</strong>. He sings, he preaches, he teaches (and, as the flyer says, the anointing reaches the oven). She leads God Hears Her, the women’s ministry, as its “VisionHERy.”
          </p>
          <p className="mt-4 text-lg">Together they have kept this church praying, serving and showing up for its city, with a building and without one.</p>
          <blockquote className="mt-7 border-l-4 border-gold pl-6 font-display text-2xl font-bold italic leading-snug text-forest">“God gets all the glory.”</blockquote>
        </div>
      </section>

      {/* The seal */}
      <section className="on-dark">
        <div className="rim" />
        <div className="wrap grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[auto_1fr] lg:gap-20">
          <Seal uid="about" className="mx-auto h-[280px] w-[280px] md:h-[400px] md:w-[400px]" />
          <div>
            <p className="caps text-gold-hi">What the seal says</p>
            <h2 className="display mt-3 text-[2.4rem] text-cream md:text-[3.4rem]">A crown over four quarters</h2>
            <dl className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {QUARTERS.map((q, i) => (
                <div key={q.name} data-reveal={i} className="border-t border-gold/40 pt-4">
                  <dt className="font-display text-xl font-bold text-gold-hi">{q.name}</dt>
                  <dd className="mt-1 text-cream/85">{q.text}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 max-w-[58ch] font-display text-xl italic text-cream/90">
              “Wherefore we receiving a kingdom which cannot be moved, let us have grace, whereby we may serve God acceptably with reverence and godly fear: for our God is a consuming fire.”
            </p>
            <p className="caps mt-3 text-gold-hi">Hebrews 12:28–29 · on the seal since MMXXIII</p>
          </div>
        </div>
      </section>

      {/* Ministries */}
      <section className="wrap py-16 md:py-24">
        <p className="caps text-gold-lo">The family</p>
        <h2 className="display mt-3 text-[2.4rem] text-forest md:text-[3.4rem]">Who you’ll meet</h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <Image
            src="/photos/streetz-kidz-krew-group.jpg"
            alt="The Kingdom Kulture Kidz & Krew, about two dozen children and teens in orange T-shirts, with their leaders in front of the outreach tent."
            width={1440}
            height={1080}
            sizes="(min-width:1024px) 600px, 92vw"
            data-reveal
            className="w-full rounded-sm"
          />
          <dl className="divide-y divide-[#d9cca6] border-y border-[#d9cca6]">
            {[
              ["Kingdom Kulture Kidz & Krew", "The children and youth of the house. You’ll know them by the orange shirts, and by the car wash on November 28."],
              ["God Hears Her", "Women’s ministry led by Prophetess Lady Qutila Simmons: Saturday prayer on Zoom, Worship & Waves on the beach, SisMas in December."],
              ["KICC-N the Streetz", "Community giveback led by Outreach Director Minister Naylene Bartell: food, clothes, toiletries and coats, handed out where people are."],
              ["Recharged Bible Study", "Thursday nights on Zoom with Apostle-Elect Simmons. Bring your Bible and your questions."],
            ].map(([k, v], i) => (
              <div key={k} data-reveal={i} className="py-5">
                <dt className="font-display text-2xl font-bold text-forest">{k}</dt>
                <dd className="mt-1 text-[1.02rem]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Installation */}
      <section className="bg-cream-2">
        <div className="wrap py-16 text-center md:py-20">
          <p className="caps text-gold-lo">Coming up</p>
          <h2 className="display mx-auto mt-3 max-w-[20ch] text-[2.3rem] text-forest md:text-[3.3rem]">The Apostolic Installation & church anniversary</h2>
          <p className="mx-auto mt-4 max-w-[56ch] text-lg">
            {installation.date
              ? `${fmtDay(installation.date, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}${installation.time ? ` · ${installation.time}` : ""}${installation.where ? ` · ${installation.where}` : ""}`
              : "The date and place will be posted here and on the calendar as soon as they are set."}
          </p>
          <Link href="/contact" className="btn btn-forest mt-7">
            Send me the details
          </Link>
        </div>
      </section>
    </>
  );
}
