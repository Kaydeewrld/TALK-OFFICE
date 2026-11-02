// Vercel Serverless Function: /api/contact
import { sendContactEmails } from './lib/email.js';

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
    const { fullName, email, phone, organization, serviceType, message } = req.body || {};

    if (!fullName || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and message are required.'
      });
    }

    const inquiryId = 'TTO-INQ-' + Math.floor(100000 + Math.random() * 900000);

    const inquiryData = {
      inquiryId,
      fullName,
      email,
      phone: phone || '',
      organization: organization || 'N/A',
      serviceType: serviceType || 'General Consultation',
      message,
      createdAt: new Date().toISOString()
    };

    // Send confirmation to user and alert to thetalkoffice@gmail.com
    let emailStatus = 'sent';
    try {
      await sendContactEmails(inquiryData);
    } catch (emailErr) {
      console.error('Failed to send contact email:', emailErr);
      emailStatus = 'failed_to_send';
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you for reaching out to The Talk Office. A confirmation email has been sent and our consulting practice will respond within 24 hours.',
      data: {
        ...inquiryData,
        emailStatus
      }
    });
  } catch (err) {
    console.error('Contact processing error:', err);
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred while submitting inquiry.'
    });
  }
}
