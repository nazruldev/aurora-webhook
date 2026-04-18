# Node 20 — listen di 0.0.0.0 + PORT dari env (server.config.js)
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production

CMD ["node", "webhook.js"]
