<p align="center">
  <a href="https://github.com/musician-app" target="blank"><img src="https://avatars.githubusercontent.com/u/122569876" width="200" alt="Nest Logo" /></a>
</p>

# Musician App Back-End

## Description

A [Nest](https://github.com/nestjs/nest) framework written in TypeScript.

## Installation

- 🐘 Set up a PostgreSQL database
- 🔌 Copy `example.env` to `.env` and fill the environmental variables
- 📂 Create a folder called `certs` at the root of the project:
  - 🔐 Generate a RSASHA256 key (no passphrase) for the JWT signing:
    - 🔒 Name the *private key* `jwtRS256.key`
    - 🔑 Name the *public key* `jwtRS256.key`

```bash
$ yarn install
$ yarn prisma db push
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```