FROM node:20-alpine3.18 as base

WORKDIR /

COPY package.json package.json

COPY . .

RUN npm install 
RUN [ "npm", "run", "build" ]


WORKDIR /dist

CMD node index.js

