import { randomUUID } from 'node:crypto';
import { clean, emailPattern, parseJsonBody } from './_utils.js';

const bookings = [];

function assertBooking(body) {
  const booking = {
    name: clean(body.name, 120),
    email: clean(body.email, 120).toLowerCase(),
    service: clean(body.service, 80),
    date: clean(body.date, 24),
    time: clean(body.time, 40),
  };

  if (booking.name.length < 2) throw new Error('Name is required.');
  if (!emailPattern.test(booking.email)) throw new Error('Valid email is required.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(booking.date)) throw new Error('Valid date is required.');

  return booking;
}

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.statusCode = 405;
      res.setHeader('Allow', 'POST');
      res.end(JSON.stringify({ ok: false, message: 'Method not allowed' }));
      return;
    }

    const body = await parseJsonBody(req);
    const booking = assertBooking(body);
    bookings.push({ ...booking, id: randomUUID(), createdAt: new Date().toISOString() });
    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: true, message: 'Booking received.' }));
  } catch (err) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: false, message: err.message || 'Request could not be processed.' }));
  }
}
