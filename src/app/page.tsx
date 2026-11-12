import Image from "next/image";
import Link from "next/link";
import CashQr from "@/components/CashQr";
import FlyerWall from "@/components/FlyerWall";
import PrayerForm from "@/components/PrayerForm";
import Seal from "@/components/Seal";
import ThisWeek from "@/components/ThisWeek";
import { church, giving, hasAddress, installation, pastor } from "@/lib/site";
import { fmtDay, liveFlyers, nowInChurch } from "@/lib/schedule";

/**
 * Home. The idea comes from two things the church said itself: the verse on
 * its seal (Hebrews 12:28, "a kingdom which cannot be moved") and its Nov 1
 * post, "Our address may be changing, but our commitment to God's people
 * remains strong." The page is the church's front door while it is between
 * buildings, then walks through the motto: Love God. Love People. Make an Impact.
 */
export default function Home() {
  const flyers = liveFlyers();
  const raffleOpen = nowInChurch().date <= "2026-12-15";

  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="on-dark relative overflow-hidden">
        <div className="rays pointer-events-none absolute -right-[20%] -top-[30%] h-[1100px] w-[1100px] md:right-[-8%]" />
        <div className="wrap relative grid items-center gap-10 pb-16 pt-12 md:pb-24 md:pt-20 lg:grid-cols-[1.08fr_1fr] lg:gap-14">
          <div>
            <p className="caps text-gold-hi">
              {church.name} · {church.city}
            </p>
            <h1 className="display mt-5 text-[3.35rem] text-cream [text-wrap:balance] sm:text-[4.6rem] lg:text-[5.6rem]">
              A kingdom which <em className="foil pr-3">cannot be moved.</em>
            </h1>
            <p className="caps mt-5 text-gold-hi/90">Hebrews 12:28 · the verse on our seal</p>
            <p className="mt-6 max-w-[50ch] text-[1.15rem] leading-relaxed text-cream/90 md:text-[1.25rem]">
              {hasAddress ? "We have a new home. " : "Our address is changing. Our assignment isn’t. "}
              KICC Nation is still praying, still serving and still making an impact: on Zoom, on the beach, and in the streetz of Daytona Beach.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#this-week" className="btn btn-gold">
                Where we are this week
              </a>
              <Link href="/prayer" className="btn btn-line">
                Prayer request
              </Link>
              <Link href="/give" className="btn btn-line">
                Give
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="relative overflow-hidden rounded-t-[999px] rounded-b-sm ring-[3px] ring-gold shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]">
              <Image
                src="/photos/pastors-clergy.jpg"
                alt="Apostle-Elect J. DeNard Simmons in a purple clergy shirt and black vest, and Prophetess Lady Qutila Simmons in a pink clergy shirt, standing side by side and smiling."
                width={960}
                height={960}
                priority
                sizes="(min-width:1024px) 520px, 92vw"
                className="aspect-[4/5] w-full object-cover object-[50%_18%]"
              />
            </div>
            <div className="relative flex items-start gap-4 sm:gap-5">
              <Seal uid="hero" spin className="-ml-2 -mt-16 h-[132px] w-[132px] shrink-0 drop-shadow-[0_14px_26px_rgba(0,0,0,0.75)] sm:-ml-8 sm:-mt-24 sm:h-[190px] sm:w-[190px]" />
              <div className="pt-4 sm:pt-5">
                <p className="font-display text-[1.02rem] font-bold leading-tight text-cream sm:text-[1.2rem]">
                  {pastor.styled}
                  <br />& {pastor.wife}
                </p>
                <p className="caps mt-1.5 !text-[0.6rem] text-gold-hi sm:!text-[0.68rem]">Lead pastors · “Pastor J and Lady Q”</p>
              </div>
            </div>
          </div>
        </div>
        <div className="rim" />
      </section>

      {/* ───────── Where we are this week ───────── */}
      <section id="this-week" className="scroll-mt-24 bg-cream">
        <div className="wrap py-16 md:py-24">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div data-reveal>
              <p className="caps text-gold-lo">No walls for a season. No pause in the work.</p>
              <h2 className="display mt-3 text-[2.6rem] text-forest md:text-[4rem]">Where to find KICC this week</h2>
            </div>
            {!hasAddress && (
              <div data-reveal="1" className="rounded-sm bg-forest p-6 text-cream ring-1 ring-gold">
                <p className="caps text-gold-hi">New location coming soon</p>
                <p className="mt-2 text-[1.02rem]">“Our address may be changing, but our commitment to God’s people remains strong.” The new address will be posted right here the day it’s announced.</p>
                <Link href="/contact" className="mt-3 inline-block font-bold text-gold-hi underline underline-offset-4">
                  Tell me when it’s announced
                </Link>
              </div>
            )}
          </div>
          <div className="mt-10">
            <ThisWeek limit={5} />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/calendar" className="btn btn-forest">
              Full church calendar
            </Link>
            <a href="/calendar.ics" className="btn border-[1.5px] border-forest text-forest">
              Add it to my phone
            </a>
          </div>
        </div>
      </section>

      {/* ───────── I. Love God ───────── */}
      <section className="on-dark relative overflow-hidden">
        <div className="rim" />
        <div className="wrap grid gap-12 py-16 md:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div data-reveal>
            <p className="font-display text-[5.5rem] font-black leading-none text-gold/35 md:text-[7.5rem]">I</p>
            <h2 className="display -mt-3 text-[3.2rem] text-cream md:text-[4.6rem]">
              Love <em className="foil pr-2">God.</em>
            </h2>
            <p className="mt-5 max-w-[42ch] text-lg text-cream/85">Deeper in the Word. Stronger in faith. Until the new doors open, the Word goes out over Zoom twice a week, and anyone can come.</p>
          </div>

          <div data-reveal="1" className="space-y-6">
            {/* The Thursday ticket */}
            <div className="ticket grid md:grid-cols-[1fr_210px]">
              <div className="p-7 md:p-9">
                <p className="caps text-wine">Are you ready to be recharged?</p>
                <p className="display mt-2 text-[2.4rem] text-forest md:text-[3rem]">Bible Study</p>
                <p className="mt-1 font-display text-xl italic text-forest/80">with {pastor.styled}</p>
                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
                  <div>
                    <dt className="caps !text-[0.62rem] text-gold-lo">Every</dt>
                    <dd className="time text-xl font-extrabold">Thursday</dd>
                  </div>
                  <div>
                    <dt className="caps !text-[0.62rem] text-gold-lo">Time</dt>
                    <dd className="time text-xl font-extrabold">7:30 PM</dd>
                  </div>
                  <div>
                    <dt className="caps !text-[0.62rem] text-gold-lo">Where</dt>
                    <dd className="time text-xl font-extrabold">On Zoom</dd>
                  </div>
                  <div>
                    <dt className="caps !text-[0.62rem] text-gold-lo">Bring</dt>
                    <dd className="time text-xl font-extrabold">Your Bible</dd>
                  </div>
                </dl>
              </div>
              <div className="perf flex flex-col items-center justify-center gap-4 p-7 text-center">
                <p className="caps !text-[0.66rem] text-forest">Admit all</p>
                <p className="font-display text-[1.35rem] font-bold italic leading-tight text-forest">Come expecting. Leave recharged.</p>
                <Link href="/contact?about=Zoom%20link%20for%20Thursday%20Bible%20study" className="btn btn-forest !min-h-[46px] !px-4 !text-[0.72rem]">
                  Get the Zoom link
                </Link>
              </div>
            </div>

            <div className="grid gap-5 rounded-sm border border-gold/50 p-6 sm:grid-cols-[1fr_auto] sm:items-center md:p-7">
              <div>
                <p className="caps text-gold-hi">God Hears Her · women’s ministry</p>
                <p className="mt-2 font-display text-2xl font-bold text-cream">
                  <span className="time">Saturdays · 8:00 AM</span> on Zoom
                </p>
                <p className="mt-1 text-cream/80">A safe place to pray, grow and walk in purpose, with {pastor.wife}.</p>
              </div>
              <Link href="/contact?about=God%20Hears%20Her%20women%E2%80%99s%20ministry" className="btn btn-line !min-h-[46px]">
                Join her
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── II. Love People ───────── */}
      <section className="bg-cream">
        <div className="wrap py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-end">
            <div data-reveal>
              <p className="font-display text-[5.5rem] font-black leading-none text-gold/50 md:text-[7.5rem]">II</p>
              <h2 className="display -mt-3 text-[3.2rem] text-forest md:text-[4.6rem]">
                Love <em className="text-wine">people.</em>
              </h2>
            </div>
            <blockquote data-reveal="1" className="border-l-4 border-gold pl-6">
              <p className="font-display text-[1.7rem] font-bold italic leading-snug text-forest md:text-[2.1rem]">“Outreach is not what we do, it’s who we are.”</p>
              <footer className="caps mt-3 text-gold-lo">Printed on every KICC-N the Streetz shirt · Matthew 25:35</footer>
            </blockquote>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-12 md:gap-5">
            <figure data-reveal className="md:col-span-7 md:h-full">
              <Image
                src="/photos/streetz-team-tent.jpg"
                alt="Five KICC volunteers, with Apostle-Elect Simmons and Lady Qutila in the middle, laughing and throwing peace signs under a blue tent behind a table of bagged toiletries. Their shirts read KICC-N the Streetz."
                width={1440}
                height={1080}
                sizes="(min-width:768px) 58vw, 100vw"
                className="aspect-[4/3] w-full rounded-sm object-cover md:aspect-auto md:h-full"
              />
            </figure>
            <div className="grid gap-4 md:col-span-5 md:gap-5">
              <Image
                src="/photos/streetz-kidz-krew-group.jpg"
                alt="About two dozen children and teens of the Kingdom Kulture Kidz & Krew in bright orange T-shirts, lined up with their leaders in front of the outreach tent."
                width={1440}
                height={1080}
                sizes="(min-width:768px) 40vw, 100vw"
                data-reveal="1"
                className="aspect-[16/10] w-full rounded-sm object-cover object-[50%_42%]"
              />
              <Image
                src="/photos/streetz-hygiene-kits.jpg"
                alt="Volunteers sorting rows of bagged toiletry kits on folding tables under the tent."
                width={1440}
                height={1080}
                sizes="(min-width:768px) 40vw, 100vw"
                data-reveal="2"
                className="aspect-[16/10] w-full rounded-sm object-cover"
              />
            </div>
          </div>
          <p data-reveal className="mt-6 max-w-[70ch] text-lg">
            <strong>KICC-N the Streetz, November 1.</strong> Free food, clothes, toiletries and games for the neighborhood, led by Outreach Director Minister Naylene Bartell. Next up: the winter coat drive, the holiday pantry and the Kidz & Krew car wash.{" "}
            <Link href="/flyers" className="font-bold text-forest underline underline-offset-4">
              See what’s needed
            </Link>
          </p>

          {/* Prayer */}
          <div className="mt-16 grid overflow-hidden rounded-sm ring-1 ring-gold lg:grid-cols-[0.9fr_1.1fr]">
            <div className="on-dark p-8 md:p-12">
              <p className="caps text-gold-hi">Prayer requests</p>
              <h3 className="display mt-3 text-[2.5rem] text-cream md:text-[3.3rem]">Tell us how we can pray.</h3>
              <p className="mt-5 text-lg text-cream/85">“He hears the prayers you speak and understands the ones you can only cry.” Your request goes straight to our pastors and the prayer team. Nothing is posted on this site.</p>
            </div>
            <div className="bg-cream-2 p-8 md:p-12">
              <PrayerForm />
            </div>
          </div>
        </div>
      </section>

      {/* ───────── III. Make an Impact ───────── */}
      <section className="on-dark relative overflow-hidden">
        <div className="rim" />
        <div className="wrap grid gap-12 py-16 md:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div data-reveal>
            <p className="font-display text-[5.5rem] font-black leading-none text-gold/35 md:text-[7.5rem]">III</p>
            <h2 className="display -mt-3 text-[3.2rem] text-cream md:text-[4.6rem]">
              Make an <em className="foil pr-2">impact.</em>
            </h2>
            <p className="mt-5 max-w-[48ch] text-lg text-cream/85">Give your tithe, offering or seed online in under a minute. Every gift helps Kingdom Impact build its next home and keep showing up for Daytona Beach.</p>
            <p className="time mt-7 inline-block rounded-sm border-2 border-gold px-5 py-3 text-[1.7rem] font-extrabold text-gold-hi md:text-[2.2rem]">{giving.tag}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={giving.url} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                {giving.label}
              </a>
              <Link href="/give" className="btn btn-line">
                Other ways to give
              </Link>
            </div>
            {raffleOpen && (
              <p className="mt-8 max-w-[52ch] border-l-4 border-wine pl-5 text-cream/90">
                <strong className="text-gold-hi">Build the Impact Christmas Raffle.</strong> $5 an entry, gift cards and gadgets to win, live drawing on Facebook <span className="time">December 15</span>. Write “Raffle” in your Cash App note.
              </p>
            )}
          </div>
          <div data-reveal="1" className="justify-self-center">
            <div className="rounded-sm bg-cream p-5 ring-[3px] ring-gold shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
              <CashQr className="h-[240px] w-[240px] md:h-[280px] md:w-[280px]" />
              <p className="caps mt-3 text-center text-forest">Scan to give</p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Flyers ───────── */}
      <section className="bg-cream-2">
        <div className="wrap py-16 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div data-reveal>
              <p className="caps text-gold-lo">Straight off the flyer</p>
              <h2 className="display mt-3 text-[2.6rem] text-forest md:text-[4rem]">What’s happening at KICC</h2>
              <p className="mt-4 max-w-[56ch] text-lg">Tap a flyer to open it. The date, the place and who to call are written out beside it, so you can read them, tap to call, or get directions.</p>
            </div>
            <Link href="/flyers" className="btn btn-forest">
              All flyers
            </Link>
          </div>
          <div className="mt-10">
            <FlyerWall flyers={flyers.slice(0, 8)} />
          </div>
        </div>
      </section>

      {/* ───────── Installation & anniversary ───────── */}
      <section className="on-dark relative overflow-hidden">
        <div className="rim" />
        <div className="wrap grid items-center gap-10 py-16 md:grid-cols-[auto_1fr] md:gap-16 md:py-24">
          <Seal uid="inst" className="mx-auto h-[230px] w-[230px] md:h-[330px] md:w-[330px]" />
          <div data-reveal>
            <p className="caps text-gold-hi">Coming up · Est. MMXXIII</p>
            <h2 className="display mt-3 text-[2.6rem] text-cream [text-wrap:balance] md:text-[4.2rem]">
              The Apostolic Installation <em className="foil pr-2">& our church anniversary.</em>
            </h2>
            <p className="mt-5 max-w-[56ch] text-lg text-cream/85">
              KICC Nation is preparing to celebrate the installation of {pastor.styled} and another year of God’s faithfulness to this house.{" "}
              {installation.date ? (
                <strong className="time text-gold-hi">
                  {fmtDay(installation.date, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                  {installation.time && ` · ${installation.time}`}
                  {installation.where && ` · ${installation.where}`}
                </strong>
              ) : (
                <strong className="text-gold-hi">Date and place to be announced.</strong>
              )}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/about" className="btn btn-gold">
                Meet our pastors
              </Link>
              <Link href="/contact" className="btn btn-line">
                Send me the details
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
