FROM node:18.16.0 as client

WORKDIR /app

COPY ./package.json ./yarn.lock ./vite.config.ts ./tsconfig.json ./index.html ./favicon.ico ./
RUN --mount=type=tmpfs,target=/tmp \
    yarn install --frozen-lockfile --prefer-offline

COPY ./src ./src

CMD ["yarn", "dev"]
