default: run

db:
	docker-compose up -d db
	docker-compose ps

perm:
	sudo chmod -R 777 app/

init:
	bash ./scripts/init/choiseEnv.sh
	docker-compose up -d
	sudo chmod -R 777 app/
	sudo chown -R www-data:www-data app/
	docker-compose exec php8 composer install
	docker-compose exec php8 composer require webapp
	docker-compose exec php8 composer require --dev doctrine/doctrine-fixtures-bundle

	docker-compose exec php8 cp -rp app/* ./../app
	docker-compose ps

run:
	docker-compose up -d
	docker-compose ps

stop:
	docker-compose down

watch:
	docker-compose exec -u www-data front yarn encore dev --watch

composer:
	docker-compose exec -u www-data front composer install

cache:
	docker-compose exec -u www-data front php8 bin/console cache:clear

clearNetworks:
	docker network prune

show:
	docker-compose ps

killAll:
	docker rm -f $(docker ps -aq)

clearDB:
	sudo rm -rf docker/mysql/mysql-data

# prod:
# ssh root@81.90.180.185
# cd sms_service/

# docker-compose logs db
# docker-compose logs nodejs
# docker-compose logs send_no_reply_worker
# docker-compose logs rabbitmq
# docker-compose logs send_no_reply_worker

# sevirce docker restart

# СПИСОК СЕТЕЙ
# docker network ls

# УДАЛИТЬ НУЖНУЮ СЕТЬ
# docker network rm pool_network