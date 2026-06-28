#!/bin/sh
export HOST=0.0.0.0
export PORT="${PORT:-3000}"
exec node_modules/.bin/react-router-serve ./build/server/index.js
