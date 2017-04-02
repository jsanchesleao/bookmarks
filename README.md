# Bookmark manager

This repository contains a Node.js REST API server (in the `api` folder) and a Python Flask web app (in the `front`) folder

Inside each there is a `README.md` file with details on how to set them up and running.

## Quickstart

Read the `api` README file, and start the API server. It will run by default in `localhost:4001`, so be sure to keep this port free

After that, read the `front` README, and start the web app. Since it runs inside a docker container, you may need to use the `docker0` interface IP to configure the `api` URL.

The web app will run by default in port 80. After that, just access `http://localhost` in your browser and you're set 
