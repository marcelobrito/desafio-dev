FROM node:latest

WORKDIR /usr/src/app

COPY ./backend .

RUN npm install -g pm2

RUN  npm ci