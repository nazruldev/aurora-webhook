/**
 * Server HTTP (Express)
 */
const rawPort = process.env.PORT;
const parsedPort = rawPort != null && rawPort !== '' ? parseInt(String(rawPort), 10) : NaN;

export const serverConfig = {
  /** Railway/Render/etc. menginject PORT; lokal fallback 8787 */
  port: Number.isFinite(parsedPort) && parsedPort > 0 ? parsedPort : 8787,
  host: process.env.HOST || '0.0.0.0',
  jsonBodyLimit: '2mb',
};
