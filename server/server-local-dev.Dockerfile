FROM node:18.16.0 as server

WORKDIR /app

COPY ./package.json ./yarn.lock ./
RUN --mount=type=tmpfs,target=/tmp \
    yarn install --frozen-lockfile --prefer-offline

COPY . .

CMD ["yarn", "start:dev"]
