/**
 * Email — Resend (SDK) atau SMTP Gmail (nodemailer)
 *
 * Gmail SMTP:
 * 1. Google Account → Security → aktifkan 2-Step Verification
 * 2. App Passwords: https://myaccount.google.com/apppasswords → buat untuk "Mail" / "Other"
 * 3. Isi GMAIL_USER + GMAIL_APP_PASSWORD di .env (lihat .env.example)
 * 4. Agar pakai Gmail: jangan set RESEND_API_KEY (atau kosongkan)
 *
 * Port 587 + STARTTLS (secure: false) — standar Gmail.
 */
const voucherDaysRaw = process.env.VOUCHER_VALID_DAYS;
const voucherDaysParsed =
  voucherDaysRaw != null && voucherDaysRaw !== '' ? parseInt(String(voucherDaysRaw), 10) : NaN;

export const emailConfig = {
  resend: {
    apiKey: process.env.RESEND_API_KEY || '',
  },
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 587),
    user: process.env.GMAIL_USER || 'aurora.aigenerate@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD || '',
    secure: process.env.SMTP_SECURE === 'true',
  },
  from: process.env.EMAIL_FROM || process.env.GMAIL_USER || 'aurora.aigenerate@gmail.com',
  subject: process.env.EMAIL_SUBJECT || 'Kode voucher Anda',
  voucherValidDays:
    Number.isFinite(voucherDaysParsed) && voucherDaysParsed > 0 ? voucherDaysParsed : 30,
};
