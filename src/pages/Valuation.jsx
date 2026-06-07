import { useState, useMemo } from "react";
import { TrendingUp } from "lucide-react";
import { Field, SelectField } from "../components/ui/FormFields";
import { formatPrice } from "../components/ui/PropertyCard";

const initialValuation = {
  address: "",
  condition: "Updated",
  beds: "3",
  baths: "2",
  sqft: "",
  timeline: "This quarter",
};

export function Valuation() {
  const [valuation, setValuation] = useState(initialValuation);
  const [valuationResult, setValuationResult] = useState(null);
  
  const [payment, setPayment] = useState({
    price: "925000",
    downPayment: "20",
    rate: "6.75",
    years: "30",
    taxes: "8200",
    insurance: "2400",
    hoa: "560",
  });

  const monthlyPayment = useMemo(() => {
    const price = Number(payment.price) || 0;
    const downPercent = Number(payment.downPayment) || 0;
    const rate = (Number(payment.rate) || 0) / 100 / 12;
    const months = (Number(payment.years) || 30) * 12;
    const loan = price * (1 - downPercent / 100);
    const principal = rate ? (loan * rate * (1 + rate) ** months) / ((1 + rate) ** months - 1) : loan / months;
    const taxes = (Number(payment.taxes) || 0) / 12;
    const insurance = (Number(payment.insurance) || 0) / 12;
    const hoa = Number(payment.hoa) || 0;
    return Math.round(principal + taxes + insurance + hoa);
  }, [payment]);

  function updateValuation(event) {
    const { name, value } = event.target;
    setValuation((current) => ({ ...current, [name]: value }));
  }

  async function calculateValuation(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/valuation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(valuation),
      });
      const data = await response.json();
      if (!response.ok) throw new Error("Fallback");
      setValuationResult(data.range);
    } catch {
      const sqft = Number(valuation.sqft) || 2500;
      const locationBoost = valuation.address.toLowerCase().includes("lincoln") ? 595 : 475;
      const conditionBoost = valuation.condition === "Renovated" ? 1.12 : valuation.condition === "Needs work" ? 0.88 : 1;
      const low = Math.round(sqft * locationBoost * conditionBoost * 0.94);
      const high = Math.round(sqft * locationBoost * conditionBoost * 1.08);
      setValuationResult({ low, high });
    }
  }

  function updatePayment(event) {
    const { name, value } = event.target;
    setPayment((current) => ({ ...current, [name]: value }));
  }

  return (
    <>
      <section className="bg-mist py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-clay">Home valuation</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">Get a fast pricing range.</h2>
            <p className="mt-6 text-lg leading-8 text-ink/70">
              This estimate is a planning tool. A final list price should include condition, showing competition, recent
              contracts, and buyer demand.
            </p>
          </div>
          <form className="grid gap-5 bg-linen p-6 shadow-soft md:p-8" onSubmit={calculateValuation}>
            <Field label="Address or neighborhood" name="address" value={valuation.address} onChange={updateValuation} />
            <div className="grid gap-5 md:grid-cols-4">
              <SelectField label="Condition" name="condition" value={valuation.condition} onChange={updateValuation} options={["Renovated", "Updated", "Needs work"]} />
              <SelectField label="Beds" name="beds" value={valuation.beds} onChange={updateValuation} options={["1", "2", "3", "4", "5", "6"]} />
              <SelectField label="Baths" name="baths" value={valuation.baths} onChange={updateValuation} options={["1", "2", "3", "4", "5"]} />
              <Field label="Square feet" name="sqft" value={valuation.sqft} onChange={updateValuation} />
            </div>
            <SelectField label="Timeline" name="timeline" value={valuation.timeline} onChange={updateValuation} options={["This quarter", "3-6 months", "6-12 months", "Just researching"]} />
            <button className="inline-flex items-center justify-center gap-3 bg-ink px-6 py-4 text-sm uppercase tracking-[0.16em] text-white">
              Calculate range <TrendingUp size={18} />
            </button>
            {valuationResult && (
              <div className="border-l-4 border-brass bg-white p-5 mt-4">
                <p className="text-sm uppercase tracking-[0.16em] text-ink/55">Estimated range</p>
                <p className="mt-2 font-serif text-4xl">
                  {formatPrice(valuationResult.low)} - {formatPrice(valuationResult.high)}
                </p>
              </div>
            )}
          </form>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="bg-mist p-6 shadow-soft md:p-8 max-w-4xl mx-auto">
            <p className="text-sm uppercase tracking-[0.22em] text-clay">Mortgage calculator</p>
            <h2 className="mt-3 font-serif text-4xl">Estimate monthly cost</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Field label="Price" name="price" value={payment.price} onChange={updatePayment} />
              <Field label="Down payment %" name="downPayment" value={payment.downPayment} onChange={updatePayment} />
              <Field label="Interest rate %" name="rate" value={payment.rate} onChange={updatePayment} />
              <Field label="Loan years" name="years" value={payment.years} onChange={updatePayment} />
              <Field label="Annual taxes" name="taxes" value={payment.taxes} onChange={updatePayment} />
              <Field label="Annual insurance" name="insurance" value={payment.insurance} onChange={updatePayment} />
              <Field label="Monthly HOA" name="hoa" value={payment.hoa} onChange={updatePayment} />
            </div>
            <div className="mt-6 bg-ink p-5 text-white">
              <p className="text-sm uppercase tracking-[0.16em] text-white/62">Estimated monthly payment</p>
              <p className="mt-2 font-serif text-5xl">{formatPrice(monthlyPayment)}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
