/**
 * NocoDB
 * - table voucher (kode akses)
 * - table transaksi — kolom sama seperti di NocoDB Anda
 */
export const nocodbConfig = {
  baseUrl: 'https://app.nocodb.com',
  apiToken: 'nc_pat_K1gGmG2-O_wKpp5rftD13nyrRV2voAgchkt1Nesz',

  /** Tabel voucher */
  tableId: 'm03akpbxoa2pi0l',
  columns: {
    value: 'value',
    status: 'status',
    expiredAt: 'expired_at',
  },
  /** Baru dari webhook: selalu `active` (sesuaikan dengan opsi di tabel NocoDB jika pakai Single Select) */
  defaultStatus: 'active',

  /** Tabel transaksi */
  transactionsTableId: 'mwlh1kqxg6tqzeh',
  /**
   * Nama field di NocoDB.
   * rawWebhook: kosongkan '' jika belum ada kolom; jika diisi (mis. webhook_json), buat kolom Long Text di NocoDB → isi full JSON webhook.
   */
  transactionColumns: {
    eventName: 'event_name',
    email: 'email',
    nama: 'nama',
    refId: 'refId',
    total: 'total',
    signature: 'signature',
    items: 'items',
    statusAction: 'status_action',
    codeId: 'code_id',
    rawWebhook: '',
  },
};
