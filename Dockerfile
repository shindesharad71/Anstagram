# Docker File for Frontend

# Step 1
FROM node:12-alpine as build-step
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build


# Step 2
FROM nginx:1.17.1-alpine
COPY --from=build-step app/dist/apps/frontend /usr/share/nginx/html