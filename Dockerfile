
FROM node:14 AS development

WORKDIR /ivo/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:14 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /ivo/src/app

COPY --from=development /ivo/src/app/ .

EXPOSE 8080

CMD [ "npm", "run", "start:dev" ]
