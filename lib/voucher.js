import crypto from 'node:crypto';

/** Kode voucher: 6 karakter huruf besar + angka (A–Z, 0–9) */
const CODE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function generateVoucherCode() {
  const len = 6;
  const bytes = crypto.randomBytes(len);
  let out = '';
  for (let i = 0; i < len; i++) {
    out += CODE_CHARS[bytes[i] % CODE_CHARS.length];
  }
  return out;
}

export function expiryAfterDays(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 19).replace('T', ' ');
}
