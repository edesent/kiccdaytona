import Link from "next/link";
import Seal from "@/components/Seal";

export default function NotFound() {
  return (
    <section className="on-dark">
      <div className="wrap flex flex-col items-center py-24 text-center">
        <Seal uid="nf" className="h-40 w-40" />
        <h1 className="display mt-8 text-5xl text-cream">That page has moved.</h1>
        <p className="mt-4 max-w-[40ch] text-lg text-cream/85">The kingdom hasn’t. Head back home and you’ll find where KICC is this week.</p>
        <Link href="/" className="btn btn-gold mt-8">
          Back to the home page
        </Link>
      </div>
    </section>
  );
}
