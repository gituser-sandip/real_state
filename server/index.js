import cors from "cors";
import { randomUUID } from "node:crypto";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

const app = express();
const port = Number(process.env.PORT) || 8787;
const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
]);

const leads = [];
const bookings = [];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const phonePattern = /^[+()\d\s.-]{7,20}$/;

app.disable("x-powered-by");
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Origin is not allowed."));
    },
    methods: ["GET", "POST"],
  }),
);
app.use(express.json({ limit: "24kb" }));
app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 80,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  }),
);
app.use(
  "/api/leads",
  rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 6,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  }),
);

function clean(value, max = 160) {
  return String(value ?? "")
    .replace(/[<>{}`]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function assertLead(body) {
  const lead = {
    name: clean(body.name, 120),
    email: clean(body.email, 120).toLowerCase(),
    phone: clean(body.phone, 40),
    interest: clean(body.interest, 80),
    timeline: clean(body.timeline, 80),
    zip: clean(body.zip, 20),
    message: clean(body.message, 500),
    consent: Boolean(body.consent),
  };

  if (lead.name.length < 2) throw new Error("Name is required.");
  if (!emailPattern.test(lead.email)) throw new Error("Valid email is required.");
  if (!phonePattern.test(lead.phone)) throw new Error("Valid phone is required.");
  if (!lead.consent) throw new Error("Consent is required.");

  return lead;
}

function assertBooking(body) {
  const booking = {
    name: clean(body.name, 120),
    email: clean(body.email, 120).toLowerCase(),
    service: clean(body.service, 80),
    date: clean(body.date, 24),
    time: clean(body.time, 40),
  };

  if (booking.name.length < 2) throw new Error("Name is required.");
  if (!emailPattern.test(booking.email)) throw new Error("Valid email is required.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(booking.date)) throw new Error("Valid date is required.");

  return booking;
}

function valuationRange(body) {
  const address = clean(body.address, 160).toLowerCase();
  const condition = clean(body.condition, 40);
  const sqft = Math.min(Math.max(Number(body.sqft) || 2500, 500), 12000);
  const base = address.includes("lincoln") ? 595 : address.includes("wilmette") ? 525 : 475;
  const conditionFactor = condition === "Renovated" ? 1.12 : condition === "Needs work" ? 0.88 : 1;
  const low = Math.round(sqft * base * conditionFactor * 0.94);
  const high = Math.round(sqft * base * conditionFactor * 1.08);
  return { low, high };
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/api/leads", (req, res) => {
  const lead = assertLead(req.body);
  leads.push({ ...lead, id: randomUUID(), createdAt: new Date().toISOString() });
  res.status(201).json({ ok: true, message: "Lead received." });
});

app.post("/api/valuation", (req, res) => {
  res.json({ ok: true, range: valuationRange(req.body) });
});

app.post("/api/bookings", (req, res) => {
  const booking = assertBooking(req.body);
  bookings.push({ ...booking, id: randomUUID(), createdAt: new Date().toISOString() });
  res.status(201).json({ ok: true, message: "Booking received." });
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    next(err);
    return;
  }
  res.status(err.status || 400).json({ ok: false, message: err.message || "Request could not be processed." });
});

app.listen(port, "127.0.0.1", () => {
  console.log(`Northline Estates API running on http://127.0.0.1:${port}`);
});
