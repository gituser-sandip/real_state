import { useParams, Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { MapPin, BookmarkCheck, Bookmark, Check, CalendarDays, BedDouble, Bath, Square, ArrowLeft } from "lucide-react";
import { formatPrice } from "../components/ui/PropertyCard";
import { Stat } from "../components/ui/Stat";

export function Property() {
  const { id } = useParams();
  const { properties, favorites, toggleFavorite } = useGlobalContext();

  const property = properties.find((p) => p.id === id);
  const isFavorite = favorites.includes(property?.id);

  if (!property) {
    return (
      <div className="flex h-screen items-center justify-center bg-mist text-ink">
        <div className="text-center">
          <h1 className="font-serif text-4xl">Property not found</h1>
          <Link to="/listings" className="mt-4 inline-block text-clay hover:underline">
            Return to listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-mist pb-24 pt-20 lg:pt-28">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Link to="/listings" className="mb-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-ink/60 transition-colors hover:text-ink">
          <ArrowLeft size={16} /> Back to listings
        </Link>
        <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden sm:h-[60vh] lg:h-[70vh]">
          <img src={property.image} alt={property.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 sm:p-10 lg:p-12 text-white">
            <p className="text-sm uppercase tracking-[0.2em] text-white/80">{property.status}</p>
            <h1 className="mt-2 font-serif text-4xl sm:text-5xl lg:text-7xl">{property.title}</h1>
            <p className="mt-4 flex items-center gap-2 text-lg text-white/90">
              <MapPin size={20} /> {property.location}
            </p>
          </div>
          <button
            onClick={() => toggleFavorite(property.id)}
            className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full bg-white/10 backdrop-blur-md transition-colors hover:bg-white/20 sm:right-10 sm:top-10 lg:right-12 lg:top-12 text-white"
          >
            {isFavorite ? <BookmarkCheck size={24} className="text-brass" /> : <Bookmark size={24} />}
          </button>
        </div>
      </div>

      {/* Details Section */}
      <div className="mx-auto mt-12 grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_400px] lg:px-8">
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-ink/10 pb-8">
            <p className="font-serif text-5xl lg:text-6xl">{formatPrice(property.price)}</p>
            <div className="flex gap-6 text-ink/70">
              <span className="flex items-center gap-2 text-lg">
                <BedDouble size={20} /> {property.beds} Beds
              </span>
              <span className="flex items-center gap-2 text-lg">
                <Bath size={20} /> {property.baths} Baths
              </span>
              <span className="flex items-center gap-2 text-lg">
                <Square size={20} /> {property.sqft.toLocaleString()} Sq Ft
              </span>
            </div>
          </div>

          <div className="py-10">
            <h2 className="mb-6 text-xs uppercase tracking-[0.2em] text-ink/50">About this home</h2>
            <p className="text-lg leading-relaxed text-ink/80">{property.description}</p>
          </div>

          <div className="border-t border-ink/10 py-10">
            <h2 className="mb-6 text-xs uppercase tracking-[0.2em] text-ink/50">Home Features</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {property.highlights.map((item) => (
                <p key={item} className="flex items-center gap-3 text-lg text-ink/80">
                  <Check className="text-brass" size={20} /> {item}
                </p>
              ))}
            </div>
          </div>

          <div className="border-t border-ink/10 py-10">
            <h2 className="mb-6 text-xs uppercase tracking-[0.2em] text-ink/50">Financial Details</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <Stat label="Property Type" value={property.type} />
              <Stat label="Annual Taxes" value={formatPrice(property.tax)} />
              <Stat label="HOA Dues" value={property.hoa ? formatPrice(property.hoa) : "None"} />
            </div>
          </div>

          <div className="border-t border-ink/10 py-10">
            <h2 className="mb-6 text-xs uppercase tracking-[0.2em] text-ink/50">Gallery</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {property.gallery.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${property.title} gallery ${index + 1}`}
                  className="h-48 w-full object-cover sm:h-64"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="h-fit space-y-6 lg:sticky lg:top-24">
          <div className="bg-linen p-8 shadow-soft">
            <h3 className="mb-2 font-serif text-3xl">Interested?</h3>
            <p className="mb-8 text-ink/70">Schedule a private showing or request more information about this property.</p>
            <Link to="/contact" className="flex w-full items-center justify-center gap-3 bg-ink px-6 py-4 text-sm uppercase tracking-[0.16em] text-white transition-colors hover:bg-ink/90">
              Schedule showing <CalendarDays size={18} />
            </Link>
            <button className="mt-4 w-full border border-ink/20 px-6 py-4 text-sm uppercase tracking-[0.16em] text-ink transition-colors hover:bg-white">
              Ask a question
            </button>
          </div>
          
          <div className="border border-ink/10 bg-white p-8">
             <div className="flex items-center gap-4">
               <div className="h-16 w-16 overflow-hidden rounded-full bg-mist">
                 <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80" alt="Agent" className="h-full w-full object-cover" />
               </div>
               <div>
                 <p className="font-serif text-xl">Jonathan Reed</p>
                 <p className="text-sm text-ink/60">Listing Agent</p>
               </div>
             </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
