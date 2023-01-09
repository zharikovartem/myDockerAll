FROM node:16

WORKDIR /var/www/node

COPY ./frontend/package.json .
COPY ./frontend/package-lock.json .

RUN ls -la
RUN pwd

RUN npm install

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .

RUN ls -la

RUN chown -R node /app/node_modules

USER node

EXPOSE 3000
CMD [ "npm", "run", "start" ]
