import { BookmarkCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { formatPrice } from "../components/ui/PropertyCard";

export function Saved() {
  const { favoriteProperties } = useGlobalContext();

  return (
    <section className="py-16 mt-16 bg-mist min-h-[70vh]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex items-center justify-between gap-5">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-clay">Buyer workspace</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Saved searches and favorites</h2>
          </div>
          <BookmarkCheck className="text-brass" size={34} />
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {favoriteProperties.length ? (
            <div className="lg:col-span-2 grid gap-5 sm:grid-cols-2">
              {favoriteProperties.map((property) => (
                <div key={property.id} className="border border-ink/12 bg-white p-5 shadow-soft">
                  <img src={property.image} alt={property.title} className="h-40 w-full object-cover mb-4" />
                  <p className="font-serif text-2xl">{property.title}</p>
                  <p className="mt-2 text-ink/62">{property.location} - {formatPrice(property.price)}</p>
                  <Link to="/listings" className="mt-4 inline-block text-sm uppercase tracking-[0.16em] border-b border-ink">View Details</Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="border border-ink/12 bg-white p-5 text-ink/68 lg:col-span-2">
              Save listings from the search results to build a private shortlist.
            </p>
          )}
          <div className="bg-ink p-6 text-white h-fit">
            <p className="font-serif text-3xl">Saved search alert</p>
            <p className="mt-3 text-white/70">Sign up for alerts when new properties match your criteria.</p>
            <Link to="/contact" className="mt-5 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em]">
              Request alerts <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
