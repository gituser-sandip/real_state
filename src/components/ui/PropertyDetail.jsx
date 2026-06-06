import { MapPin, BookmarkCheck, Bookmark, Check, CalendarDays } from "lucide-react";
import { formatPrice } from "./PropertyCard";
import { Stat } from "./Stat";
import { Link } from "react-router-dom";

export function PropertyDetail({ property, isFavorite, onFavorite }) {
  if (!property) return null;

  return (
    <aside className="sticky top-24 h-fit bg-ink p-6 text-white shadow-soft">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-white/55">{property.status}</p>
          <h3 className="mt-2 font-serif text-4xl">{property.title}</h3>
          <p className="mt-2 flex items-center gap-2 text-white/70">
            <MapPin size={17} /> {property.location}
          </p>
        </div>
        <button
          type="button"
          onClick={onFavorite}
          className="grid h-11 w-11 place-items-center border border-white/24"
          aria-label={isFavorite ? "Remove favorite" : "Save favorite"}
        >
          {isFavorite ? <BookmarkCheck size={20} className="text-brass" /> : <Bookmark size={20} />}
        </button>
      </div>
      <img src={property.image} alt={`${property.title} primary view`} className="mt-6 h-72 w-full object-cover" />
      <p className="mt-5 font-serif text-5xl">{formatPrice(property.price)}</p>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-white/74">
        <Stat label="Beds" value={property.beds} dark />
        <Stat label="Baths" value={property.baths} dark />
        <Stat label="Sq ft" value={property.sqft.toLocaleString()} dark />
        <Stat label="HOA" value={property.hoa ? formatPrice(property.hoa) : "None"} dark />
      </div>
      <p className="mt-5 leading-7 text-white/72">{property.description}</p>
      <div className="mt-5 grid gap-3">
        {property.highlights.map((item) => (
          <p key={item} className="flex items-center gap-3 text-white/78">
            <Check className="text-brass" size={18} /> {item}
          </p>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {property.gallery.map((image) => (
          <img key={image} src={image} alt={`${property.title} gallery`} className="h-28 w-full object-cover" />
        ))}
      </div>
      <Link to="/contact" className="mt-6 inline-flex w-full items-center justify-center gap-3 bg-white px-6 py-4 text-sm uppercase tracking-[0.16em] text-ink">
        Schedule showing <CalendarDays size={18} />
      </Link>
    </aside>
  );
}
