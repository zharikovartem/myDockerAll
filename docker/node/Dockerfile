FROM node:16

WORKDIR /var/www/node

COPY ./frontend/package.json .
COPY ./frontend/package-lock.json .

RUN npm install

EXPOSE 3000
CMD [ "npm", "run", "start" ]
