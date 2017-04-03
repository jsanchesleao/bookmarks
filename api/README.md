# Bookmark API

## Requirements

You will need Node.js version 7.x or higher and MongoDB version 3.x or higher

## Configuration

Edit the `config.json` file to change the tcp port that will be used, and to set the MongoDB connection string

## Set Up

To get up and running, just execute `npm install` and then `npm start`.

By default, no `admin` user is created, so if you need any, you can run `node src/insertAdmin.js <username> <password>` and one will be created.

## Run the Tests

Simple execute `npm test` to run the test suite

## Endpoints

### POST /authenticate

  This verifies a username and a password, and in case of a match, it generates a token, that can be passed to the other endpoints
  The expected body is in the following format:

  ```json
  {"username": "foo", "password": "bar"}
  ```

  The possible results are:
  ```javascript
  // success 200
  {"authenticated":true,"token":"R66BF30Q55MLNf3f3dhXqmZtaSBus6beT3GV43UtBUJdIpE6xuC2GXXu2HrrPE3F"}

  //failure 401
  {"authenticated": false}
  ```

  The token is supposed to be passed in the `Authorization` header, like this:
  ```
  Authorization: Bearer R66BF30Q55MLNf3f3dhXqmZtaSBus6beT3GV43UtBUJdIpE6xuC2GXXu2HrrPE3F
  ```

### POST /user

  Endpoint that registers users in the system. It accepts requests in this format:

  ```json
  {"username": "foo", "password": "bar", "type": "client"}
  ```

  This endpoint will only require authorization if the created type is `admin`. No authentication needed for regular clients

### GET /user

  This will return a list of all non admin clients in the system, in the following format:

  ```json
  [{"username": "foo"}, {"username": "bar"}]
  ```

  This endoint is secured, so you need to pass a token of an authenticated admin user

### GET /user/:username

  This will return only the data associated with a given username. This is mostly used to check username availability, and returns in the following format:

  ```json
  {"username": "foo"}
  ```

### GET /user/:username/bookmark

  This will list all the bookmarks of a given user. The response will follow this format:
  ```json
  [{"url": "http://github.com", "name": "github"}, {"url": "http://nodejs.org", "name": "node-home"}]
  ```

  This endpoint is secured by authentication. A token for an admin or for the bookmarks' owner client is needed.

### PUT /user/:username/bookmark/:bookmark

  Endpoint that registers a bookmark with a name for a user. It accepts requests with this format:

  ```json
  {"url": "http://github.com"}
  ```

  This endpoint is secured by authentication. A token for the bookmarks' owner client is needed.

### POST /user/:username/bookmark/:bookmark

  Endpoint that updates a bookmark with a name for a user. It accepts requests with this format:

  ```json
  {"url": "http://github.com"}
  ```

  This endpoint is secured by authentication. A token for the bookmarks' owner client is needed.

### DELETE /user/:username/bookmark/:bookmark

  Endpoint that removes a bookmark with a name for a user
  This endpoint is secured by authentication. A token for the bookmarks' owner client is needed.
