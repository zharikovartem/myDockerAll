# myDockerAll

## Branches:
1. nginx+php8+worker+mysql
2. nginx+php8+worker+mysql


## Make:
1. init
2. run
3. stop
4. watch
5. composer
6. cache
7. clearNetworks - Очистка созданных сетей.

## Commands:
1. 



docker-compose up -d --no-deps --build nginx
docker-compose build nginx
docker-compose exec php8 bash

netstat -tulpn | grep :3306 - узнать свободен ли порт


composer create-project symfony/skeleton:"6.1.*" app
composer require webapp
cp -rp app/* ./../app