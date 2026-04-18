/**
 * Ekstrak field dari body webhook Lynk (payment.received)
 */
export function extractLynkPaymentPayload(body) {
  const md = body?.data?.message_data;
  return {
    ref_id: md?.refId,
    amount: md?.totals?.grandTotal,
    message_id: body?.data?.message_id,
    customerEmail: md?.customer?.email,
  };
}
