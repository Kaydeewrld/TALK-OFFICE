// Vercel Serverless Function: /api/order
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
    const { fullName, email, phone, address, items, notes } = req.body || {};

    if (!fullName || !email || !items || !items.length) {
      return res.status(400).json({
        success: false,
        error: 'Full name, email, and at least one item must be selected.'
      });
    }

    const orderId = 'TTO-ORD-' + Math.floor(100000 + Math.random() * 900000);
    const totalAmount = items.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

    return res.status(200).json({
      success: true,
      message: 'Resource order placed successfully. An invoice and delivery details have been prepared.',
      data: {
        orderId,
        fullName,
        email,
        phone: phone || '',
        address: address || 'To be confirmed with customer care',
        items,
        totalAmount,
        currency: 'NGN',
        formattedTotal: `₦${totalAmount.toLocaleString()}`,
        status: 'Confirmed - Pending Dispatch/Digital Access',
        createdAt: new Date().toISOString()
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing your resource order.'
    });
  }
}
