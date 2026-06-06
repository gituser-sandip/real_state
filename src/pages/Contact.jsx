import { useState } from "react";
import { ShieldCheck, Mail, Home, ArrowRight, CalendarDays } from "lucide-react";
import { Field, SelectField, MAX_FIELD_LENGTH } from "../components/ui/FormFields";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const PHONE_PATTERN = /^[+()\d\s.-]{7,20}$/;
const ZIP_PATTERN = /^[A-Za-z0-9\s-]{3,12}$/;

const initialForm = {
  name: "",
  email: "",
  phone: "",
  interest: "Selling",
  timeline: "This quarter",
  zip: "",
  message: "",
  consent: false,
  honeypot: "",
};

const initialBooking = {
  name: "",
  email: "",
  service: "Seller consultation",
  date: "",
  time: "10:00 AM",
};

function sanitizeInput(value, max = MAX_FIELD_LENGTH) {
  return value.replace(/[<>{}`]/g, "").replace(/\s+/g, " ").trimStart().slice(0, max);
}

function validateLead(form) {
  const errors = {};
  if (!form.name.trim() || form.name.trim().length < 2) errors.name = "Enter your full name.";
  if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = "Enter a valid email address.";
  if (!PHONE_PATTERN.test(form.phone.trim())) errors.phone = "Enter a valid phone number.";
  if (form.zip && !ZIP_PATTERN.test(form.zip.trim())) errors.zip = "Use a valid ZIP or postal code.";
  if (form.message.length > 500) errors.message = "Keep the message under 500 characters.";
  if (!form.consent) errors.consent = "Consent is required before submitting.";
  if (form.honeypot) errors.honeypot = "Submission blocked.";
  return errors;
}

export function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [lastSubmitAt, setLastSubmitAt] = useState(0);

  const [booking, setBooking] = useState(initialBooking);
  const [bookingStatus, setBookingStatus] = useState("");

  function handleField(event) {
    const { name, value, type, checked } = event.target;
    const nextValue = type === "checkbox" ? checked : sanitizeInput(value, name === "message" ? 500 : MAX_FIELD_LENGTH);
    setForm((current) => ({ ...current, [name]: nextValue }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setStatus("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const now = Date.now();
    if (now - lastSubmitAt < 8000) {
      setStatus("Please wait a moment before submitting again.");
      return;
    }
    const nextErrors = validateLead(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.message || "Request could not be processed.");
      setLastSubmitAt(now);
      setStatus("Thanks. Your secure inquiry has been received by the advisory team.");
      setForm((current) => ({ ...initialForm, interest: current.interest, timeline: current.timeline }));
    } catch (error) {
      setStatus(error.message || "An error occurred.");
    }
  }

  function updateBooking(event) {
    const { name, value } = event.target;
    setBooking((current) => ({ ...current, [name]: sanitizeInput(value, 80) }));
    setBookingStatus("");
  }

  async function submitBooking(event) {
    event.preventDefault();
    if (!booking.name || !EMAIL_PATTERN.test(booking.email) || !booking.date) {
      setBookingStatus("Add your name, a valid email, and preferred date.");
      return;
    }
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.message || "Booking could not be processed.");
      setBookingStatus(`${booking.service} reserved for ${booking.date} at ${booking.time}.`);
      setBooking(initialBooking);
    } catch (error) {
      setBookingStatus(error.message || "An error occurred.");
    }
  }

  return (
    <>
      <section className="bg-mist py-20 lg:py-28 mt-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-clay">Booking calendar</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">Reserve a consultation or showing.</h2>
            <p className="mt-6 text-lg leading-8 text-ink/70">
              Choose a service and preferred time. We will reach out to confirm the appointment.
            </p>
          </div>
          <form className="grid gap-5 bg-linen p-6 shadow-soft md:p-8" onSubmit={submitBooking}>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Name" name="name" value={booking.name} onChange={updateBooking} />
              <Field label="Email" name="email" value={booking.email} onChange={updateBooking} />
              <SelectField label="Service" name="service" value={booking.service} onChange={updateBooking} options={["Seller consultation", "Buyer strategy call", "Private showing", "Valuation review"]} />
              <SelectField label="Time" name="time" value={booking.time} onChange={updateBooking} options={["10:00 AM", "12:30 PM", "2:00 PM", "4:30 PM"]} />
            </div>
            <label className="block">
              <span className="text-sm font-medium">Date</span>
              <input
                type="date"
                name="date"
                value={booking.date}
                onChange={updateBooking}
                className="mt-2 w-full border border-ink/20 bg-white px-4 py-3"
              />
            </label>
            <button className="inline-flex items-center justify-center gap-3 bg-ink px-6 py-4 text-sm uppercase tracking-[0.16em] text-white">
              Book appointment <CalendarDays size={18} />
            </button>
            {bookingStatus && <p className="border-l-4 border-brass bg-white p-4 text-sm text-ink/72">{bookingStatus}</p>}
          </form>
        </div>
      </section>

      <section className="bg-ink py-20 text-white lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-white/62">Get in touch</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">
              Get your valuation or start a private search.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/70">
              Share only what is needed. We validate each submission in the browser, never expose secrets in the client,
              and keep consent explicit before any outreach.
            </p>
            <div className="mt-8 grid gap-4 text-white/78">
              <p className="flex items-center gap-3">
                <ShieldCheck className="text-brass" size={22} /> Secure intake with consent confirmation
              </p>
              <p className="flex items-center gap-3">
                <Mail className="text-brass" size={22} /> hello@northlineestates.example
              </p>
              <p className="flex items-center gap-3">
                <Home className="text-brass" size={22} /> Chicago and North Shore advisory offices
              </p>
            </div>
          </div>

          <form className="bg-linen p-6 text-ink shadow-soft md:p-8" onSubmit={handleSubmit} noValidate>
            <input
              type="text"
              name="honeypot"
              value={form.honeypot}
              onChange={handleField}
              tabIndex="-1"
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Full name" name="name" value={form.name} error={errors.name} onChange={handleField} autoComplete="name" />
              <Field label="Email" name="email" value={form.email} error={errors.email} onChange={handleField} autoComplete="email" />
              <Field label="Phone" name="phone" value={form.phone} error={errors.phone} onChange={handleField} autoComplete="tel" />
              <Field label="ZIP / area" name="zip" value={form.zip} error={errors.zip} onChange={handleField} autoComplete="postal-code" />
              <SelectField label="Interest" name="interest" value={form.interest} onChange={handleField} options={["Selling", "Buying", "Selling & Buying", "Valuation", "Relocation"]} />
              <SelectField label="Timeline" name="timeline" value={form.timeline} onChange={handleField} options={["This quarter", "3-6 months", "6-12 months", "Just researching"]} />
            </div>
            <label className="mt-5 block">
              <span className="text-sm font-medium">Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleField}
                rows="4"
                maxLength="500"
                className="mt-2 w-full border border-ink/20 bg-white px-4 py-3"
                placeholder="Tell us about the property, neighborhood, or timing."
              />
              {errors.message && <span className="mt-2 block text-sm text-clay">{errors.message}</span>}
            </label>
            <label className="mt-5 flex gap-3 text-sm leading-6 text-ink/70">
              <input type="checkbox" name="consent" checked={form.consent} onChange={handleField} className="mt-1 h-4 w-4 accent-ink" />
              <span>
                I agree to be contacted by Northline Estates by call, email, and text about real estate services. Reply
                STOP to opt out. Message and data rates may apply.
              </span>
            </label>
            {errors.consent && <p className="mt-2 text-sm text-clay">{errors.consent}</p>}
            <button type="submit" className="mt-7 inline-flex w-full items-center justify-center gap-3 bg-ink px-6 py-4 text-sm uppercase tracking-[0.16em] text-white">
              Request advisory call <ArrowRight size={18} />
            </button>
            {status && (
              <p className="mt-5 border-l-4 border-brass bg-white px-4 py-3 text-sm text-ink/75" role="status">
                {status}
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
