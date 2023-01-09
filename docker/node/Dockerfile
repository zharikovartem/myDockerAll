FROM node:16

WORKDIR /var/www/node

COPY ./frontend/package.json .
COPY ./frontend/package-lock.json .

RUN npm install

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .



USER node

EXPOSE 3000
CMD [ "npm", "run", "start" ]
