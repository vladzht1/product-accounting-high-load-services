#!/bin/bash

BACKUP_PATH="./backups/dump_`date +%Y-%m-%d"_"%H_%M_%S`.sql"
docker exec -it users_postgres pg_dumpall -c -l "some-db" -U root > ${BACKUP_PATH}

echo "Created backup: ${BACKUP_PATH}"