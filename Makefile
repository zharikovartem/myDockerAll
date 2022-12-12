default: init

db:
	docker-compose up -d db
	docker-compose ps

init:
	docker-compose up -d
	sudo chown -R www-data:www-data app/
	sudo chmod -R 777 app/
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
	docker-compose exec -u www-data front php bin/console cache:clear

clearNetworks:
	docker network prune

show:
	docker-compose ps

cillAll:
	docker rm -f $(docker ps -aq)

clearDB:
	sudo rm -rf docker/mysql/mysql-data

# docker-compose logs db
# docker-compose logs nodejs

# sevirce docker restart

# СПИСОК СЕТЕЙ
# docker network ls

# УДАЛИТЬ НУЖНУЮ СЕТЬ
# docker network rm pool_network