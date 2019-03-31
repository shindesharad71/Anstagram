FROM node:lts-alpine as node-server
WORKDIR /usr/src/app
ENV NODE_ENV production
COPY package*.json ./
RUN npm install --production --silent
COPY ./dist .
CMD ["node", "index.js"]