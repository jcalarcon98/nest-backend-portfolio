FROM node:12.16.2-alpine

WORKDIR /app

COPY ./package.json ./

RUN npm install 

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]