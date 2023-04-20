FROM node:18-apline as builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY tsconfig.json ./
COPY src/ ./src/
RUN yarn build

FROM node:18-alpine AS ts-remover
WORKDIR /app
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/dist/ ./dist/
RUN yarn install --production --frozen-lockfile

FROM gcr.io/distroless/nodejs:18 AS runtime
WORKDIR /app
COPY --from=ts-remover /app/dist ./dist/
COPY --from=ts-remover /app/node_modules/ ./node_modules/
ENV NODE_ENV prodution
CMD ["dist/index.js"]