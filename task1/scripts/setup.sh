#!/bin/bash

# Root .env
cp .env.example .env

cd ./packages

# Env files for packages
cd ./product-remains
cp .env.example .env

cd ../product-events
cp .env.example .env
