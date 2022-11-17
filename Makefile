default: init

init:
	docker-compose up -d
	# docker-compose exec -u www-data nginx composer install
	# docker-compose exec -u www-data php8 composer install
	# 
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

