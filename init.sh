#!/bin/bash

### Create network private ###
docker network create --subnet 172.10.0.0/24 private_net

### Build docker-compose ###
docker-compose up --build
