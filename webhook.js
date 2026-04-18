/**
 * Entry point — server webhook Lynk + NocoDB + email
 * dotenv harus pertama agar PORT/env terbaca konsisten saat import config.
 */
import 'dotenv/config';
import { createApp } from './app.js';
import { serverConfig } from './config/index.js';

const app = createApp();

console.log('[boot] NODE_ENV=%s NODE=%s', process.env.NODE_ENV || '(unset)', process.version);
console.log('[boot] listen target host=%s port=%s (env PORT=%s)', serverConfig.host, serverConfig.port, process.env.PORT ?? '(unset)');

const server = app.listen(serverConfig.port, serverConfig.host, () => {
  console.log(`Listening on http://${serverConfig.host}:${serverConfig.port}  GET|POST /webhook`);
});

server.on('error', (err) => {
  console.error('[server] listen error:', err);
  process.exit(1);
});

/** Railway mengirim SIGTERM saat redeploy/scale — bukan error aplikasi */
function shutdown(signal) {
  console.log(`[server] ${signal} — menutup koneksi…`);
  server.close(() => {
    console.log('[server] selesai.');
    process.exit(0);
  });
  setTimeout(() => process.exit(0), 10_000).unref();
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
