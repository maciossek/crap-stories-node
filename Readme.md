# Crap Stories Node.js

## Environment Variables

| Variable Name | Required | Value                               |
| ------------- | -------- | ----------------------------------- |
| NODE_ENV      | ❌       | development                         |
| DOMAIN        | ❌       | localhost                           |
| PORT          | ❌       | 3001                                |
| LOG_LEVEL     | ❌       | debug                               |
| DB_HOST       | ✅       | postgres://localhost:5433/          |
| COMMIT_HASH   | ❌       | aou32b9e2d                          |
| CORS_URLS     | ❌       | "https://www.my-website.de"         |
| PGSSLMODE     | ✅       | "disable" or "no-verfiy" for heroku |

Create a `.env.local` file for local overrides.

## Docker

### Running PostgreSQL for local development

The docker-compose file starts a local PostgreSQL server to run against - don't forget to set the `DB_HOST` environment variable!

## Available Scripts

### start

Start the server in production mode

### start:inspect

Start the server with node debugging enabled: https://chrome.google.com/webstore/detail/nodejs-v8-inspector-manag/gnhhdgbaldcilmgcpfddgdbkhjohddkj?hl=en

### start:watch

Start the server with debugging and refresh if file changes happen

### test

Run tests while watching changes

### test:ci

Run tests and quit after execution

### build

Create a build in the dist folder with typescript definition files

## Database knex interaction

### Migrations

To create a migration:

```sh
node -r @swc-node/register node_modules/.bin/knex migrate:make table_name
```

To run all migrations:

```sh
npx knex migrate:latest
```

### Seeds

To run all seeds:

```sh
npx knex seed:run
```
