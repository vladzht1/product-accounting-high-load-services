#!/bin/bash

docker compose -f docker-compose-db.yaml -f docker-compose.yaml --env-file .env up --build
