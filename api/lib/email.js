import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Helper to safely load environment variables from .env if not already present in process.env
function loadEnvDefaults() {
  const defaults = {
    EMAIL_USER: 'thetalkoffice@gmail.com',
    EMAIL_PASS: 'ulalsgcpycefogxr',
    EMAIL_FROM_NAME: 'TheTalkOffice',
    EMAIL_NOTIFICATION_TARGET: 'thetalkoffice@gmail.com',
    EMAIL_HOST: 'smtp.gmail.com',
    EMAIL_PORT: '465',
    EMAIL_SECURE: 'true'
  };

  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split(/\r?\n/).forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const eqIdx = trimmed.indexOf('=');
          if (eqIdx !== -1) {
            const key = trimmed.slice(0, eqIdx).trim();
            const val = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, '');
            if (!process.env[key]) {
              process.env[key] = val;
            }
          }
        }
      });
    }
  } catch (err) {
    // Non-blocking
  }

  return {
    user: process.env.EMAIL_USER || defaults.EMAIL_USER,
    pass: (process.env.EMAIL_PASS || defaults.EMAIL_PASS).replace(/\s+/g, ''),
    fromName: process.env.EMAIL_FROM_NAME || defaults.EMAIL_FROM_NAME,
    notificationTarget: process.env.EMAIL_NOTIFICATION_TARGET || defaults.EMAIL_NOTIFICATION_TARGET,
    host: process.env.EMAIL_HOST || defaults.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || defaults.EMAIL_PORT, 10),
    secure: (process.env.EMAIL_SECURE || defaults.EMAIL_SECURE) === 'true'
  };
}

const config = loadEnvDefaults();

// Create reusable transporter
export function getTransporter() {
  const currentConfig = loadEnvDefaults();
  return nodemailer.createTransport({
    host: currentConfig.host,
    port: currentConfig.port,
    secure: currentConfig.secure,
    service: 'gmail',
    auth: {
      user: currentConfig.user,
      pass: currentConfig.pass
    }
  });
}

const BRAND_HEADER = `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #082220; padding: 28px 24px; text-align: center; border-top-left-radius: 16px; border-top-right-radius: 16px;">
    <tr>
      <td align="center">
        <div style="font-family: Georgia, 'Times New Roman', serif; font-size: 22px; font-weight: bold; letter-spacing: 2px; color: #FAF8F5;">
          <span style="color: #D99B26;">THE</span> TALK OFFICE
        </div>
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: #2DD4BF; margin-top: 6px;">
          Workforce Transformation · Leadership Development
        </div>
      </td>
    </tr>
  </table>
`;

const BRAND_FOOTER = `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAF8F5; border-top: 1px solid #E5ECEB; padding: 24px; text-align: center; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <tr>
      <td align="center" style="font-size: 12px; color: #6A7875; line-height: 1.6;">
        <strong style="color: #141A19;">The Talk Office</strong><br />
        No 15 Aba Close, Area 8, Garki, Abuja, Nigeria<br />
        Telephone: <a href="tel:07033774156" style="color: #0C7C7B; text-decoration: none;">07033774156</a> · <a href="tel:08166399901" style="color: #0C7C7B; text-decoration: none;">08166399901</a><br />
        Email: <a href="mailto:hello@thetalkoffice.com" style="color: #0C7C7B; text-decoration: none;">hello@thetalkoffice.com</a> · <a href="mailto:thetalkoffice@gmail.com" style="color: #0C7C7B; text-decoration: none;">thetalkoffice@gmail.com</a><br />
        Website: <a href="https://www.thetalkoffice.com" style="color: #0C7C7B; text-decoration: none; font-weight: 600;">www.thetalkoffice.com</a>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding-top: 14px; font-size: 11px; color: #9AA8A5;">
        &copy; ${new Date().getFullYear()} The Talk Office. All rights reserved.
      </td>
    </tr>
  </table>
`;

/**
 * 1. Send Registration Confirmation & Admin Alert
 */
