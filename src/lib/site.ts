/**
 * Everything a pastor or volunteer is likely to change lives in this file:
 * weekly gatherings, special events, flyers, giving, the new address and links.
 *
 * Sources (November 12, 2026):
 * - The church's Facebook page, facebook.com/profile.php?id=100093292021958
 *   (intro, phone, every flyer and its post text, the Nov 1 "KICC-N the Streetz"
 *   photo album, the "New Location Coming Soon" post).
 * - Their Small Church Grant request form (what they asked for; Cash App).
 * - cash.app/$kingdomimpactcc (confirms the tag is live; account name).
 * - The church seal (motto, Hebrews 12:28,29, EST. MMXXIII).
 */

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kiccdaytona.elijahdesent.com";

/**
 * Preview hosts stay out of search. Once NEXT_PUBLIC_SITE_URL is set to the
 * church's real domain this turns off by itself.
 */
export const isDemo = /(\.dfd\.llc|\.vercel\.app|\.elijahdesent\.com)$/.test(new URL(siteUrl).hostname);

/** The church's own time zone. Every "today" and "next gathering" is worked out here. */
export const TZ = "America/New_York";

export const church = {
  name: "Kingdom Impact Christian Center",
  short: "KICC",
  motto: "Love God. Love People. Make an Impact.",
  /**
   * THE NEW ADDRESS GOES HERE. The church is between buildings ("New Location
   * Coming Soon", Nov 1, 2026). While `street` is empty the site says so and
   * points people to Zoom and the outreach dates. Fill in streetNumber, street,
   * zip and mapsUrl and every page switches to the address and a map.
   */
  street: "",
  streetNumber: "",
  city: "Daytona Beach",
  stateCode: "FL",
  state: "Florida",
  zip: "",
  /** Their own words, from the Facebook intro. */
  welcome: "Let’s KICC it with Pastor J and Lady Q.",
  /**
   * The church line from their Facebook page, base64'd so it never sits in the
   * HTML for scrapers: `printf 5551234567 | base64`. Rendered by components/Phone.tsx.
   * Never type the digits into a page.
   */
  phoneB64: "Mzg2NzUzNDcyMA==",
  mapsUrl: "",
  facebook: "https://www.facebook.com/profile.php?id=100093292021958",
  youtube: "",
};

export const hasAddress = Boolean(church.street);

export const pastor = {
  name: "J. DeNard Simmons",
  title: "Apostle-Elect",
  /** Honorific the church itself uses. */
  styled: "Apostle-Elect J. DeNard Simmons",
  wife: "Prophetess Lady Qutila Simmons",
};

/** People named on the flyers as the ones to call. Numbers are base64'd like the church line. */
export const contacts = {
  holland: { name: "Sr. Elder Jeanette Holland", b64: "Mzg2NTAwODAyMg==" },
  bartell: { name: "Minister Naylene Bartell", b64: "Mzg2NDUzMDA4OA==" },
};

/**
 * The regular week. `online: true` shows "On Zoom" instead of the address.
 * `skip` lists dates (YYYY-MM-DD) when a gathering does not meet.
 * When Sunday worship has a home again, add it here, for example:
 *   { id: "sunday", name: "Sunday Worship", dow: 0, time24: "11:00", rule: "Every Sunday", note: "…" }
 */
export type Service = {
  id: string;
  name: string;
  /** 0 = Sunday … 6 = Saturday */
  dow: number;
  time24: string;
  nth?: number[];
  /** Length in minutes, for the phone-calendar file. Default 90. */
  minutes?: number;
  online?: boolean;
  skip?: string[];
  rule: string;
  note: string;
};

export const services: Service[] = [
  {
    id: "bible-study",
    name: "Recharged Bible Study",
    dow: 4,
    time24: "19:30",
    online: true,
    rule: "Every Thursday",
    note: "On Zoom with Apostle-Elect J. DeNard Simmons. Grab your Bible and bring your questions. Ask Sr. Elder Jeanette Holland for the link.",
  },
  {
    id: "god-hears-her",
    name: "God Hears Her",
    dow: 6,
    time24: "08:00",
    minutes: 60,
    online: true,
    skip: ["2026-11-14"],
    rule: "Every Saturday",
    note: "Women’s prayer on Zoom with Prophetess Lady Qutila Simmons. A safe place to pray, grow and walk in purpose.",
  },
];

