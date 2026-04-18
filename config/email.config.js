/**
 * Email — Resend (SDK) atau SMTP Gmail (nodemailer)
 *
 * Gmail SMTP:
 * 1. Google Account → Security → aktifkan 2-Step Verification
 * 2. App Passwords: https://myaccount.google.com/apppasswords → buat untuk "Mail" / "Other"
 * 3. Isi GMAIL_USER + GMAIL_APP_PASSWORD di file .env (lihat .env.example), atau isi smtp.user / smtp.pass di bawah
 * 4. Agar pakai Gmail: kosongkan resend.apiKey (jangan set RESEND_API_KEY)
 *
 * Port 587 + STARTTLS (secure: false) — standar Gmail.
 */
export const emailConfig = {
  resend: {
    apiKey: process.env.RESEND_API_KEY || '',
  },
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 587),
    user: process.env.GMAIL_USER || 'aurora.aigenerate@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD || 'jeqz uska macx jwtx',
    secure: process.env.SMTP_SECURE === 'true',
  },
  /** From: pakai alamat Gmail yang sama dengan smtp.user (atau kosongkan → dipakai smtp.user) */
  from: process.env.EMAIL_FROM || process.env.GMAIL_USER || 'aurora.aigenerate@gmail.com',
  subject: 'Kode voucher Anda',
  voucherValidDays: 30,
};
