#!/usr/bin/env bash
set -e
./node_modules/.bin/tsc

nodejs ./dist/index.js
