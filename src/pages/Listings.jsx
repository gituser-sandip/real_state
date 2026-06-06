import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useGlobalContext } from "../context/GlobalContext";
import { neighborhoodData } from "../data/mockData";
import { PropertyCard } from "../components/ui/PropertyCard";
import { PropertyDetail } from "../components/ui/PropertyDetail";
import { SelectField } from "../components/ui/FormFields";

const initialFilters = {
  query: "",
  location: "All",
  type: "All",
  maxPrice: "Any",
  beds: "Any",
  status: "All",
};

export function Listings() {
  const { properties, favorites, toggleFavorite } = useGlobalContext();
  const [filters, setFilters] = useState(initialFilters);
  const [selectedProperty, setSelectedProperty] = useState(properties[0]);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const query = filters.query.trim().toLowerCase();
      const matchesQuery =
        !query ||
        property.title.toLowerCase().includes(query) ||
        property.location.toLowerCase().includes(query) ||
        property.description.toLowerCase().includes(query);
      const matchesLocation = filters.location === "All" || property.location === filters.location;
      const matchesType = filters.type === "All" || property.type === filters.type;
      const matchesStatus = filters.status === "All" || property.status === filters.status;
      const matchesPrice = filters.maxPrice === "Any" || property.price <= Number(filters.maxPrice);
      const matchesBeds = filters.beds === "Any" || property.beds >= Number(filters.beds);
      return matchesQuery && matchesLocation && matchesType && matchesStatus && matchesPrice && matchesBeds;
    });
  }, [filters, properties]);

  function updateFilter(event) {
    const { name, value } = event.target;
    setFilters((current) => ({ ...current, [name]: value }));
  }

  return (
    <section className="bg-mist py-20 lg:py-28 mt-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-clay">Search and save</p>
            <h2 className="mt-4 font-serif text-4xl md:text-6xl">Find your next address</h2>
          </div>
          <Link to="/saved" className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em]">
            {favorites.length} saved homes <ChevronRight size={18} />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 bg-linen p-5 shadow-soft lg:grid-cols-6">
          <label className="lg:col-span-2">
            <span className="text-xs uppercase tracking-[0.16em] text-ink/55">Keyword</span>
            <input
              name="query"
              value={filters.query}
              onChange={updateFilter}
              placeholder="Search title, area, feature"
              className="mt-2 w-full border border-ink/20 bg-white px-4 py-3"
            />
          </label>
          <SelectField label="Location" name="location" value={filters.location} onChange={updateFilter} options={["All", ...neighborhoodData.map((area) => area.name), "North Shore"]} />
          <SelectField label="Type" name="type" value={filters.type} onChange={updateFilter} options={["All", "Single Family", "Condo", "Townhome", "Loft"]} />
          <SelectField label="Max price" name="maxPrice" value={filters.maxPrice} onChange={updateFilter} options={["Any", "1000000", "1500000", "2000000", "3000000", "4000000"]} />
          <SelectField label="Beds" name="beds" value={filters.beds} onChange={updateFilter} options={["Any", "2", "3", "4", "5"]} />
          <SelectField label="Status" name="status" value={filters.status} onChange={updateFilter} options={["All", "Active", "Coming Soon", "Private Exclusive"]} />
        </div>

        <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_0.82fr]">
          <div className="grid gap-7 md:grid-cols-2">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={favorites.includes(property.id)}
                onSelect={() => setSelectedProperty(property)}
                onFavorite={() => toggleFavorite(property.id)}
              />
            ))}
            {filteredProperties.length === 0 && (
              <div className="bg-linen p-8 text-ink/70 shadow-soft md:col-span-2">
                No homes match those filters. Widen the search or ask for private opportunities.
              </div>
            )}
          </div>
          <PropertyDetail 
            property={selectedProperty} 
            isFavorite={favorites.includes(selectedProperty?.id)} 
            onFavorite={() => toggleFavorite(selectedProperty?.id)} 
          />
        </div>
      </div>
    </section>
  );
}
