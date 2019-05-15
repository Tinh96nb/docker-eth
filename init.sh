#!/bin/bash

### Create network private ###
docker network create --subnet 172.20.0.0/24 eth_net

### Build docker-compose ###
docker-compose up --build
