#!/bin/sh
set -e

docker-compose -p up -f ./docker-compose.prod.yml up -d --build --remove-orphans --force-recreate
docker-compose -p up -f ./docker-compose.prod.yml ps
