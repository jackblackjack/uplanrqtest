FROM node:18-alpine AS server-build

WORKDIR /app

COPY ./package.json ./yarn.lock ./tsconfig.build.json ./
RUN --mount=type=tmpfs,target=/tmp \
    yarn install --frozen-lockfile --prefer-offline

COPY . .
RUN echo "Listing files in /app:" && ls -la /app
ENV NODE_ENV production
RUN yarn run build:prod
RUN echo "Listing files in /app/dist after build:" && ls -la /app/dist

FROM node:18-alpine AS server

WORKDIR /app

COPY ./package.json ./yarn.lock ./
RUN --mount=type=tmpfs,target=/tmp \
    yarn install --frozen-lockfile --prefer-offline --production=true \
    && yarn cache clean --force \
    && rm -f ./package.json ./yarn.lock

COPY --from=server-build /app/dist ./dist/
RUN echo "Listing files in /app/dist:" && ls -la /app/dist

ENV NODE_ENV production
CMD ["node", "/app/dist/main"]