/**
 * Special events. Give each one a start date and an `endsOn` date; it drops
 * off the site by itself the day after it ends (the layout re-renders hourly).
 * Dates are YYYY-MM-DD.
 */
export type SpecialEvent = {
  id: string;
  title: string;
  start: string;
  endsOn: string;
  /** Shown instead of a time. Leave out when `time24` is set. */
  when?: string;
  time24?: string;
  /** Where it happens. */
  where?: string;
  summary: string;
  href?: string;
};

export const events: SpecialEvent[] = [
  {
    id: "worship-and-waves",
    title: "Worship & Waves",
    start: "2026-11-14",
    endsOn: "2026-11-14",
    time24: "06:00",
    where: "Andy Romano Beachfront Park, 839 S. Atlantic Ave, Ormond Beach",
    summary: "God Hears Her women’s ministry meets where worship meets the waves, 6 to 9 AM. Bring a towel, yoga mat or blanket, and a sister.",
    href: "/flyers",
  },
  {
    id: "coat-drive-goal",
    title: "Winter Coat Drive: last day to give",
    start: "2026-11-28",
    endsOn: "2026-11-28",
    when: "Goal day",
    where: "Call for pickup or drop-off",
    summary: "Coats in all sizes for men, women and children. Hats and gloves too. No money, please.",
    href: "/flyers",
  },
  {
    id: "car-wash",
    title: "Kingdom Kulture Kidz & Krew Car Wash",
    start: "2026-11-28",
    endsOn: "2026-11-28",
    time24: "08:00",
    where: "1000 W. International Speedway Blvd, Daytona Beach",
    summary: "8 AM until. Donations only. Pull up, show love and support our youth.",
    href: "/flyers",
  },
  {
    id: "raffle-drawing",
    title: "Build the Impact Christmas Raffle: live drawing",
    start: "2026-12-15",
    endsOn: "2026-12-15",
    when: "Live on Facebook",
    where: "The KICC Facebook page",
    summary: "$5 an entry through Cash App. Gift cards, kitchen tools, gadgets and more.",
    href: "/give",
  },
  {
    id: "sismas",
    title: "SisMas Christmas Exchange",
    start: "2026-12-19",
    endsOn: "2026-12-19",
    time24: "19:00",
    where: "Location to be announced",
    summary: "God Hears Her’s 2nd annual pink-pajama night, 7 to 9 PM: food, games, prizes and a gift exchange. Free.",
    href: "/flyers",
  },
];

/**
 * The apostolic installation and the church anniversary. Leave `date` empty
 * until it is set; the site says "date to be announced". Put a YYYY-MM-DD date
 * in and add a matching entry to `events` above so it lands on the calendar.
 */
export const installation = {
  date: "",
  time: "",
  where: "",
};

/**
 * Online giving. The Give page shows the button and a QR code drawn from `url`.
 */
export const giving = {
  provider: "Cash App",
  tag: "$kingdomimpactcc",
  url: "https://cash.app/$kingdomimpactcc",
  /** The name Cash App shows on the account, so givers know they have the right one. */
  accountName: "Pastor Jarious Simmons",
  label: "Give with Cash App",
};

/** Keep labels short: long uppercase labels wrap and break the header on phones. */
export const nav: { href: string; label: string; short: string }[] = [
  { href: "/visit", label: "Find Us", short: "Find Us" },
  { href: "/calendar", label: "Calendar", short: "Calendar" },
  { href: "/flyers", label: "Flyers", short: "Flyers" },
  { href: "/about", label: "About", short: "About" },
  { href: "/prayer", label: "Prayer", short: "Prayer" },
];

/**
 * FLYERS. One entry per flyer the church posts. The picture goes in
 * public/flyers/ and the details are typed out here, so the date, time, place
 * and phone numbers are real text people can read and tap in the lightbox.
 *
 * To add one: save the image to public/flyers/<name>.jpg, copy an entry below,
 * set `w` and `h` to the image's pixel size, and give it an `endsOn` date
 * (YYYY-MM-DD). The day after `endsOn` the flyer takes itself down. Newest first.
 */
