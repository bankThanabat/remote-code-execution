FROM node:12-alpine

RUN apk add --no-cache python3

WORKDIR /app

COPY . .

RUN npm i --production

CMD [ "node", "server.js" ]

EXPOSE 8000