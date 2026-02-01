# ContextFlow

ContextFlow ist ein voll funktionsfähiges SaaS-MVP für Retrieval-Augmented Generation (RAG). Es enthält:

- Next.js + TypeScript + Tailwind für das Frontend
- NextAuth mit Google Login und Middleware-Schutz für `/dashboard`
- Prisma Schema inkl. User, Subscriptions und AI Workflows
- Stripe Checkout + Webhook für Pro-Pläne
- Mock-RAG API, die OpenAI integriert

## Voraussetzungen

- Node.js 18+
- Docker (für PostgreSQL)
- Stripe Account + API Keys
- Google OAuth App (Client ID + Secret)
- OpenAI API Key

## Setup

1. **Repository klonen & Dependencies installieren**

```bash
npm install
```

2. **PostgreSQL starten**

```bash
docker compose up -d
```

3. **Umgebungsvariablen setzen**

```bash
cp .env.example .env
```

Fülle anschließend alle Felder in `.env` aus.

4. **Prisma Client generieren & Datenbank migrieren**

```bash
npm run prisma:generate
npm run prisma:migrate
```

5. **App starten**

```bash
npm run dev
```

Die App ist dann unter `http://localhost:3000` verfügbar.

## Stripe Webhook lokal testen

Nutze die Stripe CLI, um Webhooks an `/api/stripe/webhook` weiterzuleiten:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Hinweise

- Für produktive Deployments `NEXT_PUBLIC_APP_URL` und `NEXTAUTH_URL` auf die Production-URL setzen.
- Die Mock-RAG API liefert eine Fallback-Antwort, falls kein OpenAI Key gesetzt ist.
