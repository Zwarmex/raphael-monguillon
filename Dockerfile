# syntax=docker/dockerfile:1
# Image du site Fer & Feu (Next.js en mode standalone), construite par la CI et poussée sur GHCR.

# --- Base ---
FROM node:22-alpine AS base
RUN apk update && apk upgrade && apk add --no-cache libc6-compat
WORKDIR /app

# --- Dépendances ---
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts && npm rebuild

# --- Construction ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV BUILD_STANDALONE=true
ENV NEXT_TELEMETRY_DISABLED=1
# .env.local est monté en secret BuildKit (jamais copié dans une couche) : Next y lit
# NEXT_PUBLIC_SITE_URL et SITE_ENV au build. Le standalone recopie les .env* trouvés :
# on les supprime, l'image poussée sur le registre n'en contient aucun.
RUN --mount=type=secret,id=env_local,target=/app/.env.local,required=false \
    npx next build && rm -f .next/standalone/.env*

# --- Exécution ---
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Utilisateur non root
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
RUN mkdir .next && chown nextjs:nodejs .next

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
