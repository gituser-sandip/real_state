import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { testimonials } from "../data/mockData";

export function Home() {
  return (
    <>
      <section className="hero-image relative min-h-[92vh] bg-cover bg-center text-white">
        <div className="absolute inset-0 bg-ink/10" />
        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-5 pb-12 pt-32 lg:px-8 lg:pb-16">
          <p className="mb-5 max-w-xl text-sm uppercase tracking-[0.24em] text-white/80">
            Luxury homes across Chicago and the North Shore
          </p>
          <h1 className="max-w-4xl font-serif text-5xl leading-[0.98] text-balance md:text-7xl lg:text-8xl">
            Real estate guided with strategy, discretion, and care.
          </h1>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/listings"
              className="inline-flex items-center justify-center gap-3 bg-white px-6 py-4 text-sm uppercase tracking-[0.16em] text-ink"
            >
              Search homes <ArrowRight size={18} />
            </Link>
            <Link
              to="/valuation"
              className="inline-flex items-center justify-center gap-3 border border-white px-6 py-4 text-sm uppercase tracking-[0.16em] text-white"
            >
              Value my home <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {[
            ["$1.5B+", "Career sales represented"],
            ["99.1%", "Average list-to-sale performance"],
            ["800+", "Five-star client reviews"],
            ["13 days", "Median seller launch to contract"],
          ].map(([number, label]) => (
            <div key={label} className="border-l border-white/20 pl-6">
              <p className="font-serif text-5xl">{number}</p>
              <p className="mt-3 text-sm uppercase tracking-[0.16em] text-white/68">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-mist py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-clay">What clients say</p>
              <h2 className="mt-4 font-serif text-4xl md:text-6xl">Quiet confidence, visible results.</h2>
            </div>
            <div className="grid gap-5">
              {testimonials.map((testimonial) => (
                <figure key={testimonial.name} className="border-t border-ink/14 pt-6">
                  <div className="mb-4 flex gap-1 text-brass" aria-label="Five star review">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} size={18} fill="currentColor" />
                    ))}
                  </div>
                  <blockquote className="text-xl leading-9 text-ink/78">"{testimonial.quote}"</blockquote>
                  <figcaption className="mt-4 text-sm uppercase tracking-[0.16em] text-ink/55">
                    {testimonial.name}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
