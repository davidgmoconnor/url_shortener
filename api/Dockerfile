# BUILD

FROM node:18-alpine as build

WORKDIR /app
COPY . .
RUN yarn install

RUN yarn tsc

# RELEASE

FROM node:18-alpine as release

WORKDIR /app

COPY package.json yarn.lock 

RUN yarn install --production

COPY --from=build /app/build .

EXPOSE 8085

CMD ["node", "server.js"]
