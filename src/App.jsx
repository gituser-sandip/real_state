import { Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Listings } from "./pages/Listings";
import { Buy } from "./pages/Buy";
import { Sell } from "./pages/Sell";
import { Valuation } from "./pages/Valuation";
import { Areas } from "./pages/Areas";
import { Saved } from "./pages/Saved";
import { Contact } from "./pages/Contact";
import { Admin } from "./pages/Admin";

export default function App() {
  return (
    <GlobalProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="buy" element={<Buy />} />
          <Route path="sell" element={<Sell />} />
          <Route path="listings" element={<Listings />} />
          <Route path="areas" element={<Areas />} />
          <Route path="valuation" element={<Valuation />} />
          <Route path="saved" element={<Saved />} />
          <Route path="contact" element={<Contact />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </GlobalProvider>
  );
}
