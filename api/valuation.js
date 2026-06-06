import { clean, parseJsonBody } from './_utils.js';

function valuationRange(body) {
  const address = clean(body.address, 160).toLowerCase();
  const condition = clean(body.condition, 40);
  const sqft = Math.min(Math.max(Number(body.sqft) || 2500, 500), 12000);
  const base = address.includes('lincoln') ? 595 : address.includes('wilmette') ? 525 : 475;
  const conditionFactor = condition === 'Renovated' ? 1.12 : condition === 'Needs work' ? 0.88 : 1;
  const low = Math.round(sqft * base * conditionFactor * 0.94);
  const high = Math.round(sqft * base * conditionFactor * 1.08);
  return { low, high };
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
    const range = valuationRange(body);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: true, range }));
  } catch (err) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: false, message: err.message || 'Request could not be processed.' }));
  }
}
