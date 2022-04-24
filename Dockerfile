FROM docker:18.09.6


RUN apk add --no-cache iptables bash
RUN apk add --update nodejs npm

WORKDIR /app

COPY . .

RUN npm i

EXPOSE 8000

ENTRYPOINT [ "./start.sh" ]