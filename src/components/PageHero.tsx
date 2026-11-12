import Seal from "@/components/Seal";

/** The green-and-gold banner at the top of every inner page. */
export default function PageHero({ kicker, title, gold, children }: { kicker: string; title: string; gold?: string; children?: React.ReactNode }) {
  return (
    <section className="on-dark relative overflow-hidden">
      <Seal uid="ph" className="pointer-events-none absolute -right-24 -top-16 h-[440px] w-[440px] opacity-[0.13] md:-right-10" />
      <div className="wrap relative py-16 md:py-24">
        <p className="caps text-gold-hi">{kicker}</p>
        <h1 className="display mt-4 max-w-[15ch] text-[2.9rem] text-cream [text-wrap:balance] md:text-[4.6rem]">
          {title} {gold && <em className="foil pr-2">{gold}</em>}
        </h1>
        {children && <div className="mt-6 max-w-[58ch] text-lg text-cream/85">{children}</div>}
      </div>
      <div className="rim" />
    </section>
  );
}
