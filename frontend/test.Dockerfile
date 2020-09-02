FROM jcalarcon/node-chromiun

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .

CMD ["npm","run","test:prod"]
