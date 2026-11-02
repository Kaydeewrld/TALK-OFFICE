// Vercel Serverless Function: /api/newsletter
import { sendNewsletterEmails } from './lib/email.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed. Use POST.' });
  }

  try {
    const { email } = req.body || {};
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'A valid email address is required.' });
    }

    let emailStatus = 'sent';
    try {
      await sendNewsletterEmails(email);
    } catch (emailErr) {
      console.error('Failed to send newsletter email:', emailErr);
      emailStatus = 'failed_to_send';
    }

    return res.status(200).json({
      success: true,
      message: 'You have been subscribed to The Talk Office Executive Briefing.',
      email,
      emailStatus
    });
  } catch (err) {
    console.error('Newsletter error:', err);
    return res.status(500).json({ success: false, error: 'Failed to subscribe.' });
  }
}

