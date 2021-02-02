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

## Lint code

To clean the code just run:

```bash
npm run lint # npm run lint:fix

# or
yarn lint # yarn lint:fix
```

## Project structure

```bash
.
└── src
    ├── components
    ├── helpers
    ├── pages
    └── server
        ├── config
        ├── controllers
        ├── models
        ├── routes
        ├── services
        └── index.js
```

## Caveats

This project lacks some validations on the server side such as:

- Checking params while fetching/creating records.
- Check for the type of data employed.

Client side could be improved with some tweaks:

- Modularization of the components: modals, forms, alerts.
- Route param validation.
- E2E tests.
- State management (I thought about using Rematch but ended up using hooks and effects) to take away all the async code out of the pages.

Most of the decisions were taken based upon the time given and the project's size. It might look like an overkill to use Rematch for such a small project, but I think it would have been a nice extra.

## Licensing

This project was made by Enrique Bermúdez under the [MIT](LICENSE) License.