export async function sendRegistrationEmails(registration) {
  const {
    registrationId,
    eventName,
    eventSlug,
    fullName,
    email,
    phone,
    organization,
    role,
    ticketType
  } = registration;

  const transporter = getTransporter();
  const currentConfig = loadEnvDefaults();
  const fromAddress = `"${currentConfig.fromName}" <${currentConfig.user}>`;

  const isCareerDinner = eventSlug === 'career-dinner-2026';

  // Delegate Email Content
  const delegateHtml = `
    <div style="background-color: #EBF4F3; padding: 30px 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(12, 124, 123, 0.08); border: 1px solid #D6E8E6;">
        ${BRAND_HEADER}

        <div style="padding: 32px 28px;">
          <div style="display: inline-block; padding: 4px 12px; border-radius: 20px; background-color: #EAF6F6; color: #0C7C7B; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
            Registration Confirmed
          </div>

          <h1 style="font-family: Georgia, serif; font-size: 24px; color: #141A19; margin: 0 0 10px 0;">
            Dear ${fullName},
          </h1>
          <p style="font-size: 14px; color: #52605E; line-height: 1.6; margin: 0 0 24px 0;">
            Thank you for registering to join us. Your delegate seat reservation has been officially received.
          </p>

          <!-- Reservation Card -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAF8F5; border: 1px solid #0C7C7B25; border-radius: 12px; padding: 18px; margin-bottom: 24px; font-size: 13px;">
            <tr>
              <td style="padding: 6px 0; color: #6A7875; width: 38%;">Registration ID:</td>
              <td style="padding: 6px 0; color: #141A19; font-weight: bold; font-family: monospace;">${registrationId}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6A7875;">Event:</td>
              <td style="padding: 6px 0; color: #141A19; font-weight: 600;">${eventName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6A7875;">Delegate Tier:</td>
              <td style="padding: 6px 0; color: #0C7C7B; font-weight: 600;">${ticketType}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6A7875;">Organization:</td>
              <td style="padding: 6px 0; color: #141A19;">${organization || 'Independent'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6A7875;">Contact Phone:</td>
              <td style="padding: 6px 0; color: #141A19;">${phone || 'Not provided'}</td>
            </tr>
          </table>

          ${
            isCareerDinner
              ? (() => {
                  let paystackUrl = 'https://paystack.shop/pay/careerdinner26';
                  let tierLabel = 'Individual Ticket (₦100,000)';
                  if (ticketType && ticketType.includes('Celebration')) {
                    paystackUrl = 'https://paystack.shop/pay/careerdinner26t1';
                    tierLabel = 'Celebration Table (₦1,000,000)';
                  } else if (ticketType && ticketType.includes('Signature')) {
                    paystackUrl = 'https://paystack.shop/pay/careerdinner26t2';
                    tierLabel = 'Signature Table (₦3,000,000)';
                  } else if (ticketType && ticketType.includes('Executive')) {
                    paystackUrl = 'https://paystack.shop/pay/careerdinner26t3';
                    tierLabel = 'Executive Table (₦5,000,000)';
                  }

                  return `
            <!-- Career Dinner 2026 Specific Callout -->
            <div style="background: linear-gradient(135deg, #0A2E2B 0%, #12423E 100%); border-radius: 12px; padding: 22px; color: #ffffff; margin-bottom: 24px; border: 1px solid #2DD4BF40;">
              <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #2DD4BF; font-weight: bold; margin-bottom: 6px;">
                Career Dinner 2026 · Table & Seat Allocation
              </div>
              <div style="font-family: Georgia, serif; font-size: 18px; font-weight: bold; color: #ffffff; margin-bottom: 6px;">
                Theme: Celebrating the Work. Honouring the Journey.
              </div>
              <p style="font-size: 12px; color: #C7E3DF; line-height: 1.6; margin: 0 0 14px 0;">
                <strong>Date:</strong> Wednesday, 16 December 2026<br />
                <strong>Time:</strong> Red Carpet: 4:00 PM · Event starts: 5:30 PM<br />
                <strong>Venue:</strong> The Signature by Wells Carlton Hotel, Asokoro, Abuja<br />
                <strong>Selected Tier:</strong> ${tierLabel}
              </p>
              <div style="text-align: center; margin: 16px 0;">
                <a href="${paystackUrl}" target="_blank" style="display: inline-block; background-color: #D99B26; color: #ffffff; font-size: 12px; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 30px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 10px rgba(217, 155, 38, 0.4);">
                  Complete Payment on Paystack &rarr;
                </a>
              </div>
              <!-- Zenith Bank Remittance Box -->
              <div style="background-color: rgba(255, 255, 255, 0.08); border: 1px solid rgba(45, 212, 191, 0.25); border-radius: 8px; padding: 12px; font-size: 11px; color: #E0F2F1; margin-top: 14px; text-align: left;">
                <strong style="color: #2DD4BF;">Corporate Direct Settlement Option (Zenith Bank):</strong><br />
                Account Name: <strong>The Talk Office</strong><br />
                Account Number: <strong style="font-family: monospace; font-size: 13px; color: #FAF8F5;">1019925375</strong><br />
                Bank: <strong>Zenith Bank Plc</strong><br />
                <em>Kindly use your organization name or delegate name as payment narration and send proof of payment to hello@thetalkoffice.com.</em>
              </div>
            </div>
            `;
                })()
              : ''
          }

          <p style="font-size: 13px; color: #52605E; line-height: 1.6; margin: 0 0 16px 0;">
            For Corporate tables, Sponsorship, or Partnership opportunities, please contact our consulting desk at 
            <a href="mailto:hello@thetalkoffice.com" style="color: #0C7C7B; font-weight: bold;">hello@thetalkoffice.com</a> or call 
            <a href="tel:07033774156" style="color: #0C7C7B; font-weight: bold;">07033774156</a> / 
            <a href="tel:08166399901" style="color: #0C7C7B; font-weight: bold;">08166399901</a>.
          </p>

          <p style="font-size: 13px; color: #141A19; line-height: 1.6; margin: 24px 0 0 0;">
            <em>Secure your seat, join the good company.</em><br /><br />
            Warm regards,<br />
            <strong>Njuara Njama Esq.</strong><br />
            <span style="font-size: 12px; color: #0C7C7B;">Founder & Lead Consultant · The Talk Office</span>
          </p>
        </div>

        ${BRAND_FOOTER}
      </div>
    </div>
  `;

  // Admin Notification Content
  const adminHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; color: #141A19;">
      <h2 style="color: #0C7C7B;">🔔 New Event Registration Received</h2>
      <p>A new delegate has registered on The Talk Office website:</p>
      <ul>
        <li><strong>Registration ID:</strong> ${registrationId}</li>
        <li><strong>Event:</strong> ${eventName} (${eventSlug})</li>
        <li><strong>Full Name:</strong> ${fullName}</li>
        <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
        <li><strong>Phone:</strong> ${phone || 'N/A'}</li>
        <li><strong>Organization:</strong> ${organization || 'N/A'}</li>
        <li><strong>Role:</strong> ${role || 'N/A'}</li>
        <li><strong>Ticket/Category:</strong> ${ticketType}</li>
        <li><strong>Date:</strong> ${new Date().toLocaleString()}</li>
      </ul>
    </div>
  `;

  // Send to delegate
  const delegateResult = await transporter.sendMail({
    from: fromAddress,
    to: email,
    subject: `Registration Confirmed: ${eventName} — The Talk Office`,
    html: delegateHtml
  });

  // Send admin notification
  const adminResult = await transporter.sendMail({
    from: fromAddress,
    to: currentConfig.notificationTarget,
    subject: `[New Registration] ${fullName} - ${eventName}`,
    html: adminHtml
  });

  return { delegateResult, adminResult };
}

/**
 * 2. Send Toolkit Order Confirmation & Admin Notification
 */
export async function sendOrderEmails(order) {
  const {
    orderId,
    fullName,
    email,
    phone,
    address,
    items,
    totalAmount,
    formattedTotal
  } = order;

  const transporter = getTransporter();
  const currentConfig = loadEnvDefaults();
  const fromAddress = `"${currentConfig.fromName}" <${currentConfig.user}>`;

  const itemsHtml = (items || [])
    .map(
      (it) => `
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #E5ECEB; color: #141A19; font-weight: 600;">
        ${it.title || it.name}
      </td>
      <td align="center" style="padding: 8px 0; border-bottom: 1px solid #E5ECEB; color: #6A7875;">
        ${it.quantity || 1}
      </td>
      <td align="right" style="padding: 8px 0; border-bottom: 1px solid #E5ECEB; color: #0C7C7B; font-weight: bold;">
        ₦${((it.price || 0) * (it.quantity || 1)).toLocaleString()}
      </td>
    </tr>
  `
    )
    .join('');

  const customerHtml = `
    <div style="background-color: #EBF4F3; padding: 30px 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(12, 124, 123, 0.08); border: 1px solid #D6E8E6;">
        ${BRAND_HEADER}

        <div style="padding: 32px 28px;">
          <div style="display: inline-block; padding: 4px 12px; border-radius: 20px; background-color: #EAF6F6; color: #0C7C7B; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
            Order Placed Successfully
          </div>

          <h1 style="font-family: Georgia, serif; font-size: 24px; color: #141A19; margin: 0 0 10px 0;">
            Thank you, ${fullName}
          </h1>
          <p style="font-size: 14px; color: #52605E; line-height: 1.6; margin: 0 0 24px 0;">
            Your order for The Talk Office executive resources and toolkits has been received. Our team will coordinate your dispatch and digital companion delivery.
          </p>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAF8F5; border: 1px solid #0C7C7B25; border-radius: 12px; padding: 18px; margin-bottom: 24px; font-size: 13px;">
            <tr>
              <td style="padding: 6px 0; color: #6A7875; width: 38%;">Order Number:</td>
              <td style="padding: 6px 0; color: #141A19; font-weight: bold; font-family: monospace;">${orderId}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6A7875;">Delivery Address:</td>
              <td style="padding: 6px 0; color: #141A19;">${address || 'To be confirmed'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6A7875;">Contact Phone:</td>
              <td style="padding: 6px 0; color: #141A19;">${phone || 'Not provided'}</td>
            </tr>
          </table>

          <h3 style="font-family: Georgia, serif; font-size: 16px; color: #141A19; margin: 0 0 12px 0;">
            Items Ordered
          </h3>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px; margin-bottom: 24px;">
            <thead>
              <tr style="color: #6A7875; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">
                <th align="left" style="padding-bottom: 8px;">Product</th>
                <th align="center" style="padding-bottom: 8px;">Qty</th>
                <th align="right" style="padding-bottom: 8px;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
              <tr>
                <td colspan="2" style="padding-top: 14px; font-size: 14px; font-weight: bold; color: #141A19;">Total</td>
                <td align="right" style="padding-top: 14px; font-size: 16px; font-weight: bold; color: #0C7C7B;">${formattedTotal || '₦' + totalAmount.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>

          <p style="font-size: 13px; color: #52605E; line-height: 1.6; margin: 0 0 16px 0;">
            Our customer relations team will contact you directly via phone/WhatsApp to confirm dispatch timing.
          </p>

          <p style="font-size: 13px; color: #141A19; line-height: 1.6; margin: 24px 0 0 0;">
            Warm regards,<br />
            <strong>The Talk Office Store & Publishing Desk</strong>
          </p>
        </div>

        ${BRAND_FOOTER}
      </div>
    </div>
  `;

  const adminHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; color: #141A19;">
      <h2 style="color: #D99B26;">🛒 New Toolkit Order Placed</h2>
      <p>A new resource order has been placed on the store:</p>
      <ul>
        <li><strong>Order ID:</strong> ${orderId}</li>
        <li><strong>Customer:</strong> ${fullName} (<a href="mailto:${email}">${email}</a>)</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Delivery Address:</strong> ${address}</li>
        <li><strong>Total:</strong> ${formattedTotal || '₦' + totalAmount}</li>
      </ul>
      <h4>Items:</h4>
      <ul>
        ${(items || []).map((it) => `<li>${it.title || it.name} x${it.quantity || 1} (₦${it.price})</li>`).join('')}
      </ul>
    </div>
  `;

  const customerResult = await transporter.sendMail({
    from: fromAddress,
    to: email,
    subject: `Order Confirmation: ${orderId} — The Talk Office`,
    html: customerHtml
  });

  const adminResult = await transporter.sendMail({
    from: fromAddress,
    to: currentConfig.notificationTarget,
    subject: `[New Order] ${orderId} - ${fullName} (${formattedTotal || '₦' + totalAmount})`,
    html: adminHtml
  });

  return { customerResult, adminResult };
}

/**
 * 3. Send Contact / Advisory Inquiry Confirmation & Admin Alert
 */
export async function sendContactEmails(inquiry) {
  const {
    inquiryId,
    fullName,
    email,
    phone,
    organization,
    serviceType,
    message
  } = inquiry;

  const transporter = getTransporter();
  const currentConfig = loadEnvDefaults();
  const fromAddress = `"${currentConfig.fromName}" <${currentConfig.user}>`;

  const userHtml = `
    <div style="background-color: #EBF4F3; padding: 30px 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(12, 124, 123, 0.08); border: 1px solid #D6E8E6;">
        ${BRAND_HEADER}

        <div style="padding: 32px 28px;">
          <div style="display: inline-block; padding: 4px 12px; border-radius: 20px; background-color: #EAF6F6; color: #0C7C7B; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
            Inquiry Received
          </div>

          <h1 style="font-family: Georgia, serif; font-size: 24px; color: #141A19; margin: 0 0 10px 0;">
            Thank you for contacting us, ${fullName}
          </h1>
          <p style="font-size: 14px; color: #52605E; line-height: 1.6; margin: 0 0 24px 0;">
            We have received your advisory and partnership inquiry. Our executive consulting team will review your message and get back to you within 24 business hours.
          </p>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAF8F5; border: 1px solid #0C7C7B25; border-radius: 12px; padding: 18px; margin-bottom: 24px; font-size: 13px;">
            <tr>
              <td style="padding: 6px 0; color: #6A7875; width: 38%;">Reference ID:</td>
              <td style="padding: 6px 0; color: #141A19; font-weight: bold; font-family: monospace;">${inquiryId}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6A7875;">Service Focus:</td>
              <td style="padding: 6px 0; color: #0C7C7B; font-weight: 600;">${serviceType}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6A7875;">Organization:</td>
              <td style="padding: 6px 0; color: #141A19;">${organization || 'Independent'}</td>
            </tr>
          </table>

          <div style="background-color: #FAF8F5; border-left: 3px solid #0C7C7B; padding: 14px 18px; margin-bottom: 24px; font-size: 13px; color: #4E5C5A; line-height: 1.6; font-style: italic;">
            "${message}"
          </div>

          <p style="font-size: 13px; color: #141A19; line-height: 1.6; margin: 24px 0 0 0;">
            Warm regards,<br />
            <strong>Advisory & Client Relations Team</strong><br />
            <span style="font-size: 12px; color: #0C7C7B;">The Talk Office</span>
          </p>
        </div>

        ${BRAND_FOOTER}
      </div>
    </div>
  `;

  const adminHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; color: #141A19;">
      <h2 style="color: #0C7C7B;">📩 New Consultation / Contact Inquiry</h2>
      <ul>
        <li><strong>Inquiry ID:</strong> ${inquiryId}</li>
        <li><strong>From:</strong> ${fullName} (<a href="mailto:${email}">${email}</a>)</li>
        <li><strong>Phone:</strong> ${phone || 'N/A'}</li>
        <li><strong>Organization:</strong> ${organization || 'N/A'}</li>
        <li><strong>Service Requested:</strong> ${serviceType}</li>
      </ul>
      <h4>Message:</h4>
      <div style="background-color: #f4f4f4; padding: 15px; border-radius: 8px;">
        ${message}
      </div>
    </div>
  `;

  const userResult = await transporter.sendMail({
    from: fromAddress,
    to: email,
    subject: `Inquiry Received: ${serviceType} [${inquiryId}] — The Talk Office`,
    html: userHtml
  });

  const adminResult = await transporter.sendMail({
    from: fromAddress,
    to: currentConfig.notificationTarget,
    subject: `[New Inquiry] ${fullName} - ${serviceType}`,
    html: adminHtml
  });

  return { userResult, adminResult };
}

/**
 * 4. Send Newsletter Subscription Confirmation & Admin Alert
 */
export async function sendNewsletterEmails(email) {
  const transporter = getTransporter();
  const currentConfig = loadEnvDefaults();
  const fromAddress = `"${currentConfig.fromName}" <${currentConfig.user}>`;

  const subscriberHtml = `
    <div style="background-color: #EBF4F3; padding: 30px 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(12, 124, 123, 0.08); border: 1px solid #D6E8E6;">
        ${BRAND_HEADER}

        <div style="padding: 32px 28px;">
          <h1 style="font-family: Georgia, serif; font-size: 24px; color: #141A19; margin: 0 0 10px 0;">
            Welcome to The Talk Office Executive Briefing
          </h1>
          <p style="font-size: 14px; color: #52605E; line-height: 1.6; margin: 0 0 20px 0;">
            You have successfully subscribed to our monthly executive briefing. You will receive curated leadership essays, workforce transformation frameworks, and priority invitations to our flagship gatherings.
          </p>

          <p style="font-size: 13px; color: #141A19; line-height: 1.6; margin: 24px 0 0 0;">
            Warm regards,<br />
            <strong>Njuara Njama Esq. & The Talk Office Editorial Desk</strong>
          </p>
        </div>

        ${BRAND_FOOTER}
      </div>
    </div>
  `;

  const subscriberResult = await transporter.sendMail({
    from: fromAddress,
    to: email,
    subject: `Welcome to The Talk Office Executive Briefing`,
    html: subscriberHtml
  });

  const adminResult = await transporter.sendMail({
    from: fromAddress,
    to: currentConfig.notificationTarget,
    subject: `[New Newsletter Subscriber] ${email}`,
    html: `<p>A new executive has subscribed to The Talk Office Executive Briefing: <strong>${email}</strong></p>`
  });

  return { subscriberResult, adminResult };
}
