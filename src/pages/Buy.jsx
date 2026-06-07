import { Check } from "lucide-react";

export function Buy() {
  return (
    <>
      <section className="bg-mist py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-clay">Buyer Representation</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-balance md:text-6xl">
              Find the right home. Without the rush.
            </h2>
          </div>
          <div className="grid gap-8">
            <p className="text-xl leading-9 text-ink/75">
              We leverage our extensive private network to find off-market opportunities. Our buying strategy focuses on careful valuation, neighborhood insight, and fierce negotiation on your behalf.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {["Off-market access", "Comparative market analysis", "Inspection guidance", "Strategic negotiation"].map((item) => (
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
        <div className="mx-auto max-w-7xl px-5 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.22em] text-white/62">Ready to start?</p>
          <h2 className="mt-3 font-serif text-4xl">Schedule a Buyer Strategy Call</h2>
          <p className="mt-6 text-lg max-w-2xl mx-auto text-white/70">
            Let's discuss your timeline, preferred neighborhoods, and must-have features. We'll set up a tailored search specifically for you.
          </p>
          <a href="/contact" className="mt-8 inline-flex items-center justify-center gap-3 bg-white px-6 py-4 text-sm uppercase tracking-[0.16em] text-ink">
            Book Consultation
          </a>
        </div>
      </section>
    </>
  );
}
