FROM node:18-alpine AS client-build

WORKDIR /app

COPY ./package.json ./yarn.lock ./
COPY . .

RUN echo "Listing files in /app:" && ls -la /app

#RUN --mount=type=tmpfs,target=/tmp \
#    yarn install --frozen-lockfile --prefer-offline

RUN yarn install --frozen-lockfile --prefer-offline

ENV NODE_ENV production
RUN yarn run build
RUN echo "Listing files in /app/dist after build:" && ls -la /app/dist

FROM nginx:stable-alpine AS client
COPY --from=client-build /app/dist /usr/share/nginx/html
RUN ls -la /usr/share/nginx && echo "Listing files in /usr/share/nginx"

ENV NODE_ENV production
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
