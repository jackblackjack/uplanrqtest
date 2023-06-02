#!/bin/sh
set -e
USER="$(/usr/bin/id -run)"
sudo chown -R ${USER}:${USER} ./storage-data
sudo chmod 0777 -R ./storage-data
