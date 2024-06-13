FROM node:22-alpine as build
WORKDIR /build
ADD .eslintrc.js .eslintrc.js
ADD dev.config.js dev.config.js
ADD package.json package.json
ADD package-lock.json package-lock.json
ADD prod.config.js prod.config.js
ADD webpack.config.js webpack.config.js
ADD src src
RUN npm install
RUN npm run build

FROM nginx:mainline-alpine-slim
COPY --from=build /build/dist /usr/share/nginx/html
