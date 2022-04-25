#!/bin/bash

dockerd &

sleep 2

# By some strange reason we need to do echo command to get to the next command
echo " "

docker pull python:3.9 &&

echo " "

npm start

echo " "

exec bash