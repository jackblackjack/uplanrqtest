FROM node:18.16.0 as server

WORKDIR /app

COPY ./package.json ./yarn.lock ./tsconfig.json ./
RUN --mount=type=tmpfs,target=/tmp \
    yarn install --frozen-lockfile --prefer-offline

COPY ./src ./src

CMD ["yarn", "start:dev"]
