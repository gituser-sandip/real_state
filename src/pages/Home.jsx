import { ArrowRight, Star, Map, Check, Home as HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useGlobalContext } from "../context/GlobalContext";
import { testimonials, neighborhoodData } from "../data/mockData";
import { PropertyCard } from "../components/ui/PropertyCard";
import { FadeIn, StaggerContainer, StaggerItem } from "../components/ui/FadeIn";

export function Home() {
  const { properties, favorites, toggleFavorite } = useGlobalContext();
  const featuredProperties = properties.slice(0, 3);
  const featuredAreas = neighborhoodData.slice(0, 3);

  return (
    <>
      <section className="hero-image relative min-h-[92vh] bg-cover bg-center text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/20 to-ink/70" />
        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-5 pb-12 pt-32 lg:px-8 lg:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="mb-5 max-w-xl text-sm uppercase tracking-[0.24em] text-white/80">
              Luxury homes across Chicago and the North Shore
            </p>
            <h1 className="max-w-4xl font-serif text-5xl leading-[0.98] text-balance md:text-7xl lg:text-8xl">
              Real estate guided with strategy, discretion, and care.
            </h1>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/listings"
                className="inline-flex items-center justify-center gap-3 bg-white px-6 py-4 text-sm uppercase tracking-[0.16em] text-ink transition hover:bg-ink hover:text-white"
              >
                Search homes <ArrowRight size={18} />
              </Link>
              <Link
                to="/valuation"
                className="inline-flex items-center justify-center gap-3 border border-white px-6 py-4 text-sm uppercase tracking-[0.16em] text-white transition hover:bg-white/10"
              >
                Value my home <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-ink py-16 text-white border-y border-white/10 overflow-hidden">
        <StaggerContainer className="mx-auto grid max-w-7xl gap-5 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {[
            ["$1.5B+", "Career sales represented"],
            ["99.1%", "Average list-to-sale performance"],
            ["800+", "Five-star client reviews"],
            ["13 days", "Median seller launch to contract"],
          ].map(([number, label]) => (
            <StaggerItem key={label} className="border-l border-white/20 pl-6">
              <p className="font-serif text-5xl">{number}</p>
              <p className="mt-3 text-sm uppercase tracking-[0.16em] text-white/68">{label}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <section className="py-20 lg:py-28 bg-mist">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <FadeIn className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-clay">Exclusive Inventory</p>
              <h2 className="mt-4 font-serif text-4xl md:text-6xl">Featured Properties</h2>
            </div>
            <Link to="/listings" className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] border-b border-ink pb-1">
              View all listings <ArrowRight size={18} />
            </Link>
          </FadeIn>
          <StaggerContainer className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.map((property) => (
              <StaggerItem key={property.id}>
                <PropertyCard
                  property={property}
                  isFavorite={favorites.includes(property.id)}
                  onSelect={() => window.location.href = `/listings?id=${property.id}`}
                  onFavorite={() => toggleFavorite(property.id)}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-linen overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-[0.22em] text-clay">Our Expertise</p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">A Boutique Approach to Chicago Real Estate</h2>
            <p className="mt-6 text-lg text-ink/75">
              Whether you are buying your first home, selling a luxury estate, or relocating to the North Shore, our dedicated team provides unparalleled market insight and personalized service.
            </p>
          </FadeIn>
          
          <StaggerContainer className="mt-16 grid gap-10 lg:grid-cols-2">
            <StaggerItem className="bg-white p-10 border border-ink/10 shadow-soft">
              <HomeIcon size={40} className="text-brass mb-6" />
              <h3 className="font-serif text-3xl mb-4">Buying a Home</h3>
              <p className="text-ink/75 leading-relaxed mb-8">
                Gain access to off-market inventory, deep neighborhood analytics, and a team that negotiates fiercely on your behalf to secure the right property at the right price.
              </p>
              <ul className="mb-10 space-y-3 text-ink/70">
                <li className="flex items-center gap-3"><Check size={18} className="text-brass" /> Pre-market property access</li>
                <li className="flex items-center gap-3"><Check size={18} className="text-brass" /> Investment & resale analysis</li>
                <li className="flex items-center gap-3"><Check size={18} className="text-brass" /> Seamless closing coordination</li>
              </ul>
              <Link to="/buy" className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] bg-ink text-white px-6 py-4 transition hover:bg-ink/80">
                Buyer Services <ArrowRight size={16} />
              </Link>
            </StaggerItem>

            <StaggerItem className="bg-white p-10 border border-ink/10 shadow-soft">
              <Star size={40} className="text-brass mb-6" />
              <h3 className="font-serif text-3xl mb-4">Selling a Home</h3>
              <p className="text-ink/75 leading-relaxed mb-8">
                Maximize your home's value through strategic pricing, high-end presentation, and targeted private-market outreach that drives competitive offers.
              </p>
              <ul className="mb-10 space-y-3 text-ink/70">
                <li className="flex items-center gap-3"><Check size={18} className="text-brass" /> Accurate valuation models</li>
                <li className="flex items-center gap-3"><Check size={18} className="text-brass" /> Premium staging & marketing</li>
                <li className="flex items-center gap-3"><Check size={18} className="text-brass" /> Risk review & negotiation</li>
              </ul>
              <Link to="/sell" className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] border border-ink text-ink px-6 py-4 hover:bg-ink hover:text-white transition">
                Seller Services <ArrowRight size={16} />
              </Link>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-ink text-white py-20 lg:py-28 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <FadeIn className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-white/60">City to Suburbs</p>
              <h2 className="mt-4 font-serif text-4xl md:text-5xl">Explore Neighborhoods</h2>
            </div>
            <Link to="/areas" className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] border-b border-white pb-1 hover:text-brass hover:border-brass transition">
              View all areas <ArrowRight size={18} />
            </Link>
          </FadeIn>
          
          <StaggerContainer className="mt-12 grid gap-6 md:grid-cols-3">
            {featuredAreas.map((area) => (
              <StaggerItem key={area.name}>
                <Link to="/areas" className="block relative group overflow-hidden bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition duration-300">
                  <div className="flex justify-between items-start mb-16">
                    <h3 className="font-serif text-3xl">{area.name}</h3>
                    <Map size={24} className="text-brass" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.16em] text-white/50 mb-1">Median Price</p>
                    <p className="font-medium text-xl">{area.median}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-brass transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-mist py-20 lg:py-28 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <FadeIn>
              <p className="text-sm uppercase tracking-[0.22em] text-clay">What clients say</p>
              <h2 className="mt-4 font-serif text-4xl md:text-6xl">Quiet confidence, visible results.</h2>
            </FadeIn>
            <StaggerContainer className="grid gap-8">
              {testimonials.map((testimonial) => (
                <StaggerItem key={testimonial.name} className="border-t border-ink/14 pt-6">
                  <div className="mb-4 flex gap-1 text-brass" aria-label="Five star review">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} size={18} fill="currentColor" />
                    ))}
                  </div>
                  <blockquote className="text-xl leading-9 text-ink/78">"{testimonial.quote}"</blockquote>
                  <figcaption className="mt-4 text-sm uppercase tracking-[0.16em] text-ink/55">
                    {testimonial.name}
                  </figcaption>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>
    </>
  );
}
