FROM node:12.13.0-alpine AS alpine
RUN mkdir /src
COPY . /src
WORKDIR /src
ADD package.json /src/package.json
RUN npm install nodemon -g
RUN npm install
EXPOSE 8000