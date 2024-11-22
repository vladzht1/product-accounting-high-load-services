#!/bin/bash

docker compose -f docker-compose-db.yaml --env-file ./.env up --build
