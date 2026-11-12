# Kingdom Impact Christian Center, Daytona Beach, Florida

Website concept for Kingdom Impact Christian Center (KICC), Daytona Beach, FL. The church is between buildings (“New Location Coming Soon”, November 2026), so there is no street address yet. Led by Apostle-Elect J. DeNard Simmons and Prophetess Lady Qutila Simmons.
Requested through the Small Church Grant (November 2026). They asked for: “Online giving, church calendar, prayer requests.” Coming up: “Apostolic installation church anniversary.” Giving today: Cash App.

Preview: https://kiccdaytona.elijahdesent.com (hidden from search engines; see "Going live").

## Read this before editing (for people and AI assistants)

- **Next.js 16.2 (App Router) + React 19 + Tailwind CSS v4.** This is NOT Next 13/14:
  - Page `params` and `searchParams` are **Promises**. Write `({ params }: { params: Promise<{ slug: string }> })` and `await` it.
  - Never name a component prop `ref`; it is reserved in React 19.
  - Tailwind v4 has no `tailwind.config.js`. Colours and fonts live in `src/app/globals.css` under `:root` and `@theme inline`. Custom classes go inside `@layer components`.
- **Type curly quotes and apostrophes as the characters themselves (’ “ ”), not as `&rsquo;` / `&ldquo;`.**
- **Deploys:** every push to `main` auto-deploys on Vercel. Run `npm run build` first. If the type-check fails, the live site does not update.
- **Commit email** must be `Elimark1611@gmail.com`, or Vercel blocks the deploy.
- **Fonts are self-hosted** in `src/fonts/` (`bash scripts/get-font.sh "<Family>" <weight>`). Don’t switch to `next/font/google`.
- **Times are set in the sans** (`.time` class), never in a display serif.

## Where things live

| To change… | Edit |
| --- | --- |
| Service times | `services` in `src/lib/site.ts` |
| A special event (drops off by itself after `endsOn`) | `events` in `src/lib/site.ts` |
| Online giving | `giving.url` in `src/lib/site.ts` |
| Address, phone, Facebook | `church` in `src/lib/site.ts` |
| Pastor | `pastor` in `src/lib/site.ts` |
| Navigation | `nav` in `src/lib/site.ts` |
| **The new address, when it is announced** | `church.streetNumber`, `street`, `zip`, `mapsUrl` in `src/lib/site.ts`. Every “New location coming soon” notice switches to the address and a map by itself |
| **A flyer** (add, edit, remove) | `flyers` in `src/lib/site.ts`; image in `public/flyers/`. Each has an `endsOn` date and takes itself down the day after |
| The apostolic installation / anniversary date | `installation` in `src/lib/site.ts`, plus an entry in `events` |
| Sunday worship, once it has a home | add a service to `services` in `src/lib/site.ts` (example in the comment there) |
| Photos | `public/photos/`. Alt text sits beside each image where it is used |

## How it works

- **The concept: “A kingdom which cannot be moved.”** The church seal carries Hebrews 12:28–29, and on November 1, 2026 the church posted “Our address may be changing, but our commitment to God’s people remains strong.” The home page (`src/app/page.tsx`) is the church’s front door while it has no building: a “Where to find KICC this week” board (`components/ThisWeek.tsx`) built from the weekly Zoom gatherings and dated events, then three chapters that follow the motto: Love God (the Thursday Bible study ticket), Love People (KICC-N the Streetz photos and the prayer request form), Make an Impact (Cash App giving with a QR code).
- **The seal** is redrawn as vector in `components/Seal.tsx` from the one on their flyers (crown, quartered shield with Bible, globe, cross and dove, wheat, motto ribbon, EST. MMXXIII). Colours in `globals.css` come from it.
- **Flyers** (`components/FlyerWall.tsx`): each flyer opens in a lightbox with its details typed out beside it (date, time, place, tap-to-call contacts). Arrow keys move between flyers, Esc closes.
- **Calendar** (`/calendar`, `components/Calendar.tsx`) fills itself in from `services` and `events`. `/calendar.ics` is a subscription file for phones.
- **Giving**: `giving` in `site.ts` holds the Cash App link; `components/CashQr.tsx` draws the QR code from it at build time.

- **Events expire by themselves.** Each event has `endsOn`; the pages re-render hourly (`revalidate = 3600` in `layout.tsx`). Keep that line.
- **Forms** post to `/api/form`, which sends to the Slack/Teams webhook in `FORM_WEBHOOK_URL`. Until that env var is set, the form tells people to call the church. Spam defences: signed load-time token, honeypot, rate limit, no links in free text.

## Confirm with the church

- **Thursday Bible study time.** The flyer image says “Every Thursday · 8 PM”; the posts with it (Nov 5 and Nov 12, 2026) say 7:30 PM. The site says 7:30 PM. Confirm.
- **Sunday worship.** No current Sunday time or place was found (the church is between buildings), so none is listed. Where does KICC meet on Sundays right now, and at what time?
- **The new address.** Blank on purpose. Their grant form gave “867 N Beech St, Daytona Beach”; it is not published because it may be a mailing or home address. Older posts used 601 Bellevue Ave and an old banner shows 616 N. Ridgewood. Confirm the new location and its start date.
- **Apostolic installation and church anniversary.** Named on the grant form with no date. `installation.date` is empty and the site says “date and place to be announced.” The seal says EST. MMXXIII (2023); the exact anniversary date is unknown.
- **Church phone.** (386) 753-4720 from the Facebook page. The grant form number (386) 500-8022 is the one the flyers list for Sr. Elder Jeanette Holland. Confirm which should be the main line.
- **Cash App.** `$kingdomimpactcc` (from the raffle flyer; cash.app shows the account name “Pastor Jarious Simmons”). Confirm this is where tithes should go, not only raffle entries.
- **God Hears Her** is listed every Saturday at 8:00 AM on Zoom (flyer “Starting Saturday August 15, 2026”; posts Oct 31 and Nov 7). Confirm it is weekly. November 14 is skipped for Worship & Waves.
- **SisMas (Dec 19)** has no location on the flyer. **Sweet potato pies**: no end date given; the flyer comes down Dec 31, 2026.
- **Car wash address** is written on the flyer as “1000 W. International Speedway”; the site adds “Blvd”.
- **No YouTube channel or Google Maps listing** was found for the church. No “watch live” button is shown; the raffle drawing is the only Facebook Live named.
- **Photos.** The pastors’ portraits and the Nov 1 outreach photos are from the church’s public Facebook page. Children appear in two group photos (Kingdom Kulture Kidz & Krew); confirm the church is happy to have those on the website. Birthday posts, the memorial for Dr. Jonathan L. McKnight and Clergy Appreciation posts were left off.
- **Forms** (prayer and contact) need `FORM_WEBHOOK_URL` set before they deliver anywhere.

## Rules that keep the site honest

- Real church photos only. No stock photos and no AI images.
- No “Watch live” button unless they really stream.
- The phone number is stored base64 (`phoneB64`) and assembled in the browser by `src/components/Phone.tsx`. Never type the digits into a page.
- No raw email addresses on the site. Link to `/contact`.

## Going live

Set `NEXT_PUBLIC_SITE_URL` to the real domain in Vercel. That turns off the noindex robots rule and fixes canonicals and JSON-LD in one move. **Delete the two demo-tracking lines in `src/app/layout.tsx`** (the comment and the `demo.js` script) when the church pays or goes live.
