#!/bin/bash

clear
docker-compose exec php8 php bin/console make:user
# php bin/console make:user