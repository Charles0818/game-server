# Game Server

## Description

A scalable game server application built with Nest.js, Typescript, PostgreSQL, and among other dependencies

## API Documentation

[localhost:8080/doc](localhost:8080/doc)

## Perequisites

<h4>1. PostgreSQL</h4>
Ensure you have installed a postgreSQL client and server. You can choose from the following list of clients

- pgAdmin 4
- Postico (for Mac devices only)

Start up your PostgreSQL Server.

Create a database for this game.

At the root directory of this project, create a .env file with the following content sample:

```.env
PGUSER=postgres
PGPORT=5432
PGHOST=localhost
PGDATABASE=game_server
PGPASSWORD=secret
JWT_SECRET=whatwapp_game_server_authentication_secret

```

Ensure `PGDATABASE` is same as the database name you created earlier

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# With docker compose
docker-compose up
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Assumptions On Code Implementation

- A user can only join a group when he/she has the sufficient amount of softCurrency (100).
- A user can only create a group if he/she has upto 50 hardCurrency in his/her wallet.
- Charged currencies during creating and joining of groups are transferred to an administrator's wallet. You can login as admin with these credentials

```json
{
  "identity": "admin@whatwapp.com"
  "password": "password"
}

```

- A user is only allowed to send & list messages of a club he/she is a member of.
- As a club member you're not allowed to have more than one pending donation requests
- As a donation request issuer you're not allowed to fulfill your own request
- An already fulfilled request cannot be honoured twice
