#!/bin/bash

# Root .env
cp .env.example .env

cd ./packages/shared
npm install

# Env files for packages
cd ../product-remains
cp .env.example .env
npm install

cd ../product-events
cp .env.example .env
npm install
