import { MapPin, BookmarkCheck, Bookmark, BedDouble, Bath, Square, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function formatPrice(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

export function PropertyCard({ property, isFavorite, onSelect, onFavorite }) {
  return (
    <motion.article 
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-linen shadow-soft"
    >
      <button type="button" onClick={onSelect} className="block w-full text-left">
        <img src={property.image} alt={`${property.title} exterior`} className="h-64 w-full object-cover" />
      </button>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-clay">{property.status}</p>
            <h3 className="mt-2 font-serif text-3xl">{property.title}</h3>
            <p className="mt-2 flex items-center gap-2 text-ink/64">
              <MapPin size={16} />
              {property.location}
            </p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onFavorite();
            }}
            className="grid h-11 w-11 shrink-0 place-items-center border border-ink/15"
            aria-label={isFavorite ? `Remove ${property.title} from favorites` : `Save ${property.title}`}
          >
            {isFavorite ? <BookmarkCheck size={20} className="text-brass" /> : <Bookmark size={20} />}
          </button>
        </div>
        <p className="mt-4 text-xl font-medium">{formatPrice(property.price)}</p>
        <div className="mt-6 grid grid-cols-3 gap-3 border-t border-ink/12 pt-5 text-sm text-ink/72">
          <span className="flex items-center gap-2">
            <BedDouble size={17} /> {property.beds}
          </span>
          <span className="flex items-center gap-2">
            <Bath size={17} /> {property.baths}
          </span>
          <span className="flex items-center gap-2">
            <Square size={17} /> {property.sqft.toLocaleString()} sq ft
          </span>
        </div>
        <Link to={`/property/${property.id}`} className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em]">
          View details <ChevronRight size={17} />
        </Link>
      </div>
    </motion.article>
  );
}
