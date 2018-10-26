#!/bin/bash

if [ -d "/var/www/app/node_modules"]; then
/var/www/app/npm start
else
/var/www/app/npm install
fi

echo $?