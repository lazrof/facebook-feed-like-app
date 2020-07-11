FROM node:12.13.0-alpine AS alpine
RUN mkdir /app
WORKDIR /app
ADD package.json /app/package.json
RUN npm install
EXPOSE 3000