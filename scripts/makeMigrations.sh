#!/bin/bash

clear
docker-compose exec php8 php bin/console make:migration
exit
docker-compose exec php8 php bin/console doctrine:migrations:migrate
exit