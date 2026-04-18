/**
 * Lynk.id — webhook & verifikasi signature
 */
export const lynkConfig = {
  /** Merchant Key dari Lynk → Settings → Webhooks */
  merchantKey: process.env.LYNK_MERCHANT_KEY || 's043aRkQXNc-1JizHILH1iIOHdITTsMj',
  signatureHeaderName: process.env.LYNK_SIGNATURE_HEADER || 'x-lynk-signature',
};
