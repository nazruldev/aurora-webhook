/**
 * Entry point — server webhook Lynk + NocoDB + email
 */
import 'dotenv/config';
import { createApp } from './app.js';
import { serverConfig } from './config/index.js';

const app = createApp();

const server = app.listen(serverConfig.port, serverConfig.host, () => {
  console.log(`Listening on http://${serverConfig.host}:${serverConfig.port}  POST /webhook`);
});

server.on('error', (err) => {
  console.error('[server] listen error:', err);
  process.exit(1);
});
