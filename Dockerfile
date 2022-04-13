FROM node:16-alpine

COPY . /app

WORKDIR /app

RUN npm install

USER node

CMD ["npm", "start"]

