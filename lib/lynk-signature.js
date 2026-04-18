import crypto from 'node:crypto';

/**
 * Lynk: SHA256( amount + ref_id + message_id + secretKey ) hex === X-Lynk-Signature
 */
export function validateLynkSignature(ref_id, amount, message_id, receivedSignature, secretKey) {
  const signatureString =
    String(amount ?? '') + String(ref_id ?? '') + String(message_id ?? '') + String(secretKey ?? '');
  const calculatedSignature = crypto.createHash('sha256').update(signatureString, 'utf8').digest('hex');
  const recv = String(receivedSignature ?? '')
    .trim()
    .toLowerCase();
  if (!/^[0-9a-f]{64}$/.test(recv)) return false;
  const a = Buffer.from(calculatedSignature, 'hex');
  const b = Buffer.from(recv, 'hex');
  return crypto.timingSafeEqual(a, b);
}
