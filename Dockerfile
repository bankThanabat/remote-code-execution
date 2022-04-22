FROM node:12-alpine

RUN apk add --no-cache python3

WORKDIR /app

COPY . .

RUN npm i

CMD [ "npm", "start" ]

EXPOSE 8000