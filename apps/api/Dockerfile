FROM node:16-alpine AS build

WORKDIR /app

RUN apk add --no-cache libc6-compat
RUN apk add --no-cache openssl1.1-compat-dev

RUN npm install pnpm -g

COPY apps/api/package.json pnpm-lock.yaml ./
COPY apps/api ./

RUN pnpm install -r
RUN pnpm prisma generate

RUN pnpm build
RUN pnpm prune --prod

FROM node:16-alpine AS production

RUN apk add --no-cache libc6-compat
RUN apk add --no-cache openssl1.1-compat-dev

WORKDIR /app

## For DB Migration
RUN npm i -g prisma

COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json

CMD ["node", "dist/main"]
