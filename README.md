# music-album-crud

> Music artists, albums and songs simple CRUD made with javascript and love.

## Database
Create a MySQL database. You can use the next piece of code on the mysql command prompt:

```bash
CREATE DATABASE mydatabase CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## Configuration files
Create a `db.config.js` based on the sample file named `db.config.example.js` and fill all the fields with the information about your SQL database.

```bash
# Linux
cp db.config.example.js db.config.js

# Windows
copy db.config.example.js db.config.js
```

## Dependencies
Install all the dependencies by running:

```bash
npm install

# or
yarn
```

## Development
Start both client and server by using running:

```bash
npm run start:both

# or
yarn start:both
```

You can also start a single part of the project with either of these commands:

```bash
# Client (React)
start:client

# Server (Node / Express)
start:server
```

## Licensing

[MIT](LICENSE)
