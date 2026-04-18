/**
 * NocoDB
 * - table voucher (kode akses)
 * - table transaksi — kolom sama seperti di NocoDB Anda
 */
export const nocodbConfig = {
  baseUrl: process.env.NOCODB_BASE_URL || 'https://app.nocodb.com',
  apiToken: process.env.NOCODB_API_TOKEN || 'nc_pat_K1gGmG2-O_wKpp5rftD13nyrRV2voAgchkt1Nesz',

  /** Tabel voucher */
  tableId: process.env.NOCODB_TABLE_ID || 'm03akpbxoa2pi0l',
  columns: {
    value: process.env.NOCODB_COL_VALUE || 'value',
    status: process.env.NOCODB_COL_STATUS || 'status',
    expiredAt: process.env.NOCODB_COL_EXPIRED_AT || 'expired_at',
  },
  /** Baru dari webhook: selalu `active` (sesuaikan dengan opsi di tabel NocoDB jika pakai Single Select) */
  defaultStatus: process.env.NOCODB_VOUCHER_DEFAULT_STATUS || 'active',

  /** Tabel transaksi */
  transactionsTableId: process.env.NOCODB_TRANSACTIONS_TABLE_ID || 'mwlh1kqxg6tqzeh',
  transactionColumns: {
    eventName: process.env.NOCODB_TX_EVENT_NAME || 'event_name',
    email: process.env.NOCODB_TX_EMAIL || 'email',
    nama: process.env.NOCODB_TX_NAMA || 'nama',
    refId: process.env.NOCODB_TX_REF_ID || 'refId',
    total: process.env.NOCODB_TX_TOTAL || 'total',
    signature: process.env.NOCODB_TX_SIGNATURE || 'signature',
    items: process.env.NOCODB_TX_ITEMS || 'items',
    statusAction: process.env.NOCODB_TX_STATUS_ACTION || 'status_action',
    codeId: process.env.NOCODB_TX_CODE_ID || 'code_id',
    /** Kosongkan jika tidak ada kolom di NocoDB */
    rawWebhook: process.env.NOCODB_TX_RAW_WEBHOOK || '',
  },
};
