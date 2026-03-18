import nodemailer from 'nodemailer';

const createTransporter = () =>
  nodemailer.createTransport({
    host:   process.env.EMAIL_HOST,
    port:   Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

const FROM = process.env.EMAIL_FROM || 'MATTRESS FACTORY <noreply@mattressfactory.in>';

/* ── helpers ─────────────────────────────────────────── */
const wrap = (body: string) => `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;">
  <div style="background:#1a2a6c;padding:24px 32px;">
    <h1 style="margin:0;color:#fff;font-size:20px;letter-spacing:1px;">MATTRESS FACTORY</h1>
  </div>
  <div style="padding:32px;">
    ${body}
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:28px 0;">
    <p style="color:#9ca3af;font-size:12px;margin:0;">© ${new Date().getFullYear()} Mattress Factory · <a href="https://mattressfactory.in" style="color:#9ca3af;">mattressfactory.in</a></p>
  </div>
</div>`;

const send = async (to: string, subject: string, html: string) => {
  try {
    console.log(`[email] attempting → ${to} | user: ${process.env.EMAIL_USER}`);
    const transporter = createTransporter();
    await transporter.sendMail({ from: FROM, to, subject, html });
    console.log(`[email] sent "${subject}" → ${to}`);
  } catch (err) {
    console.error('[email] FAILED:', err);
  }
};

/* ── order status emails ─────────────────────────────── */

export const sendOrderConfirmedEmail = (email: string, name: string, orderNumber: string) =>
  send(email, `Order Confirmed – #${orderNumber}`, wrap(`
    <h2 style="color:#1a2a6c;margin-top:0;">Your Order is Confirmed! 🎉</h2>
    <p>Hi <strong>${name}</strong>,</p>
    <p>Thank you for shopping with us! Your order <strong>#${orderNumber}</strong> has been <span style="color:#1d4ed8;font-weight:600;">confirmed</span> and is being prepared.</p>
    <div style="background:#eff6ff;border-left:4px solid #1d4ed8;padding:16px 20px;border-radius:6px;margin:24px 0;">
      <p style="margin:0;color:#1e40af;font-weight:600;">Order #${orderNumber}</p>
      <p style="margin:6px 0 0;color:#3b82f6;">Status: Confirmed</p>
    </div>
    <p>We'll notify you as soon as your order ships. If you have any questions, contact us at <a href="mailto:info@mattressfactory.in" style="color:#1a2a6c;">info@mattressfactory.in</a>.</p>
    <p>Best regards,<br><strong>The Mattress Factory Team</strong></p>
  `));

export const sendOrderShippedEmail = (email: string, name: string, orderNumber: string, trackingNumber?: string | null) =>
  send(email, `Your Order #${orderNumber} Has Shipped! 🚚`, wrap(`
    <h2 style="color:#1a2a6c;margin-top:0;">Your Order is on the Way! 🚚</h2>
    <p>Hi <strong>${name}</strong>,</p>
    <p>Great news! Your order <strong>#${orderNumber}</strong> has been <span style="color:#7c3aed;font-weight:600;">shipped</span> and is on its way to you.</p>
    <div style="background:#f5f3ff;border-left:4px solid #7c3aed;padding:16px 20px;border-radius:6px;margin:24px 0;">
      <p style="margin:0;color:#6d28d9;font-weight:600;">Order #${orderNumber}</p>
      <p style="margin:6px 0 0;color:#7c3aed;">Status: Shipped</p>
      ${trackingNumber ? `<p style="margin:6px 0 0;color:#6d28d9;"><strong>Tracking Number:</strong> ${trackingNumber}</p>` : ''}
    </div>
    <p>You can expect your delivery soon. Please ensure someone is available to receive the package.</p>
    <p>Best regards,<br><strong>The Mattress Factory Team</strong></p>
  `));

export const sendOrderDeliveredEmail = (email: string, name: string, orderNumber: string) =>
  send(email, `Order #${orderNumber} Delivered Successfully! ✅`, wrap(`
    <h2 style="color:#1a2a6c;margin-top:0;">Order Delivered! ✅</h2>
    <p>Hi <strong>${name}</strong>,</p>
    <p>Your order <strong>#${orderNumber}</strong> has been <span style="color:#16a34a;font-weight:600;">delivered</span> successfully!</p>
    <div style="background:#f0fdf4;border-left:4px solid #16a34a;padding:16px 20px;border-radius:6px;margin:24px 0;">
      <p style="margin:0;color:#15803d;font-weight:600;">Order #${orderNumber}</p>
      <p style="margin:6px 0 0;color:#22c55e;">Status: Delivered</p>
    </div>
    <p>We hope you love your new mattress! We'd appreciate a review to help other customers.</p>
    <p>If you have any concerns about your order, please contact us at <a href="mailto:info@mattressfactory.in" style="color:#1a2a6c;">info@mattressfactory.in</a> within 24 hours.</p>
    <p>Best regards,<br><strong>The Mattress Factory Team</strong></p>
  `));

export const sendOrderCancelledEmail = (email: string, name: string, orderNumber: string) =>
  send(email, `Order #${orderNumber} Has Been Cancelled`, wrap(`
    <h2 style="color:#1a2a6c;margin-top:0;">Order Cancelled</h2>
    <p>Hi <strong>${name}</strong>,</p>
    <p>Your order <strong>#${orderNumber}</strong> has been <span style="color:#dc2626;font-weight:600;">cancelled</span>.</p>
    <div style="background:#fef2f2;border-left:4px solid #dc2626;padding:16px 20px;border-radius:6px;margin:24px 0;">
      <p style="margin:0;color:#b91c1c;font-weight:600;">Order #${orderNumber}</p>
      <p style="margin:6px 0 0;color:#ef4444;">Status: Cancelled</p>
    </div>
    <p>If you believe this is a mistake or need assistance, please contact us at <a href="mailto:info@mattressfactory.in" style="color:#1a2a6c;">info@mattressfactory.in</a> or call <strong>+91 77606 93333</strong>.</p>
    <p>We hope to serve you again soon.</p>
    <p>Best regards,<br><strong>The Mattress Factory Team</strong></p>
  `));
