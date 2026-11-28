const ALLOWED_ORIGINS = new Set([
  'https://waleedhassan.vercel.app',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
]);

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateBuckets = new Map();

function getClientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.length > 0) {
    return fwd.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateBuckets.get(ip);
  if (!entry || now > entry.resetAt) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

module.exports = async function handler(req, res) {
  const origin = req.headers.origin;
  res.setHeader('Vary', 'Origin');
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return res.status(403).json({ success: false, message: 'Forbidden origin.' });
  }

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed.' });
  }

  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please wait a few minutes before sending another message.'
    });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      if (body.length > 10000) {
        return res.status(413).json({ success: false, message: 'Payload too large.' });
      }
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({ success: false, message: 'Invalid JSON request body.' });
      }
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return res.status(400).json({ success: false, message: 'Invalid request payload.' });
    }

    // Honeypot anti-spam check
    if (typeof body._honey === 'string' && body._honey.trim().length > 0) {
      return res.status(200).json({
        success: true,
        message: '✓ Thank you! Your message has been received.'
      });
    }

    const name = typeof body.name === 'string' ? body.name.replace(/[\r\n]+/g, ' ').trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (name.length < 2 || name.length > 100) {
      return res.status(400).json({ success: false, message: 'Please provide a valid name (2–100 characters).' });
    }
    if (email.length < 5 || email.length > 150 || !EMAIL_RE.test(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }
    if (message.length < 5 || message.length > 4000) {
      return res.status(400).json({ success: false, message: 'Please provide a message between 5 and 4000 characters.' });
    }

    const formSubmitResponse = await fetch('https://formsubmit.co/ajax/waleed2206420@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'https://waleedhassan.vercel.app',
        'Referer': 'https://waleedhassan.vercel.app/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `New Portfolio Message from ${name}`,
        _captcha: 'false',
        _template: 'table'
      })
    });

    const rawText = await formSubmitResponse.text();
    let data = null;
    try {
      data = JSON.parse(rawText);
    } catch (e) {
      console.error('FormSubmit non-JSON response status:', formSubmitResponse.status);
      return res.status(502).json({
        success: false,
        message: 'Email delivery service is temporarily unavailable. Please email waleed2206420@gmail.com directly.'
      });
    }

    if (data && (data.success === 'true' || data.success === true)) {
      return res.status(200).json({
        success: true,
        message: '✓ Thank you! Your message has been sent directly to Waleed.'
      });
    }

    if (data && typeof data.message === 'string' && data.message.includes('Activation')) {
      return res.status(503).json({
        success: false,
        activationNeeded: true,
        message: 'Form activation is pending. Please email waleed2206420@gmail.com directly.'
      });
    }

    console.error('FormSubmit rejected submission:', data && data.message);
    return res.status(502).json({
      success: false,
      message: 'Unable to deliver message right now. Please try direct email.'
    });
  } catch (error) {
    console.error('Contact API internal error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while delivering message.'
    });
  }
};
