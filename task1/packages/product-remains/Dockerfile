FROM node:16-alpine3.18

WORKDIR /app
COPY package.json .

RUN npm i

COPY . .

ARG REMAINS_SERVICE_PORT
EXPOSE ${REMAINS_SERVICE_PORT}

CMD ["npm", "run", "start"]
