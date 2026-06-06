import { formatPrice } from "./PropertyCard";

export const MAX_FIELD_LENGTH = 120;

export function Field({ label, name, value, error, onChange, autoComplete }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        maxLength={MAX_FIELD_LENGTH}
        className="mt-2 w-full border border-ink/20 bg-white px-4 py-3"
        aria-invalid={Boolean(error)}
      />
      {error && <span className="mt-2 block text-sm text-clay">{error}</span>}
    </label>
  );
}

export function SelectField({ label, name, value, onChange, options }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <select name={name} value={value} onChange={onChange} className="mt-2 w-full border border-ink/20 bg-white px-4 py-3">
        {options.map((option) => (
          <option key={option} value={option}>
            {option === "Any" || option === "All" || Number.isNaN(Number(option)) ? option : name === "maxPrice" ? formatPrice(option) : option}
          </option>
        ))}
      </select>
    </label>
  );
}
