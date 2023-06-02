#!/bin/sh
set -e

# Delete 'exited' containers.
docker ps --filter status=exited -q | xargs -r -I{} docker rm -v {}

# Delete 'dangling' images.
docker images --filter dangling=true -q | xargs -r -I{} docker rmi {}

# Delete 'dangling' volumes.
docker volume ls -qf dangling=true | xargs -r -I{} docker volume rm {}

# Remove build cache.
docker builder prune --filter until=24h --force --keep-storage 1Gb
