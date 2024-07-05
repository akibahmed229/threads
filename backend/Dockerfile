FROM node:20-alpine
FROM prisma/prisma:latest

WORKDIR /app

COPY package*.json ./

RUN yarn install
RUN prisma generate

COPY . .

EXPOSE 5000

CMD yarn start
