FROM node:16-alpine AS build

WORKDIR /app

RUN npm install pnpm -g

COPY apps/api/package.json pnpm-lock.yaml ./
COPY apps/api ./

RUN pnpm install -r
RUN pnpm prisma generate

RUN pnpm build
RUN pnpm prune --prod

FROM node:16-alpine AS production

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/prisma ./prisma

CMD ["node", "dist/main"]
