import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import { emailConfig } from '../config/index.js';

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function sendViaResend(toEmail, voucherCode) {
  const { resend, from, subject } = emailConfig;
  const html = buildHtml(voucherCode);
  const client = new Resend(resend.apiKey);
  const { data, error } = await client.emails.send({
    from,
    to: toEmail,
    subject,
    html,
  });
  if (error) throw new Error(`Resend: ${error.message || JSON.stringify(error)}`);
  if (!data?.id) throw new Error('Resend: no message id returned');
  return true;
}

async function sendViaSmtp(toEmail, voucherCode) {
  const { smtp, from, subject } = emailConfig;
  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: { user: smtp.user, pass: smtp.pass },
  });
  await transporter.sendMail({
    from: from || smtp.user,
    to: toEmail,
    subject,
    html: buildHtml(voucherCode),
  });
  return true;
}

function buildHtml(voucherCode) {
  return `
    <p>Terima kasih atas pembayaran Anda.</p>
    <p><strong>Kode voucher:</strong> ${escapeHtml(voucherCode)}</p>
    <p>Simpan kode ini untuk mengakses produk.</p>
  `.trim();
}

/**
 * @returns {Promise<boolean>} true jika email benar-benar terkirim
 */
export async function sendVoucherEmail(toEmail, voucherCode) {
  if (!toEmail || !String(toEmail).includes('@')) {
    console.warn('[email] Alamat email pembeli tidak ada / tidak valid, skip kirim.');
    return false;
  }

  const { resend, smtp, from } = emailConfig;

  if (resend.apiKey && from) {
    await sendViaResend(toEmail, voucherCode);
    return true;
  }

  if (smtp.host && smtp.user && smtp.pass) {
    await sendViaSmtp(toEmail, voucherCode);
    return true;
  }

  console.warn(
    '[email] Belum dikonfigurasi. Resend: RESEND_API_KEY + EMAIL_FROM. Gmail: GMAIL_USER + GMAIL_APP_PASSWORD (smtp.gmail.com:587).',
  );
  return false;
}
