FROM node:lts-alpine as node-server
WORKDIR /usr/src/app
ENV NODE_ENV production
COPY package*.json /usr/src/app/
COPY ts*.json /usr/src/app/
RUN npm install --production --silent && npm run build && cd dist/
COPY .  /usr/src/app/
EXPOSE 5000
CMD ["npm", "run", "dev"]