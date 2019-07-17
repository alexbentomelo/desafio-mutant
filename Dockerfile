FROM node:10-slim

ARG PORTA_WEB_APP=8080
ARG URL_ELASTIC_SEARCH=localhost:9200

RUN mkdir /app
WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

ENV PORT=$PORTA_WEB_APP
ENV URL_ES=$URL_ELASTIC_SEARCH
EXPOSE $PORT
CMD [ "npm", "start" ]
