import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Building2, Menu, Phone, X } from "lucide-react";

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-linen text-ink flex flex-col">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-ink/72 text-white backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link to="/" className="flex items-center gap-3" aria-label="Northline Estates home">
            <span className="grid h-10 w-10 place-items-center border border-white/40">
              <Building2 size={21} />
            </span>
            <span className="font-serif text-2xl tracking-normal">Northline Estates</span>
          </Link>
          <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.16em] lg:flex">
            <Link to="/sell">Sell</Link>
            <Link to="/listings">Search</Link>
            <Link to="/areas">Areas</Link>
            <Link to="/valuation">Valuation</Link>
            <Link to="/saved">Saved</Link>
          </nav>
          <div className="hidden items-center gap-4 lg:flex">
            <a href="tel:+13127967530" className="flex items-center gap-2 text-sm">
              <Phone size={16} />
              (312) 796-7530
            </a>
            <Link
              to="/contact"
              className="border border-white px-5 py-3 text-sm uppercase tracking-[0.16em] transition hover:bg-white hover:text-ink"
            >
              Consultation
            </Link>
          </div>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center border border-white/35 lg:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="border-t border-white/15 bg-ink px-5 py-5 text-sm uppercase tracking-[0.18em] lg:hidden">
            {[
              { path: "/sell", label: "Sell" },
              { path: "/listings", label: "Search" },
              { path: "/areas", label: "Areas" },
              { path: "/valuation", label: "Valuation" },
              { path: "/saved", label: "Saved" },
              { path: "/contact", label: "Contact" },
            ].map((item) => (
              <Link key={item.path} to={item.path} className="block py-3" onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-linen py-10 mt-auto border-t border-ink/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-5 text-sm text-ink/62 md:flex-row lg:px-8">
          <p>&copy; {new Date().getFullYear()} Northline Estates. Information is deemed reliable but not guaranteed.</p>
          <div className="flex gap-5">
            <Link to="/contact">Privacy</Link>
            <Link to="/contact">Terms</Link>
            <Link to="/contact">Accessibility</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
