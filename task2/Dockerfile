FROM node:16-alpine3.18

WORKDIR /app
COPY package.json .

RUN npm i

COPY . .

ARG PORT
EXPOSE ${PORT}

CMD ["npm", "run", "start"]
