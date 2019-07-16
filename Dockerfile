FROM node:10-slim

ARG PORTA_WEB_APP=8082

RUN mkdir /app
WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

ENV PORT=$PORTA_WEB_APP
EXPOSE $PORT
CMD [ "npm", "start" ]
