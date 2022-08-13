# -- Base stage

FROM node:16-alpine as base

#create app directory
WORKDIR /app

# -- Build Dependency Stage
FROM base AS dependencies

# Install app dependencies
COPY package*.json ./

RUN npm install

# -- Build Stage
FROM dependencies AS build

WORKDIR /app

COPY . .

RUN npm run build

# -- Release stage

FROM node:16-alpine

WORKDIR /app

COPY --from=dependencies /app/package.json ./

RUN npm install
RUN apk add python3

RUN apk add python3

COPY --from=build /app/dist ./dist

RUN mkdir ./logs

EXPOSE 3000

CMD ["node", "dist/server.js"]

