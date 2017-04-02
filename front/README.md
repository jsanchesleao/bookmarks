# Bookmark Front App

## Requirements

You will need Node.js version 7.x or higher and Docker to build. All other dependencies are handled inside the Docker container

## Configuration

To compile the frontend files, simply run `npm install` and then `npm run compile`.

After that, build the Dockerfile with `docker build -t <image-name> .` or simply run `./scripts/build.sh`, and it will build the image with a default name.

## Execution

Simply run the generated docker image. Some parameters must be passed to `docker run` to configure the runtime environment:

- `-p 80:80` or similar, to make the internal `nginx` accessible from the host machine
- `--env BOOKMARK_API_URL=http://docker0-ip:4001/` This environment variable should point to a running `Bookmark API` server

Alternatively, you can edit the `./scripts/run.sh` to change the BOOKMARK_API_URL setting and run it.

## Running the tests

The front tests are run with `npm test`