export type Flyer = {
  id: string;
  title: string;
  kicker?: string;
  image: string;
  w: number;
  h: number;
  /** What the flyer shows, for people who cannot see it. */
  alt: string;
  /** One short line under the thumbnail. */
  when: string;
  endsOn: string;
  /** Label / value rows in the lightbox. */
  facts: [string, string][];
  body: string;
  list?: string[];
  contacts?: { name: string; b64: string }[];
  cta?: { label: string; href: string };
};

export const flyers: Flyer[] = [
  {
    id: "worship-and-waves",
    title: "Worship & Waves",
    kicker: "God Hears Her Women’s Ministry",
    image: "/flyers/worship-and-waves.jpg",
    w: 768,
    h: 960,
    alt: "Worship & Waves flyer: Prophetess Lady Qutila Simmons in a pink dress walking along the surf at sunrise. Saturday, November 14, 2026, 6 AM to 9 AM, Andy Romano Beachfront Park, Ormond Beach.",
    when: "Sat, Nov 14 · 6–9 AM",
    endsOn: "2026-11-14",
    facts: [
      ["When", "Saturday, November 14, 2026 · 6 AM–9 AM"],
      ["Where", "Andy Romano Beachfront Park, 839 S. Atlantic Avenue, Ormond Beach, FL 32176"],
      ["Bring", "Towels, yoga mats or blankets"],
      ["Host", "VisionHERy: Prophetess Lady Qutila Simmons"],
    ],
    body: "Sisters, meet us where worship meets the waves: a morning to quiet your heart, lift your voice and make room for God in the beauty of His creation. You don’t have to have it all together to come before Him. The God who commands the waves hears her. He hears you.",
    cta: { label: "Directions to the park", href: "https://www.google.com/maps/search/?api=1&query=Andy+Romano+Beachfront+Park+839+S+Atlantic+Ave+Ormond+Beach+FL+32176" },
  },
  {
    id: "bible-study",
    title: "Recharged Bible Study",
    kicker: "Every Thursday on Zoom",
    image: "/flyers/bible-study.jpg",
    w: 960,
    h: 1440,
    alt: "Bible study flyer: Apostle-Elect J. DeNard Simmons in a purple clergy shirt holding a microphone. “Are you ready to be recharged? Bible Study will be held on Zoom every Thursday. Deeper in the Word. Stronger in faith.”",
    when: "Thursdays · on Zoom",
    endsOn: "2027-12-31",
    facts: [
      ["When", "Every Thursday · 7:30 PM (confirm the time when you ask for the link)"],
      ["Where", "On Zoom"],
      ["Teacher", "Apostle-Elect J. DeNard Simmons"],
    ],
    body: "Grab your Bible, bring your questions, and come ready to grow deeper in the Word and stronger in your faith. There’s room for you. Come expecting. Leave recharged.",
    contacts: [contacts.holland],
    cta: { label: "Ask for the Zoom link", href: "/contact?about=Zoom%20link%20for%20Thursday%20Bible%20study" },
  },
  {
    id: "winter-coat-drive",
    title: "Winter Coat Drive",
    kicker: "For individuals & families in need",
    image: "/flyers/winter-coat-drive.jpg",
    w: 960,
    h: 1440,
    alt: "Winter Coat Drive flyer with the church seal and a stack of coats, hats and gloves in snow. Goal by November 28, 2026. Not accepting monetary donations.",
    when: "Goal by Nov 28",
    endsOn: "2026-11-28",
    facts: [
      ["Goal", "November 28, 2026"],
      ["Needed", "Coats in all sizes for men, women and children. Hats and gloves are welcome too."],
      ["Not needed", "Money. We are not accepting monetary donations for this drive."],
      ["Drop-off", "Call for pickup or drop-off locations and times"],
    ],
    body: "A coat can warm a body. An act of love can warm a heart. That extra coat in your closet could help a child stay warm, a parent breathe a little easier, or a neighbor feel remembered.",
    contacts: [contacts.bartell, contacts.holland],
  },
  {
    id: "car-wash",
    title: "Kidz & Krew Car Wash",
    kicker: "Kingdom Kulture Kidz & Krew",
    image: "/flyers/car-wash.jpg",
    w: 1199,
    h: 1312,
    alt: "Car wash flyer with a photo of the Kingdom Kulture Kidz & Krew in orange T-shirts beside a blue tent. November 28, 2026, 8 AM until, 1000 W. International Speedway, Daytona Beach. Donations only.",
    when: "Sat, Nov 28 · 8 AM",
    endsOn: "2026-11-28",
    facts: [
      ["When", "Saturday, November 28, 2026 · 8 AM until"],
      ["Where", "1000 W. International Speedway Blvd, Daytona Beach, FL 32114"],
      ["Cost", "Donations only"],
    ],
    body: "Daytona Beach, we need y’all to pull up! The Kingdom Kulture Kidz & Krew are bringing the suds, the smiles and the energy. Every person who shows up reminds our youth that their community is behind them. Pull up. Show love. Leave shining.",
    cta: { label: "Directions", href: "https://www.google.com/maps/search/?api=1&query=1000+W+International+Speedway+Blvd+Daytona+Beach+FL+32114" },
  },
  {
    id: "christmas-raffle",
    title: "Build the Impact Christmas Raffle",
    kicker: "Kingdom Impact Christian Center presents",
    image: "/flyers/christmas-raffle.jpg",
    w: 1122,
    h: 1402,
    alt: "Build the Impact Christmas Raffle flyer in green, red and gold. $5 per entry. Pay with Cash App $kingdomimpactcc. Live drawing December 15, 2026 on the KICC Facebook page.",
    when: "Drawing Dec 15",
    endsOn: "2026-12-15",
    facts: [
      ["Entry", "$5 per entry"],
      ["Pay", "Cash App $kingdomimpactcc (write “Raffle” in the note)"],
      ["Prizes", "Restaurant, shopping, spa and grocery gift cards, plus kitchen tools, gadgets and more"],
      ["Drawing", "Live on the KICC Facebook page · December 15, 2026"],
    ],
    body: "A little Christmas excitement with a big purpose. Your Christmas gift could be just $5 away, and every entry helps us build as we keep loving God, loving people and making an impact in our community.",
    cta: { label: "Enter with Cash App", href: "https://cash.app/$kingdomimpactcc" },
  },
  {
    id: "holiday-drives",
    title: "Winter Outreach & Holiday Drives",
    kicker: "The Impact of Love",
    image: "/flyers/holiday-drives.jpg",
    w: 960,
    h: 1440,
    alt: "Winter Outreach & Holiday Drives flyer: now accepting donations in three groups, Winter Warmth, Daily Essentials and Holiday Pantry.",
    when: "Now accepting donations",
    endsOn: "2026-12-31",
    facts: [
      ["Winter warmth", "New or gently used coats, hoodies, sweaters, pants, jeans, socks, hats, scarves, gloves, shoes"],
      ["Essentials", "Travel-size shampoo, conditioner, body wash, toothpaste, lotion, deodorant, soap, hand sanitizer"],
      ["Pantry", "Non-perishable foods, canned goods, pasta, mac & cheese, soups, granola bars, peanut butter, snacks, bottled water"],
    ],
    body: "A warm coat. A bag of groceries. Everyday essentials. What seems small to you could be an answered prayer for someone else. You don’t have to supply everything to make a difference. Start with what you can give.",
    contacts: [contacts.bartell, contacts.holland],
  },
  {
    id: "sismas",
    title: "SisMas Christmas Exchange",
    kicker: "God Hears Her · 2nd annual",
    image: "/flyers/sismas.jpg",
    w: 1096,
    h: 1435,
    alt: "SisMas Christmas Exchange save-the-date flyer in pink and gold. December 19, 2026, 7 to 9 PM. It’s free: food, games, prizes and gift exchange.",
    when: "Sat, Dec 19 · 7–9 PM",
    endsOn: "2026-12-19",
    facts: [
      ["When", "Saturday, December 19, 2026 · 7–9 PM"],
      ["Wear", "Your pink pajamas"],
      ["Cost", "Free admission"],
      ["Gift exchange", "Call to join the Elfster exchange"],
    ],
    body: "Sis, your presence is part of the gift. Grab your girls, get comfy and join us for an evening of laughter, love and sisterhood: food, games, prizes and a gift exchange. Come with your bestie or come ready to make new friends.",
    contacts: [contacts.holland],
  },
  {
    id: "god-hears-her",
    title: "God Hears Her",
    kicker: "Divine women with assignments of purpose",
    image: "/flyers/god-hears-her.jpg",
    w: 720,
    h: 1080,
    alt: "God Hears Her flyer in pink and gold with Prophetess Lady Qutila Simmons seated in a pink suit. A safe place to pray, grow and walk in purpose. Saturdays, 8:00 AM on Zoom.",
    when: "Saturdays · 8 AM on Zoom",
    endsOn: "2027-12-31",
    facts: [
      ["When", "Saturdays · 8:00 AM"],
      ["Where", "On Zoom"],
      ["Host", "Prophetess Lady Qutila Simmons"],
    ],
    body: "You’ve spent all week pouring into everybody else. This morning, make room to be poured into. Heard by God. Healed by His grace. Empowered by His purpose. Equipped for her assignment.",
    cta: { label: "Ask for the Zoom link", href: "/contact?about=God%20Hears%20Her%20women%E2%80%99s%20ministry" },
  },
  {
    id: "sweet-potato-pies",
    title: "Sweet Potato Pies for Sale",
    kicker: "He sings. He preaches. He teaches.",
    image: "/flyers/sweet-potato-pies.jpg",
    w: 1080,
    h: 1440,
    alt: "Sweet Potato Pies for Sale flyer: Apostle-Elect Simmons in an apron and red cap mixing filling beside two pies. Slice $3, whole pie $12, pre-orders $7 deposit.",
    when: "Slice $3 · Whole pie $12",
    endsOn: "2026-12-31",
    facts: [
      ["Slice", "$3"],
      ["Whole pie", "$12"],
      ["Pre-order", "$7 deposit toward your whole pie"],
    ],
    body: "And apparently, the anointing reaches the oven. A word for your soul. A pie for your plate. Go ahead and order the whole pie. Sharing that slice might test your spirit.",
    contacts: [{ name: "Elder Jeanette Holland", b64: contacts.holland.b64 }],
  },
  {
    id: "new-location",
    title: "New Location Coming Soon",
    kicker: "Stay tuned",
    image: "/flyers/new-location.jpg",
    w: 960,
    h: 1440,
    alt: "New Location Coming Soon flyer in green and gold with the church seal and Apostle-Elect J. DeNard Simmons and Prophetess Lady Qutila Simmons on the Daytona Beach waterfront.",
    when: "Stay tuned",
    endsOn: "2027-06-30",
    facts: [
      ["Status", "New location coming soon"],
      ["Meanwhile", "Bible study and God Hears Her on Zoom, and KICC-N the Streetz outreach around Daytona Beach"],
    ],
    body: "Our address may be changing, but our commitment to God’s people remains strong. There are souls to reach, families to serve and a community to love. Ministry keeps moving. Stay tuned, and catch us in the streetz.",
    cta: { label: "Tell me when it’s announced", href: "/contact" },
  },
];

