import { nocodbConfig, emailConfig } from '../config/index.js';
import { expiryAfterDays } from './voucher.js';

export async function createNocoVoucher(code) {
  const cfg = nocodbConfig;
  if (!cfg.apiToken || !cfg.tableId) {
    throw new Error('NOCODB_API_TOKEN dan NOCODB_TABLE_ID wajib di-set');
  }
  const row = {
    [cfg.columns.value]: code,
    [cfg.columns.status]: cfg.defaultStatus,
    [cfg.columns.expiredAt]: expiryAfterDays(emailConfig.voucherValidDays),
  };
  const url = `${cfg.baseUrl}/api/v2/tables/${encodeURIComponent(cfg.tableId)}/records`;
  // NocoDB v2: body = satu objek baris ATAU array objek — bukan { records: [...] }
  const r = await fetch(url, {
    method: 'POST',
    headers: {
      'xc-token': cfg.apiToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([row]),
  });
  const text = await r.text();
  if (!r.ok) {
    throw new Error(`NocoDB ${r.status}: ${text.slice(0, 500)}`);
  }
  return JSON.parse(text);
}
