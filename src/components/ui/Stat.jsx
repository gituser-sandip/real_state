export function Stat({ label, value, dark = false }) {
  return (
    <div className={dark ? "border border-white/16 p-3" : "border border-white/22 p-3"}>
      <p className={dark ? "text-xs uppercase tracking-[0.16em] text-white/46" : "text-xs uppercase tracking-[0.16em] text-white/62"}>
        {label}
      </p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}
