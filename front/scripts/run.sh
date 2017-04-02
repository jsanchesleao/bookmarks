#!/bin/bash

#use docker0 ip
BOOKMARK_API_URL=http://172.17.0.1:4001

docker run -v $(pwd):/opt/app -p 5000:5000 -p 80:80 --env BOOKMARK_API_URL=$BOOKMARK_API_URL bookmark-front
