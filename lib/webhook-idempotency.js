/** Cegah proses dua kali untuk message_id yang sama (memori proses; hilang saat restart) */
const processedMessageIds = new Set();

export function isDuplicateMessage(messageId) {
  if (!messageId) return false;
  return processedMessageIds.has(messageId);
}

export function markMessageProcessed(messageId) {
  if (messageId) processedMessageIds.add(messageId);
}
