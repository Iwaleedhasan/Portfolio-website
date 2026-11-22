module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }
    body = body || {};

    const { name, email, message } = body;

    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill in all fields (Name, Email, Message).' 
      });
    }

    // Forward submission from Vercel server to FormSubmit
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
        name: name,
        email: email,
        message: message,
        _subject: `New Portfolio Message from ${name} (via WaleedHassan.vercel.app)`,
        _captcha: 'false',
        _template: 'table'
      })
    });

    const rawText = await formSubmitResponse.text();
    let data = {};
    try {
      data = JSON.parse(rawText);
    } catch (e) {
      data = { success: false, message: rawText };
    }

    if (data && (data.success === 'true' || data.success === true)) {
      return res.status(200).json({
        success: true,
        message: '✓ Thank you! Your message has been sent directly to Waleed.'
      });
    }

    if (data && data.message && typeof data.message === 'string' && data.message.includes('Activation')) {
      return res.status(200).json({
        success: false,
        activationNeeded: true,
        message: 'FormSubmit activation required. Please check your Gmail (including Spam folder) to click "Activate Form" once.'
      });
    }

    return res.status(200).json({
      success: false,
      message: data.message || 'Delivery service pending.'
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error while delivering message.'
    });
  }
};
