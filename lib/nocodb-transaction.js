import { nocodbConfig } from '../config/index.js';

/**
 * @param {object} body — body webhook Lynk
 * @param {string} voucherCode — kode voucher yang baru dibuat
 * @param {string} lynkSignature — nilai header X-Lynk-Signature
 */
export function buildTransactionRow(body, voucherCode, lynkSignature) {
  const md = body?.data?.message_data;
  const customer = md?.customer;
  const c = nocodbConfig.transactionColumns;

  const itemsJson = Array.isArray(md?.items) ? JSON.stringify(md.items) : '';

  const row = {
    [c.eventName]: body?.event ?? '',
    [c.email]: customer?.email ?? '',
    [c.nama]: customer?.name ?? '',
    [c.refId]: md?.refId ?? '',
    [c.total]: md?.totals?.grandTotal ?? '',
    [c.signature]: String(lynkSignature ?? '').trim(),
    [c.items]: itemsJson,
    [c.statusAction]: body?.data?.message_action ?? '',
    [c.codeId]: voucherCode ?? '',
  };

  if (c.rawWebhook) {
    row[c.rawWebhook] = JSON.stringify(body);
  }

  return row;
}

export async function createNocoTransactionRecord(body, voucherCode, lynkSignature) {
  const cfg = nocodbConfig;
  const tableId = cfg.transactionsTableId;
  if (!cfg.apiToken || !tableId) {
    throw new Error('NocoDB apiToken atau transactionsTableId kosong');
  }
  const row = buildTransactionRow(body, voucherCode, lynkSignature);
  const url = `${cfg.baseUrl}/api/v2/tables/${encodeURIComponent(tableId)}/records`;
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
    throw new Error(`NocoDB transaksi ${r.status}: ${text.slice(0, 500)}`);
  }
  return JSON.parse(text);
}
