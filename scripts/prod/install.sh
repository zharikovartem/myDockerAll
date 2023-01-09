#!/bin/bash

# apt install git
# sudo apt-get -y install make
# git clone ...
# cd 
# git checkout -q SmsService

# 1. Установить docker
sudo apt update && sudo apt upgrade
sudo apt install apt-transport-https ca-certificates curl software-properties-common -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
sudo apt update && apt-cache policy docker-ce
sudo apt install -y docker-ce
sudo usermod -aG docker $(whoami)
sudo apt install docker-compose -y

# 2. 