/**
 * Entry point — server webhook Lynk + NocoDB + email
 */
import 'dotenv/config';
import { createApp } from './app.js';
import { serverConfig } from './config/index.js';

const app = createApp();

app.listen(serverConfig.port, serverConfig.host, () => {
  console.log(`http://${serverConfig.host}:${serverConfig.port}  POST /webhook`);
});