/**
 * MAP PINS. The places KICC shows up, drawn on the green-and-gold map of
 * Daytona Beach on the home page (components/KiccMap.tsx). A pin with an
 * `endsOn` date takes itself off the map the day after. To add one, look up
 * the latitude and longitude of the address (right-click the spot in Google
 * Maps and copy the two numbers) and add an entry. Set `home: true` on the
 * church's new address when it is announced and it gets the crown pin.
 * The map covers Ormond Beach down to Beville Rd, and I-95 to the ocean.
 */
export type Place = { id: string; title: string; where: string; when: string; lat: number; lon: number; endsOn?: string; home?: boolean };

export const places: Place[] = [
  { id: "worship-and-waves", title: "Worship & Waves", where: "Andy Romano Beachfront Park, Ormond Beach", when: "Sat, Nov 14 · 6–9 AM", lat: 29.270806, lon: -81.029633, endsOn: "2026-11-14" },
  { id: "car-wash", title: "Kidz & Krew Car Wash", where: "1000 W. International Speedway Blvd", when: "Sat, Nov 28 · 8 AM until", lat: 29.203445, lon: -81.040072, endsOn: "2026-11-28" },
  { id: "streetz-nov-1", title: "KICC-N the Streetz giveback", where: "316 North St", when: "Held Nov 1 · food, clothes, toiletries", lat: 29.221657, lon: -81.029024 },
];
