import express from 'express';
import { serverConfig } from './config/index.js';
import webhookRoutes from './routes/webhook.routes.js';

export function createApp() {
  const app = express();
  app.use(express.json({ limit: serverConfig.jsonBodyLimit }));

  app.get('/', (_req, res) => {
    res.json({ ok: true });
  });

  app.get('/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.use(webhookRoutes);

  return app;
}
