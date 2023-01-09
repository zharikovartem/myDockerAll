#!/bin/bash

clear
read -p "куда деплоим,: dev/prod/local  > " envType

if [[ ${envType} == "prod" ]]
then
    cp ./env.prod ./env

    read -p "Нужно ли обновить .env  y/n  > " envChange
    if [[ ${envChange} == "y" ]]
    then
        filename=".env"
        read -p "Имя проекта:  > " projectName
        if [[ ${projectName} != "" ]]
        then
            search="myProject_v1"
            if [[ $search != "" && $projectName != "" ]]; then
            sed -i "s/$search/$projectName/" $filename
            fi
        fi
    fi

    cp ./docker-compose-prod.yml ./docker-compose.yml

fi

if [[ ${envType} == "dev" ]]
then
    cp .env.dev .env
    cp .docker-compose-dev.yml .docker-compose.yml
fi

if [[ ${envType} == "local" ]]
then
    cp .env.local .env
    cp .docker-compose-local.yml .docker-compose.yml

fi