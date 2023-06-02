#!/bin/sh
set -e

if [ $# -eq 0 ]; then
   echo ""
   echo "Usage: $0 -p=value -s=value"
   echo "\t-s, --service\tName of the service whicр containing migrations"
   exit 1 # Exit script after printing help
fi

while [ $# -gt 0 ]; do
  case "$1" in
    -s=*|--service=*)
      SERVICE="${1#*=}"
      ;;
    -*|--*)
      echo "Unknown option $1"
      exit 1
      ;;
    *)
      ;;
  esac
  shift # Shift positional parameters
done

if [ -n "$SERVICE" ]; then
    echo "Service name = $SERVICE"
else
    echo "ERROR: Service name should be provided by -s or --service parameter"
    exit 1
fi

DOCKER_CMD="docker"
$DOCKER_CMD exec -it $SERVICE yarn typeorm:source schema:drop
$DOCKER_CMD exec -it $SERVICE yarn typeorm:source migration:run
$DOCKER_CMD restart $SERVICE
