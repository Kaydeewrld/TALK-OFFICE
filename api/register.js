// Vercel Serverless Function: /api/register
import { sendRegistrationEmails } from './lib/email.js';

export default async function handler(req, res) {
  // Set CORS headers
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
    const { fullName, email, phone, organization, role, eventSlug, ticketType, notes } = req.body || {};

    if (!fullName || !email || !eventSlug) {
      return res.status(400).json({
        success: false,
        error: 'Full Name, Email Address, and Event selection are required.'
      });
    }

    const eventNames = {
      'career-dinner-2026': 'The Talk Office Career Dinner 2026 (Wednesday, 16 Dec · Abuja)',
      'hips-kigali-2027': 'HIPS Kigali — International Tour & Seminar (March 2027 · Rwanda)',
      'the-talk-table': 'The Talk Table (Curated Roundtable Edition)',
      'hips-nigeria-2027': 'HIPS Annual Seminar (2027 Cohorts · Abuja / Lagos)'
    };

    const registrationId = 'TTO-REG-' + Math.floor(100000 + Math.random() * 900000);
    const eventName = eventNames[eventSlug] || eventSlug;

    const registrationData = {
      registrationId,
      eventName,
      eventSlug,
      fullName,
      email,
      phone: phone || 'Not provided',
      organization: organization || 'Independent',
      role: role || 'Professional',
      ticketType: ticketType || 'Standard Delegate',
      createdAt: new Date().toISOString()
    };

    // Send confirmation to delegate and notification to thetalkoffice@gmail.com
    let emailStatus = 'sent';
    try {
      await sendRegistrationEmails(registrationData);
    } catch (emailErr) {
      console.error('Failed to send registration email:', emailErr);
      emailStatus = 'failed_to_send';
    }

    return res.status(200).json({
      success: true,
      message: `Registration confirmed for ${fullName} at ${eventName}.`,
      data: {
        ...registrationData,
        emailStatus
      }
    });
  } catch (err) {
    console.error('Registration processing error:', err);
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing registration.'
    });
  }
}
