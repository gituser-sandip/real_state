import { Map } from "lucide-react";
import { neighborhoodData } from "../data/mockData";
import { Stat } from "../components/ui/Stat";

export function Areas() {
  return (
    <section className="neighborhood-band bg-cover bg-center py-24 text-white lg:py-32 bg-ink">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-sm uppercase tracking-[0.22em] text-white/72">City to suburbs</p>
        <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
          Neighborhood knowledge that changes the outcome.
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {neighborhoodData.map((area) => (
            <article key={area.name} className="border border-white/28 bg-white/12 p-5 backdrop-blur-sm">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-serif text-3xl">{area.name}</h3>
                <Map size={22} />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
                <Stat label="Median" value={area.median} dark />
                <Stat label="Days" value={area.days} dark />
                <Stat label="Schools" value={area.schools} dark />
              </div>
              <p className="mt-5 text-white/74">{area.lifestyle}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
