# BUILD

FROM node:18-alpine

WORKDIR /app
COPY . .

RUN yarn install --production

EXPOSE 3000

ARG REACT_APP_ENDPOINT

CMD ["yarn", "start"]
