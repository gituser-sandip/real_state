import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useGlobalContext } from "../context/GlobalContext";
import { Field, SelectField, MAX_FIELD_LENGTH } from "../components/ui/FormFields";
import { formatPrice } from "../components/ui/PropertyCard";

const initialListingForm = {
  title: "",
  location: "Lincoln Park",
  price: "",
  beds: "3",
  baths: "2",
  sqft: "",
  type: "Single Family",
  status: "Coming Soon",
  image: "",
};

function sanitizeInput(value, max = MAX_FIELD_LENGTH) {
  return value.replace(/[<>{}`]/g, "").replace(/\s+/g, " ").trimStart().slice(0, max);
}

export function Admin() {
  const { properties, addProperty, removeProperty } = useGlobalContext();
  const [listingForm, setListingForm] = useState(initialListingForm);
  const [adminStatus, setAdminStatus] = useState("");

  function handleListingField(event) {
    const { name, value } = event.target;
    setListingForm((current) => ({ ...current, [name]: sanitizeInput(value, 180) }));
    setAdminStatus("");
  }

  function addListing(event) {
    event.preventDefault();
    if (!listingForm.title || !listingForm.price || !listingForm.sqft) {
      setAdminStatus("Add a title, price, and square footage before publishing.");
      return;
    }

    const nextProperty = {
      id: `${listingForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
      title: listingForm.title,
      location: listingForm.location,
      price: Number(listingForm.price),
      beds: Number(listingForm.beds),
      baths: Number(listingForm.baths),
      sqft: Number(listingForm.sqft),
      type: listingForm.type,
      status: listingForm.status,
      hoa: 0,
      tax: Math.round(Number(listingForm.price) * 0.012),
      image:
        listingForm.image ||
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      gallery: [],
      highlights: ["New listing", "Admin managed", "Buyer inquiry ready", "Marketed privately"],
      description: "A newly added property managed from the lightweight admin dashboard.",
    };

    addProperty(nextProperty);
    setListingForm(initialListingForm);
    setAdminStatus(`${nextProperty.title} was added to the listing collection.`);
  }

  return (
    <section className="bg-mist py-20 min-h-[70vh]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-clay">Dashboard</p>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl">Admin Workspace</h2>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <form className="bg-linen p-6 shadow-soft md:p-8 h-fit" onSubmit={addListing}>
            <p className="mb-6 font-serif text-2xl">Add Property</p>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Title" name="title" value={listingForm.title} onChange={handleListingField} />
              <Field label="Price" name="price" value={listingForm.price} onChange={handleListingField} />
              <Field label="Sq Ft" name="sqft" value={listingForm.sqft} onChange={handleListingField} />
              <Field label="Image URL (Optional)" name="image" value={listingForm.image} onChange={handleListingField} />
              
              <SelectField label="Location" name="location" value={listingForm.location} onChange={handleListingField} options={["Lincoln Park", "Roscoe Village", "Lakeview", "Wilmette", "North Shore", "Wicker Park", "Logan Square"]} />
              <SelectField label="Type" name="type" value={listingForm.type} onChange={handleListingField} options={["Single Family", "Condo", "Townhome", "Loft"]} />
              <SelectField label="Status" name="status" value={listingForm.status} onChange={handleListingField} options={["Active", "Coming Soon", "Private Exclusive"]} />
              <SelectField label="Beds" name="beds" value={listingForm.beds} onChange={handleListingField} options={["1", "2", "3", "4", "5", "6"]} />
              <SelectField label="Baths" name="baths" value={listingForm.baths} onChange={handleListingField} options={["1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5"]} />
            </div>
            <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-3 bg-ink px-6 py-4 text-sm uppercase tracking-[0.16em] text-white">
              Publish Listing <Plus size={18} />
            </button>
            {adminStatus && <p className="mt-4 border-l-4 border-brass bg-white p-3 text-sm text-ink/75">{adminStatus}</p>}
          </form>

          <div className="bg-linen p-6 shadow-soft md:p-8">
            <p className="mb-6 font-serif text-2xl">Manage Active Inventory</p>
            <div className="grid gap-3">
              {properties.map((property) => (
                <div key={property.id} className="flex items-center justify-between border border-ink/10 bg-white p-4">
                  <div>
                    <p className="font-medium text-ink">{property.title}</p>
                    <p className="text-sm text-ink/62">{formatPrice(property.price)} - {property.status}</p>
                  </div>
                  <button
                    onClick={() => removeProperty(property.id)}
                    className="p-2 text-clay hover:bg-clay/10 transition"
                    aria-label={`Delete ${property.title}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
