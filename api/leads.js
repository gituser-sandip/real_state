import { randomUUID } from 'node:crypto';
import { clean, emailPattern, phonePattern, parseJsonBody } from './_utils.js';

const leads = [];

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

  if (lead.name.length < 2) throw new Error('Name is required.');
  if (!emailPattern.test(lead.email)) throw new Error('Valid email is required.');
  if (!phonePattern.test(lead.phone)) throw new Error('Valid phone is required.');
  if (!lead.consent) throw new Error('Consent is required.');

  return lead;
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
    const lead = assertLead(body);
    leads.push({ ...lead, id: randomUUID(), createdAt: new Date().toISOString() });
    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: true, message: 'Lead received.' }));
  } catch (err) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: false, message: err.message || 'Request could not be processed.' }));
  }
}
