FROM node:24

WORKDIR /app

COPY index.html ./
COPY tsconfig.json ./
COPY vite.config.* ./
COPY package*.json ./

COPY ./src ./src
COPY ./public ./public

RUN npm ci \
    && npm install -g serve@latest \
    && npm run build \
    && rm -fr node_modules

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]