import { Router } from 'express';
import { lynkConfig } from '../config/index.js';
import { validateLynkSignature } from '../lib/lynk-signature.js';
import { extractLynkPaymentPayload } from '../lib/lynk-payload.js';
import { generateVoucherCode } from '../lib/voucher.js';
import { createNocoVoucher } from '../lib/nocodb-voucher.js';
import { createNocoTransactionRecord } from '../lib/nocodb-transaction.js';
import { sendVoucherEmail } from '../lib/email-sender.js';
import { isDuplicateMessage, markMessageProcessed } from '../lib/webhook-idempotency.js';

const router = Router();

router.post('/webhook', async (req, res) => {
  const sig = req.get(lynkConfig.signatureHeaderName);

  if (!lynkConfig.merchantKey) {
    return res.status(500).json({ ok: false, error: 'missing LYNK_MERCHANT_KEY' });
  }

  const { ref_id, amount, message_id, customerEmail } = extractLynkPaymentPayload(req.body);

  if (!validateLynkSignature(ref_id, amount, message_id, sig, lynkConfig.merchantKey)) {
    return res.status(401).json({ ok: false, error: 'invalid_signature' });
  }

  if (isDuplicateMessage(message_id)) {
    return res.status(200).json({ ok: true, duplicate: true });
  }

  const code = generateVoucherCode();

  try {
    await createNocoVoucher(code);
  } catch (e) {
    console.error('[NocoDB voucher]', e);
    return res.status(500).json({ ok: false, error: 'nocodb_failed', detail: String(e.message) });
  }

  try {
    await createNocoTransactionRecord(req.body, code, sig);
  } catch (e) {
    console.error('[NocoDB transaksi]', e);
  }

  markMessageProcessed(message_id);

  try {
    const sent = await sendVoucherEmail(customerEmail, code);
    if (!sent) {
      return res.status(200).json({
        ok: true,
        voucher_created: true,
        email_sent: false,
        warning: 'Voucher tersimpan; email tidak dikirim (cek konfigurasi email atau alamat pembeli).',
      });
    }
  } catch (e) {
    console.error('[email]', e);
    return res.status(200).json({
      ok: true,
      voucher_created: true,
      email_sent: false,
      warning: 'Voucher tersimpan di NocoDB tapi email gagal dikirim.',
      detail: String(e.message),
    });
  }

  return res.status(200).json({ ok: true, voucher_created: true, email_sent: true });
});

export default router;
