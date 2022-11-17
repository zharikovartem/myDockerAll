default: init

init:
	docker-compose up -d
	sudo chown -R www-data:www-data app/
	docker-compose exec php8 composer install
	docker-compose exec php8 composer require webapp
	docker-compose exec php8 cp -rp app/* ./../app
	docker-compose ps

run:
	docker-compose up -d

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

