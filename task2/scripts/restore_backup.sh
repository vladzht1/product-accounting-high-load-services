#!/bin/bash

# Create temp database to be connected to
docker exec -it users_postgres psql -d some-db -U root -c "CREATE DATABASE temp;"

# Connect to temp database and terminate all the connections of the main database
docker exec -it users_postgres psql -d temp -U root -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'some-db';"

# Transfer data from backup file to postgres (drops database)
cat $1 | docker exec -i users_postgres psql -d temp -U root

# Terminate all the connections of the temp database
docker exec -it users_postgres psql -d some-db -U root -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'temp';"

# Drop temp database
docker exec -it users_postgres psql -d some-db -U root -c "DROP DATABASE IF EXISTS temp;"
