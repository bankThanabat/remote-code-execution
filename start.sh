#!/bin/bash

dockerd &

sleep 2

# By some strange reason we need to do echo command to get to the next command
echo " "

docker pull php:7.4-fpm-alpine &&

echo " "

docker pull python:3.9 &&

echo " "

docker pull node:18-alpine3.14 &&

echo " "

node server.js

echo " "

exec bash