export function clean(value, max = 160) {
  return String(value ?? '')
    .replace(/[<>{}`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
export const phonePattern = /^[+()\d\s.-]{7,20}$/;

export async function parseJsonBody(req) {
  return await new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}
