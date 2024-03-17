#!/bin/bash

cd /var/www/html/printhub

composer install --no-scripts

npm install --verbose

echo 'finished!!'

exit 1;
