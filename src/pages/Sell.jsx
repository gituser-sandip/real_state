import { Check } from "lucide-react";
import { caseStudies } from "../data/mockData";

export function Sell() {
  return (
    <>
      <section className="bg-mist py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-clay">Integrity. Initiative. Insight.</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-balance md:text-6xl">
              Your largest decision deserves a calmer plan.
            </h2>
          </div>
          <div className="grid gap-8">
            <p className="text-xl leading-9 text-ink/75">
              We pair valuation discipline, private-market outreach, presentation planning, and negotiation with a human
              pace. Every seller receives a launch calendar, showing strategy, risk review, and weekly market read.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {["Pricing analysis", "Pre-market buyer matching", "Offer risk review", "Closing coordination"].map((item) => (
                <div key={item} className="flex items-center gap-3 border-t border-ink/15 pt-4">
                  <Check className="text-brass" size={20} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-ink text-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-sm uppercase tracking-[0.22em] text-white/62">Client proof</p>
          <h2 className="mt-3 font-serif text-4xl">Case studies</h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <article key={study.title} className="border-t border-white/18 pt-5">
                <p className="font-serif text-3xl">{study.stat}</p>
                <h3 className="mt-2 text-lg">{study.title}</h3>
                <p className="mt-2 text-white/68">{study.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
